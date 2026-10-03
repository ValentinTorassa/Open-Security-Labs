# app.py
# PhantomLog, versión del lab "Medir una simulación de phishing sin vigilar a
# nadie" de Open Security Labs. Sale de github.com/ValentinTorassa/PhantomLog
# (commit d93d22d) con tres cambios, explicados en el README del entorno:
#   - ProxyFix opcional con TRUSTED_PROXIES (por defecto, no confía en nadie).
#   - El log guarda el método HTTP (HEAD delata a muchos escáneres).
#   - Las fechas del log van en UTC e ISO 8601.
from flask import Flask, request, render_template, redirect, url_for, Response
from functools import wraps
from datetime import datetime, timezone
import csv
import hmac
import os
import uuid

from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.security import check_password_hash

app = Flask(__name__)

# Detrás de un proxy, request.remote_addr es la IP del proxy, no la de quien
# hizo clic. ProxyFix toma la IP de X-Forwarded-For, pero ese header lo puede
# escribir cualquiera: solo hay que confiar en tantos saltos como proxies
# reales haya delante de la app. Con 0 (por defecto) el header se ignora.
TRUSTED_PROXIES = int(os.environ.get('TRUSTED_PROXIES', '0') or 0)
if TRUSTED_PROXIES > 0:
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=TRUSTED_PROXIES)

# Directorio de datos configurable (DATA_DIR); por defecto, junto a app.py.
DATA_DIR = os.environ.get('DATA_DIR', os.path.dirname(os.path.abspath(__file__)))
LOG_FILE = os.path.join(DATA_DIR, 'logs.csv')
LINKS_FILE = os.path.join(DATA_DIR, 'links.csv')

# Tope de longitud para los campos que entran por request (input sin limite).
MAX_FIELD_LEN = 512


# Crear archivos si no existen (tambien al correr bajo gunicorn).
def init_files():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, mode='w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['timestamp', 'id', 'ip', 'user_agent', 'method'])

    if not os.path.exists(LINKS_FILE):
        with open(LINKS_FILE, mode='w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['unique_id', 'user_id'])


def csv_safe(value):
    # Neutraliza la inyeccion de formulas al abrir el CSV en una planilla y
    # recorta el valor para evitar input sin limite.
    text = '' if value is None else str(value)
    text = text.replace('\r', ' ').replace('\n', ' ')[:MAX_FIELD_LEN]
    if text and text[0] in ('=', '+', '-', '@', '\t'):
        text = "'" + text
    return text


# --- Autenticacion del panel (HTTP Basic sobre HTTPS) ---
# Credenciales por variables de entorno. Sin ADMIN_PASSWORD_HASH el panel se
# bloquea (fail-closed); nunca hay contrasena por defecto. El endpoint publico
# /log sigue andando aunque el panel no este configurado.
def _admin_user():
    return os.environ.get('ADMIN_USER', 'admin')


def _admin_password_hash():
    return os.environ.get('ADMIN_PASSWORD_HASH')


def _auth_ok(auth):
    pw_hash = _admin_password_hash()
    if not pw_hash or auth is None:
        return False
    user_ok = hmac.compare_digest(auth.username or '', _admin_user())
    pass_ok = check_password_hash(pw_hash, auth.password or '')
    return user_ok and pass_ok


def require_auth(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not _admin_password_hash():
            return 'Admin credentials not configured (set ADMIN_PASSWORD_HASH)', 503
        if not _auth_ok(request.authorization):
            return Response(
                'Authentication required', 401,
                {'WWW-Authenticate': 'Basic realm="PhantomLog"'},
            )
        return view(*args, **kwargs)

    return wrapped


@app.route('/')
@require_auth
def index():
    logs = []
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, newline='') as f:
            reader = csv.reader(f)
            next(reader, None)  # skip header
            logs = [row for row in reader if row]

    links = []
    if os.path.exists(LINKS_FILE):
        with open(LINKS_FILE, newline='') as f:
            reader = csv.reader(f)
            next(reader, None)  # skip header
            links = [(row[1], request.url_root + 'log?id=' + row[0])
                     for row in reader if len(row) >= 2]

    return render_template('index.html', logs=logs, links=links)


@app.route('/generate', methods=['POST'])
@require_auth
def generate():
    user_id = (request.form.get('user_id') or '').strip()
    if not user_id:
        return 'Missing user_id parameter', 400

    unique_id = str(uuid.uuid4())
    with open(LINKS_FILE, mode='a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([unique_id, csv_safe(user_id)])

    return redirect(url_for('index'))


@app.route('/log')
def log_event():
    # Endpoint publico de rastreo: registra el clic. No redirige a ningun
    # destino controlado por el usuario (sin open redirect).
    user_id = request.args.get('id', 'unknown')
    ip = request.remote_addr
    user_agent = request.headers.get('User-Agent', '')
    timestamp = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

    with open(LOG_FILE, mode='a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, csv_safe(user_id), csv_safe(ip),
                         csv_safe(user_agent), request.method])

    return '', 204  # No Content


# Crear los CSV al importar el modulo (p. ej. bajo gunicorn).
init_files()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
