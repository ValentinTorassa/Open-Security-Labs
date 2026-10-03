"""Procesos de juguete para el lab: escuchan o se conectan por loopback.

  juguete.py web-server 127.0.0.1 8080   escucha y responde HTTP mínimo
  juguete.py database   127.0.0.1 5432   escucha y no responde nada
  juguete.py browser    127.0.0.1 8080   se conecta y mantiene la conexión

Cada proceso se pone el nombre del primer argumento (lo que muestran ps y
ss), así la tabla del lab coincide con lo que ves.
"""
import socket
import sys
import time

nombre, host, puerto = sys.argv[1], sys.argv[2], int(sys.argv[3])
# /proc/self/comm es el nombre corto del proceso, lo que leen ps y ss.
with open("/proc/self/comm", "w") as comm:
    comm.write(nombre[:15])


def escuchar(responder):
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind((host, puerto))
    srv.listen()
    conexiones = []
    while True:
        conn, _ = srv.accept()
        if responder:
            conn.recv(1024)
            conn.sendall(b"HTTP/1.1 200 OK\r\nContent-Length: 3\r\n\r\nok\n")
        conexiones.append(conn)  # la deja abierta: queda ESTABLISHED


def conectar():
    while True:
        try:
            conn = socket.create_connection((host, puerto))
            conn.sendall(b"GET / HTTP/1.1\r\nHost: web.lab.test\r\n\r\n")
            conn.recv(1024)
            while True:
                time.sleep(3600)
        except OSError:
            time.sleep(1)


if nombre == "browser":
    conectar()
else:
    escuchar(responder=(nombre == "web-server"))
