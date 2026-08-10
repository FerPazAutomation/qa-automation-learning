# 5 comandos Git que uso y para qué sirven

1. `git init` — Inicializa Git en la carpeta del proyecto (crea el historial local `.git`). Se hace una vez.
2. `git add` — Prepara archivos en staging (zona local). NO sube nada a GitHub.
3. `git checkout -b nombre` — Crea una branch nueva y me cambia a ella para trabajar en paralelo sin tocar `master`/`main`.
4. `git commit -m "mensaje"` — Guarda un snapshot LOCAL de lo que está en staging, con un mensaje claro.
5. `git push` — Sube los commits locales al remoto (GitHub).

## Buen vs mal commit message

Mal:
```bash
git commit -m "se realizo un cambio"
```

Bien:
```bash
git commit -m "Add Git practice notes for module 01"
```
