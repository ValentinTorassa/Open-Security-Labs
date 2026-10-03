# Se carga en cada shell de login (/etc/profile.d/osl.sh): muestra qué trae
# el entorno y recuerda cómo verificarlo.
if [ -n "${PS1:-}" ] && [ -r /usr/local/lib/osl/bienvenida.txt ] && [ -z "${OSL_BIENVENIDA:-}" ]; then
  export OSL_BIENVENIDA=1
  printf '\n'
  cat /usr/local/lib/osl/bienvenida.txt
  printf '\nCuando termines: lab-check  (guarda el resultado en ~/evidencia)\n\n'
fi
