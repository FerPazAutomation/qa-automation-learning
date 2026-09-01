# Módulo 06 — CI/CD con GitHub Actions

**Duración sugerida:** 1–2 semanas  
**Prerrequisito:** Módulos 01 + 05 (repo en GitHub + suite estable)  
**Objetivo:** Que tus tests corran solos en cada Pull Request.

---

## 6.0 Antes de empezar — checklist

Confirmá esto **antes** de tocar nada:

- [ ] Tu repo está en GitHub: `qa-automation-learning`
- [ ] Rama principal se llama **`master`** (no `main`) en tu repo
- [ ] `practicos/05-estabilidad/` existe y los tests pasan localmente:
  ```powershell
  cd C:\Users\Fernando\qa-automation-ruta\practicos\05-estabilidad
  npx playwright test
  ```
- [ ] Estás parado en la **raíz del repo** cuando hagás Git (donde está la carpeta `.git`)

**Suite que usaremos en CI:** `practicos/05-estabilidad` (smoke de login, chica y estable).

---

## 6.1 Clase del profesor (qué estamos construyendo)

Hoy no escribís tests nuevos. Construís un **robot en GitHub** que:

1. Detecta cuando abrís un PR o pusheás a `master`
2. Descarga tu código en una máquina virtual (runner)
3. Instala Node + Playwright + browsers
4. Corre `npx playwright test`
5. Si falla → check rojo + guarda el reporte HTML para que lo descargues

**EN:** *"CI runs smoke tests on every pull request and blocks merge when they fail."*

---

## 6.2 Mapa de archivos (dónde va cada cosa)

```text
qa-automation-ruta/                    ← RAÍZ del repo (Git vive acá)
│
├── .github/
│   └── workflows/
│       └── playwright.yml             ← PASO 2: el pipeline (CI)
│
├── practicos/
│   ├── 05-estabilidad/              ← la suite que CI va a ejecutar
│   │   ├── package.json
│   │   ├── package-lock.json        ← OBLIGATORIO para npm ci en CI
│   │   ├── playwright.config.ts
│   │   └── tests/login.spec.ts
│   │
│   └── 06-cicd/                     ← PASO 1: evidencia del módulo
│       ├── EVIDENCIA.md             ← links/capturas CI rojo + verde
│       └── EXPLAIN.md               ← narración EN del flujo PR → check
│
└── PROGRESO.md                      ← tildar Módulo 06 al terminar
```

**Regla:** el workflow YAML va en la **raíz** (`.github/`), no dentro de `practicos/`.  
GitHub solo mira `.github/workflows/` en la raíz del repo.

---

## 6.3 PASO 1 — Crear carpeta de evidencia

**Dónde:** terminal, desde la raíz del repo.

```powershell
cd C:\Users\Fernando\qa-automation-ruta
mkdir practicos\06-cicd
```

**Qué creás:** una carpeta para documentar el módulo (no es código de tests).

Creá `practicos/06-cicd/EVIDENCIA.md` con esta plantilla (completala después):

```md
# Evidencia CI — Módulo 06

## CI verde (primera vez)
- PR: (link)
- Workflow run: (link de la pestaña Actions)
- Fecha:

## CI rojo (test roto a propósito)
- Commit que rompió:
- Workflow run:
- Qué falló:

## CI verde (después del fix)
- Commit que arregló:
- Workflow run:
```

**Para qué sirve:** en entrevista y en el curso demostrás que entendés rojo vs verde, no solo “configuré YAML”.

---

## 6.4 PASO 2 — Crear el workflow (línea por línea)

**Dónde:** archivo nuevo en  
`C:\Users\Fernando\qa-automation-ruta\.github\workflows\playwright.yml`

**Cómo crear la carpeta** (si no existe):

```powershell
cd C:\Users\Fernando\qa-automation-ruta
mkdir .github\workflows
```

**Contenido del archivo** (copiá y después leé la explicación):

```yaml
name: Playwright Smoke Tests

on:
  pull_request:
  push:
    branches: [master]

defaults:
  run:
    working-directory: practicos/05-estabilidad

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: practicos/05-estabilidad/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload HTML report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: practicos/05-estabilidad/playwright-report/
          retention-days: 7
```

### Qué hace cada bloque

| Líneas | Qué es | Para qué |
|--------|--------|----------|
| `name:` | Nombre del workflow | Aparece en la pestaña **Actions** de GitHub |
| `on: pull_request` | Trigger | Corre cuando abrís/actualizás un PR |
| `on: push: branches: [master]` | Trigger | Corre cuando pusheás directo a master |
| `defaults.run.working-directory` | Carpeta de trabajo | Todos los `run:` se ejecutan **dentro** de `05-estabilidad` (donde está el package.json) |
| `jobs.test.runs-on: ubuntu-latest` | Runner | Máquina virtual Linux en la nube de GitHub |
| `actions/checkout@v4` | Step | Clona tu repo en esa máquina |
| `actions/setup-node@v4` | Step | Instala Node 22 |
| `cache: npm` | Opcional | Acelera instalaciones repetidas |
| `npm ci` | Step | Instala dependencias **exactas** del lockfile (más confiable que npm install en CI) |
| `playwright install --with-deps` | Step | Descarga Chromium/Firefox/WebKit + libs del SO |
| `npx playwright test` | Step | Corre tus tests (lo mismo que en tu PC) |
| `upload-artifact` + `if: failure()` | Step | Solo si falló: sube la carpeta `playwright-report/` para descargarla |

