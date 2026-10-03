# Entorno · SQL injection defensiva

Lab: [SQL injection defensiva: queries parametrizadas](https://securitylabs.valentorassa.com/labs/ciberseguridad/sql-injection-parametrizada/)

## Qué trae

- Python 3.13 slim con `sqlite3` y `nano`. Trabajás como `vt`, sin sudo.
- `~/sqli/usuarios.db`: una base SQLite con cinco usuarios inventados.
- `buscar_vulnerable.py`, que concatena el email en el SQL, y
  `buscar_seguro.py`, que empieza igual y te toca pasar a query
  parametrizada.

El input de prueba es el clásico `' OR '1'='1`: cambia la lógica del `WHERE`
de una base local de juguete y nada más.

## Cómo correrlo

```bash
podman build -t osl/sql-injection-parametrizada -f entornos/ciberseguridad/sql-injection-parametrizada/Containerfile entornos
podman run --rm -it --name osl-sql-injection-parametrizada --hostname labs osl/sql-injection-parametrizada
```

## Qué revisa `lab-check`

- `buscar_seguro.py` devuelve un usuario con un email normal y ninguno con el
  input de prueba, y su SQL usa `?` sin concatenar el email.
- `buscar_vulnerable.py` sigue mostrando el bug (cinco filas con el input de
  prueba): es la referencia.
- `~/evidencia/sqli.md` tiene source, sink y mitigación.

## Límites

- SQLite y `sqlite3` de Python: la sintaxis del parámetro cambia según el
  driver (`?`, `%s`, `:nombre`), la idea no.
