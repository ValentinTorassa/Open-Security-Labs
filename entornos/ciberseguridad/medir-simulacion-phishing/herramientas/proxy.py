"""Proxy reverso de juguete: escucha en 127.0.0.1:8081 y le pasa todo a
PhantomLog en 127.0.0.1:5000, agregando X-Forwarded-For con la IP de quien se
conectó, como hacen nginx, un balanceador o el proxy de un PaaS.

Probalo con distintas IP de origen de loopback:
  curl --interface 127.0.0.2 'http://127.0.0.1:8081/log?id=...'
"""
import http.client
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

DESTINO = ("127.0.0.1", 5000)


class Proxy(BaseHTTPRequestHandler):
    def reenviar(self):
        largo = int(self.headers.get("Content-Length") or 0)
        cuerpo = self.rfile.read(largo) if largo else None
        headers = {
            k: v
            for k, v in self.headers.items()
            if k.lower() not in ("connection", "x-forwarded-for")
        }
        previo = self.headers.get("X-Forwarded-For")
        cliente = self.client_address[0]
        headers["X-Forwarded-For"] = f"{previo}, {cliente}" if previo else cliente
        conn = http.client.HTTPConnection(*DESTINO, timeout=10)
        try:
            conn.request(self.command, self.path, body=cuerpo, headers=headers)
            resp = conn.getresponse()
            datos = resp.read()
            self.send_response(resp.status)
            for k, v in resp.getheaders():
                if k.lower() not in ("transfer-encoding", "connection", "content-length"):
                    self.send_header(k, v)
            self.send_header("Content-Length", str(len(datos)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(datos)
        except OSError:
            self.send_error(502, "PhantomLog no responde: phantomlog-ctl estado")
        finally:
            conn.close()

    do_GET = do_POST = do_HEAD = reenviar

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8081), Proxy).serve_forever()
