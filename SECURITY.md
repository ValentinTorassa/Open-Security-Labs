# Política de seguridad

## Naturaleza del proyecto

**VT Security Labs** es un proyecto **educativo y open source**. No es un
servicio en producción ni maneja datos de usuarios: es un sitio estático con
contenido de aprendizaje. Aun así, la seguridad importa, sobre todo la del
**contenido** que se publica.

## Reglas para el contenido

Este repositorio es público. Al contribuir:

- **No subas secretos reales**: tokens, claves, contraseñas, certificados.
- **No subas logs sensibles** sin redactar (CloudTrail, accesos, etc.). Usá
  datos **sintéticos**.
- **No incluyas datos de terceros**: clientes, empleadores, infraestructura
  interna, IPs/hostnames privados, account IDs o ARNs reales de cloud.
- El **contenido ofensivo** (privilege escalation, reverse shells, abuso de
  identidad, etc.) debe presentarse de forma **defensiva, segura y
  reproducible** en labs locales. No publiques material accionable contra
  objetivos reales de terceros.

Si en una demo necesitás credenciales o identificadores, que sean **claramente
ficticios** (`AKIAEXAMPLE...`, `user_42`, `example.com`).

## Reportar un problema

### Contenido inseguro o secretos filtrados

Si encontrás un secreto, dato privado o contenido que habilite daño:

- **No** abras un issue público con el dato.
- Reportalo de forma privada a través de **GitHub Security Advisories**
  ("Report a vulnerability") o por los canales de contacto de
  [VT Security](https://valentorassa.com).
- Si ya está publicado, avisá para removerlo y rotar lo que haya quedado
  expuesto.

### Vulnerabilidades en el sitio o las dependencias

Como el sitio es estático, la superficie es chica, pero si encontrás un problema
(por ejemplo en una dependencia o en el build), reportalo de forma privada por
los canales de arriba. Incluí pasos para reproducirlo.

**No incluyas objetivos reales de terceros** en un reporte de vulnerabilidad.

## Alcance

| En alcance                                     | Fuera de alcance                             |
| ---------------------------------------------- | -------------------------------------------- |
| Secretos o datos privados filtrados en el repo | Ataques contra la infraestructura de hosting |
| Contenido ofensivo accionable contra terceros  | Reportes que incluyan objetivos reales       |
| Vulnerabilidades en dependencias del proyecto  | Ingeniería social a colaboradores            |

Gracias por ayudar a mantener este proyecto seguro y responsable.
