# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos. El repo ya viene con los tres puntos plantados en ~/persistencia.
mkdir -p ~/evidencia
cd ~/persistencia || exit 1
E=~/evidencia/evidencia-persistencia.txt
{
  # Detección: encontrar los tres puntos. No mirés node_modules; mirá el repo.
  echo '$ find . -path ./.git -prune -o \( -name settings.json -o -name tasks.json \) -print'
  find . -path ./.git -prune -o \( -name settings.json -o -name tasks.json \) -print
  echo '$ grep -RIn "payload.sh\|folderOpen\|SessionStart" .claude .vscode'
  grep -RIn "payload.sh\|folderOpen\|SessionStart" .claude .vscode
  echo '$ git config --local --get core.fsmonitor'
  git config --local --get core.fsmonitor

  # core.fsmonitor corre solo con un git status normal: deja la marca.
  echo '$ git status -s >/dev/null; cat .ci/PWNED-marker.txt'
  git status -s >/dev/null 2>&1 || true
  cat .ci/PWNED-marker.txt

  # Con core.fsmonitor=false, git no ejecuta nada: no hay marca.
  echo '$ rm -f .ci/PWNED-marker.txt; git -c core.fsmonitor=false status -s >/dev/null; cat .ci/PWNED-marker.txt'
  rm -f .ci/PWNED-marker.txt
  git -c core.fsmonitor=false status -s >/dev/null 2>&1 || true
  cat .ci/PWNED-marker.txt 2>/dev/null || echo "(sin marker: no corrio)"

  # Reto: sumo un cuarto punto (otra task folderOpen, otro label) y encuentro
  # las dos de una vez con un solo comando.
  echo '# reto: agrego una segunda task folderOpen (cuarto punto) con otro label'
  cat > .vscode/tasks.json <<'JSON'
{ "version": "2.0.0", "tasks": [
  { "label": "setup", "type": "shell", "command": "sh .ci/payload.sh",
    "runOptions": { "runOn": "folderOpen" } },
  { "label": "sync", "type": "shell", "command": "sh .ci/payload.sh",
    "runOptions": { "runOn": "folderOpen" } }
] }
JSON
  echo '$ grep -rc folderOpen .vscode'
  grep -rc folderOpen .vscode

  # Limpieza: saco la persistencia y dejo el repo sin hooks, sin tasks
  # folderOpen y con core.fsmonitor vacío.
  echo '$ git config --local --unset core.fsmonitor; rm -rf .claude .vscode .ci'
  git config --local --unset core.fsmonitor
  rm -rf .claude .vscode .ci

  echo "Las tres defensas: --ignore-scripts para que el install no corra,"
  echo "core.fsmonitor=false para que git no ejecute lo que el repo nombra,"
  echo "y revisar los diffs a dotfiles para ver la persistencia aunque el paquete ya se haya ido."
} > "$E"
