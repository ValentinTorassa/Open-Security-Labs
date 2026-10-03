"""Busca un usuario por email con una query parametrizada.

  python3 buscar_seguro.py ana@example.com

TODO (el lab): reemplazá la concatenación por un parámetro del driver (`?`)
y pasá el email como segundo argumento de execute(). El SQL no tiene que
cambiar según lo que escriba el usuario.
"""
import sqlite3
import sys

email = sys.argv[1]
db = sqlite3.connect("usuarios.db")
sql = "SELECT id, email, plan FROM users WHERE email = '" + email + "'"
for fila in db.execute(sql):
    print(fila)
