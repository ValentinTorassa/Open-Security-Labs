"""Busca un usuario por email concatenando el input en el SQL. NO lo copies:
existe para que veas el bug.

  python3 buscar_vulnerable.py ana@example.com
"""
import sqlite3
import sys

email = sys.argv[1]
db = sqlite3.connect("usuarios.db")
sql = "SELECT id, email, plan FROM users WHERE email = '" + email + "'"
print("SQL armado:", sql)
for fila in db.execute(sql):
    print(fila)