**EN:** *"The workflow checks out code, installs dependencies, runs Playwright, and uploads the report on failure."*

### Errores comunes

| Error | Causa |
|-------|--------|
| `npm ci` falla | Falta `package-lock.json` en esa carpeta |
| No encuentra tests | `working-directory` mal puesto |
| Workflow no corre | Archivo no está en `.github/workflows/` de la raíz |
| Trigger no dispara | Pusheaste a otra rama, no a la del PR |

---

## 6.5 PASO 3 — Verificar localmente antes del push

**Dónde:** `practicos/05-estabilidad`

```powershell
cd C:\Users\Fernando\qa-automation-ruta\practicos\05-estabilidad
npx playwright test
```

Si acá está rojo, CI también estará rojo. No subas hasta que local esté verde (salvo el paso didáctico de romper a propósito).

---

## 6.6 PASO 4 — Git y PR (vos a mano)

**Dónde:** raíz del repo.

```powershell
cd C:\Users\Fernando\qa-automation-ruta
git checkout master
git pull origin master
git checkout -b practice/modulo-06-cicd

git add .github/workflows/playwright.yml practicos/06-cicd
git status
# Debe listar el yml y 06-cicd. NO node_modules, NO playwright-report

git commit -m "Add GitHub Actions workflow for Playwright smoke tests"
git push -u origin practice/modulo-06-cicd
```

**Qué pasa:** GitHub detecta el push y puede correr el workflow (según el trigger).

**Abrí PR en el navegador:**
- base: `master`
- compare: `practice/modulo-06-cicd`
- Título: `Add GitHub Actions workflow for Module 06`

---

## 6.7 PASO 5 — Ver el CI en GitHub (dónde mirar)

1. Entrá a tu repo en GitHub
2. Pestaña **Actions**
3. Clic en el workflow **Playwright Smoke Tests**
4. Clic en el run más reciente
5. Expandí el job **test** → ves cada step (checkout, install, test…)

**Check en el PR:** abajo del PR aparece ✅ o ❌ junto al workflow.

Completá `EVIDENCIA.md` con el link del run verde.

---

## 6.8 PASO 6 — Prueba didáctica: CI rojo y CI verde (obligatorio)

**Objetivo:** demostrar que el pipeline **detecta** un fallo.

### 6.8a Romper a propósito

**Dónde:** `practicos/05-estabilidad/pages/LoginPage.ts`

Cambiá temporalmente:

```ts
{ name: "Username1" }  // mal a propósito
```

```powershell
git add practicos/05-estabilidad/pages/LoginPage.ts
git commit -m "Break login locator to test CI failure"
git push
```

Esperá el workflow en Actions → debe quedar **rojo**.  
En **Artifacts** del run deberías poder descargar `playwright-report`.

Anotá el link en `EVIDENCIA.md` (sección CI rojo).

### 6.8b Arreglar

Volvé a `"Username"`, commit, push → workflow **verde**.  
Anotá en `EVIDENCIA.md` (sección CI verde después del fix).

**EN:** *"I verified the pipeline fails when tests fail and passes after the fix."*

---

## 6.9 PASO 7 — EXPLAIN.md (inglés)

**Dónde:** `practicos/06-cicd/EXPLAIN.md`

Escribí 8–12 líneas explicando el flujo:

1. Open a pull request
2. GitHub triggers the workflow
3. Runner checks out code and installs dependencies
4. Playwright runs smoke tests
5. If tests fail, the check is red and the HTML report is uploaded
6. If tests pass, the check is green and the PR can be merged

---

## 6.10 Criterio de aprobación

- [ ] `.github/workflows/playwright.yml` en la raíz del repo
- [ ] CI verde con suite estable
- [ ] Evidencia de CI rojo + CI verde en `EVIDENCIA.md`
- [ ] Podés explicar: checkout → npm ci → playwright install → test → artifact
- [ ] `EXPLAIN.md` en inglés
- [ ] `PROGRESO.md` Módulo 06 tildado

Pedí: **“Profe, revisá el Módulo 06”** + link al workflow run.

---

## 6.11 Vocabulario EN

| ES | EN |
|----|-----|
| integración continua | continuous integration (CI) |
| flujo de trabajo | workflow |
| ejecutor | runner |
| artefacto | artifact |
| puerta de calidad | quality gate |

**Frase de la semana:**  
*"I configured the pipeline to fail the pull request when smoke tests fail."*

---

## 6.12 Recursos

- GitHub Actions quickstart: https://docs.github.com/en/actions/writing-workflows/quickstart
- Playwright CI: https://playwright.dev/docs/ci
- Playwright + GitHub Actions: https://playwright.dev/docs/ci-intro
