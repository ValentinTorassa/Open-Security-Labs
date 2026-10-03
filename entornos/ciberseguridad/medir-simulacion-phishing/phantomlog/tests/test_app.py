import csv
import os

from conftest import ADMIN_USER, ADMIN_PASS, basic_auth


def _read_csv(path):
    with open(path, newline='') as f:
        return list(csv.reader(f))


# --- Auth on the dashboard / admin routes ---

def test_dashboard_requires_auth(client):
    assert client.get('/').status_code == 401


def test_dashboard_allows_valid_credentials(client):
    r = client.get('/', headers=basic_auth(ADMIN_USER, ADMIN_PASS))
    assert r.status_code == 200


def test_dashboard_rejects_wrong_password(client):
    r = client.get('/', headers=basic_auth(ADMIN_USER, 'nope'))
    assert r.status_code == 401


def test_generate_requires_auth(client):
    assert client.post('/generate', data={'user_id': 'x'}).status_code == 401


def test_dashboard_denied_when_not_configured(unconfigured):
    assert unconfigured.app.test_client().get('/').status_code == 503


# --- Tracking endpoint is public ---

def test_log_works_without_auth(client, app_module):
    r = client.get('/log?id=usuario1')
    assert r.status_code == 204
    rows = _read_csv(app_module.LOG_FILE)
    assert rows[0] == ['timestamp', 'id', 'ip', 'user_agent', 'method']
    assert any(row[1] == 'usuario1' for row in rows[1:])


def test_log_public_even_when_not_configured(unconfigured):
    assert unconfigured.app.test_client().get('/log?id=x').status_code == 204


# --- CSV files created on first run ---

def test_csv_files_created_on_import(app_module):
    assert os.path.exists(app_module.LOG_FILE)
    assert os.path.exists(app_module.LINKS_FILE)
    assert _read_csv(app_module.LOG_FILE)[0] == ['timestamp', 'id', 'ip', 'user_agent', 'method']
    assert _read_csv(app_module.LINKS_FILE)[0] == ['unique_id', 'user_id']


# --- CSV / formula injection escaping ---

def test_log_escapes_formula_injection(client, app_module):
    client.get('/log?id==2+5', headers={'User-Agent': '=cmd|calc'})
    last = _read_csv(app_module.LOG_FILE)[-1]
    assert last[1].startswith("'=")   # id field
    assert last[3].startswith("'=")   # user-agent field


def test_generate_escapes_formula_injection(client, app_module):
    client.post('/generate', data={'user_id': '@SUM(1,2)'},
                headers=basic_auth(ADMIN_USER, ADMIN_PASS))
    last = _read_csv(app_module.LINKS_FILE)[-1]
    assert last[1].startswith("'@")


def test_long_input_is_truncated(client, app_module):
    client.get('/log?id=' + 'a' * 5000)
    last = _read_csv(app_module.LOG_FILE)[-1]
    assert len(last[1]) <= app_module.MAX_FIELD_LEN


# --- Lab: method column, UTC timestamps and the proxy pitfall ---

def test_log_records_method_and_utc_timestamp(client, app_module):
    client.head('/log?id=escaner')
    last = _read_csv(app_module.LOG_FILE)[-1]
    assert last[1] == 'escaner'
    assert last[4] == 'HEAD'
    assert last[0].endswith('Z') and 'T' in last[0]


def test_forwarded_for_ignored_without_trusted_proxies(client, app_module):
    client.get('/log?id=directo', headers={'X-Forwarded-For': '203.0.113.9'},
               environ_base={'REMOTE_ADDR': '127.0.0.1'})
    assert _read_csv(app_module.LOG_FILE)[-1][2] == '127.0.0.1'


def test_proxyfix_trusts_only_the_last_hop(behind_one_proxy):
    client = behind_one_proxy.app.test_client()
    # El cliente inventó el primer valor; el proxy agregó el segundo.
    client.get('/log?id=via-proxy',
               headers={'X-Forwarded-For': '198.51.100.1, 203.0.113.9'},
               environ_base={'REMOTE_ADDR': '127.0.0.1'})
    assert _read_csv(behind_one_proxy.LOG_FILE)[-1][2] == '203.0.113.9'
