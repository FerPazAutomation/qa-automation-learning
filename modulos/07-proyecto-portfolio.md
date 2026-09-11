# Módulo 07 — Proyecto portfolio (entregable de empleo)

**Duración sugerida:** 2–3 semanas  
**Prerrequisito:** Módulos 00–06 completos (merge del 06 en `master`)  
**Objetivo:** Un proyecto **unificado** que muestre API + UI + POM + CI, listo para LinkedIn y entrevistas.

---

## 7.0 Antes de empezar — checklist

Confirmá **antes** del PASO 1:

- [ ] `master` local = `origin/master` (merge del Módulo 06 hecho)
  ```powershell
  cd C:\Users\Fernando\qa-automation-ruta
  git checkout master
  git pull origin master
  git status
  ```
- [ ] Entendés qué tenés en cada práctico anterior (no copies sin saber):
  - `02-api` → tests API JSONPlaceholder + Restful Booker
  - `03-ui` / `04-diseno` → UI Sauce Demo + POM
  - `05-estabilidad` → report/trace + postmortem
  - `06-cicd` → workflow en `.github/workflows/`
- [ ] Tenés 2–3 horas para el **PASO 1–3** (estructura + config, sin todos los tests aún)

**Decisión del curso:** el portfolio vive en **`practicos/07-portfolio/`** dentro de tu repo `qa-automation-learning`.  
En entrevista podés mostrar ese repo o, más adelante, crear un repo público solo con `07-portfolio` (opcional).

---

## 7.1 Clase del profesor — qué estamos construyendo

Los módulos 02–06 fueron **piezas sueltas** (API acá, UI allá, CI en otra carpeta).

El Módulo 07 **las une en un solo proyecto** como en un trabajo real:

| Pieza | De dónde viene | Qué demuestra |
|-------|----------------|---------------|
| API tests | Módulo 02 | Contrato HTTP, status, JSON |
| UI E2E + POM | Módulos 03–04 | Login, checkout, pages |
| Reporting | Módulo 05 | HTML report, traces |
| CI | Módulo 06 | Smoke en cada PR |

**EN:** *"This portfolio demonstrates API and UI automation with Page Objects and a CI quality gate."*

Un recruiter mira **30 segundos** el README y el badge verde de Actions. Vos explicás el resto en la entrevista.

---

## 7.2 Mapa de archivos (estructura final)

```text
qa-automation-ruta/
│
├── .github/workflows/
│   └── playwright-portfolio.yml     ← PASO 8: CI del portfolio (nuevo o adaptado)
│
└── practicos/07-portfolio/          ← RAÍZ de tu portfolio (todo el módulo acá)
    ├── README.md                    ← PASO 7: cara pública (inglés)
    ├── package.json
    ├── package-lock.json
    ├── playwright.config.ts         ← PASO 3: projects API + UI
    ├── .gitignore                   ← PASO 2
    │
    ├── pages/                       ← PASO 4–5: POM (copiar/adaptar del 04)
    │   ├── LoginPage.ts
    │   └── InventoryPage.ts
    │
    ├── data/
    │   └── users.ts
    │
    ├── helpers/                     ← opcional (del 05)
    │   └── assertions.ts
    │
    ├── tests/
    │   ├── api/
    │   │   ├── todos.spec.ts        ← PASO 5: adaptar del 02
    │   │   └── booking.spec.ts      ← opcional +
    │   └── ui/
    │       ├── login.spec.ts        ← PASO 5: smoke login
    │       └── checkout.spec.ts     ← PASO 5: E2E compra
    │
    ├── docs/
    │   ├── TEST_STRATEGY.md         ← PASO 6
    │   └── HOW_TO_RUN.md            ← PASO 6
    │
    └── PITCH.md                     ← PASO 9: guion entrevista EN
```

**Regla:** todo el código ejecutable del portfolio está **solo** en `practicos/07-portfolio/`.  
No mezcles con `05-estabilidad` — copiás y **mejorás**, no enlazás carpetas.

---

## 7.3 Apps que vas a usar (fijas para este módulo)

| Tipo | App | URL base | Tests |
|------|-----|----------|-------|
| UI | Sauce Demo | `https://www.saucedemo.com` | login + checkout |
| API | JSONPlaceholder | `https://jsonplaceholder.typicode.com` | todos + posts |
| API + | Restful Booker | `https://restful-booker.herokuapp.com` | booking (opcional +) |

---

## PASO 1 — Crear carpeta y proyecto Node

**Dónde:** terminal, raíz del repo.

```powershell
cd C:\Users\Fernando\qa-automation-ruta
git checkout master
git pull origin master
git checkout -b practice/modulo-07-portfolio

mkdir practicos\07-portfolio
cd practicos\07-portfolio
npm init -y
npm install -D @playwright/test typescript
npx playwright install
```

**Qué creaste:**

| Archivo/carpeta | Para qué |
|-----------------|----------|
| `07-portfolio/` | Raíz del portfolio |
| `package.json` | Lista dependencias (`@playwright/test`) |
| `node_modules/` | Librerías (NO commitear) |

**Verificá:** `dir` muestra `package.json` dentro de `07-portfolio`.

---

## PASO 2 — `.gitignore`

**Dónde:** `practicos/07-portfolio/.gitignore`

**Contenido mínimo:**

```gitignore
node_modules/
playwright-report/
test-results/
blob-report/
.env
```

**Para qué:** evita subir dependencias y reportes generados (igual que Módulo 01).

---

## PASO 3 — `playwright.config.ts` (dos mundos: API + UI)

**Dónde:** `practicos/07-portfolio/playwright.config.ts`

**Qué hace:** le dice a Playwright dónde están los tests y qué `baseURL` usa cada grupo.

**Contenido guía** (copiá y leé la tabla después):

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [["html"], ["list"]],
  retries: process.env.CI ? 1 : 0,
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "api-jsonplaceholder",
      use: { baseURL: "https://jsonplaceholder.typicode.com" },
      testMatch: /api\/todos\.spec\.ts/,
    },
    {
      name: "ui-saucedemo",
      use: { baseURL: "https://www.saucedemo.com" },
      testMatch: /ui\/.*\.spec\.ts/,
    },
  ],
});
```

| Línea / bloque | Significado |
|----------------|-------------|
| `testDir: "./tests"` | Busca specs en `tests/` |
| `reporter: html` | Genera reporte HTML al correr | 
| `retries: CI ? 1 : 0` | En CI reintenta 1 vez; local no (más rápido) | 
| `projects[]` | Grupos con distinta baseURL (como Módulo 03/06) |   
| `testMatch` | Qué archivos corre cada project |  

**Verificá:** archivo guardado; todavía no hay tests → normal.

---

## PASO 4 — Copiar POM (adaptar, no pegar ciego)

**Dónde:** `practicos/07-portfolio/pages/`

**Desde:** `practicos/04-diseno/pages/` (LoginPage, InventoryPage)

**Comandos:**

```powershell
cd C:\Users\Fernando\qa-automation-ruta\practicos\07-portfolio
mkdir pages
mkdir data
mkdir tests\api
mkdir tests\ui
mkdir docs
```

Copiá manualmente (o en Explorer) `LoginPage.ts` e `InventoryPage.ts` del 04 al `07/pages/`.

**Después de copiar:** abrí cada file y confirmá que los locators siguen siendo válidos (Username, Add to cart, etc.).

Copiá `data/users.ts` del 04 a `07/data/`.

**Para qué sirve POM aquí:** el portfolio demuestra **mantenibilidad** — mismo concepto del Módulo 04, ahora en el proyecto “final”.

---

## PASO 5 — Tests mínimos obligatorios

No hace falta 40 tests. Sí estos **smoke** (mínimo para aprobar):

### API — `tests/api/todos.spec.ts`

Adaptá **2–3 tests** del Módulo 02 (`practicos/02-api/tests/todos.spec.ts`):

1. GET `/todos/1` → 200 + campos válidos  
2. POST `/posts` → 201 + body refleja payload  

**Verificá:**

```powershell
cd practicos\07-portfolio
npx playwright test --project=api-jsonplaceholder
```

### UI — `tests/ui/login.spec.ts`

1. Login válido → Products visible  
2. (Opcional) 1 caso inválido data-driven  

### UI — `tests/ui/checkout.spec.ts`

1. Login → 2 items → badge 2 → checkout → Thank you  

Usá **pages**, no selectores sueltos en el spec.

**Verificá:**

```powershell
npx playwright test --project=ui-saucedemo
npx playwright test
```

Todo verde antes de seguir.

---

## PASO 6 — Documentación (`docs/`)

**Dónde:** `practicos/07-portfolio/docs/`

### `TEST_STRATEGY.md` (1 página, puede ser ES o EN)

Respondé en prosa corta:

- Qué automatizás (smoke UI checkout, API contract)  
- Qué **no** automatizás (exploratorio, captcha, etc.)  
- Pirámide: más API, pocos E2E UI  
- Cómo corrés local vs CI  

### `HOW_TO_RUN.md`

```markdown
## Prerequisites
- Node.js LTS
- npm

## Install
cd practicos/07-portfolio
npm ci
npx playwright install

## Run all tests
npx playwright test

## Run UI only
npx playwright test --project=ui-saucedemo

## Report
npx playwright show-report
```

---

## PASO 7 — `README.md` (inglés — lo primero que ve el recruiter)

**Dónde:** `practicos/07-portfolio/README.md`

**Secciones obligatorias:**

```markdown
# Playwright QA Portfolio

## About
Brief intro: manual QA background + automation with Playwright/TypeScript.

## Tech stack
Playwright, TypeScript, GitHub Actions, Page Object Model.

## What's covered
- API: JSONPlaceholder (GET/POST contract checks)
- UI: Sauce Demo (login + checkout smoke)
- CI: smoke tests on pull requests

## How to run
(Summary + link to docs/HOW_TO_RUN.md)

## CI
Badge or link to Actions workflow.

## Author
Your name + LinkedIn
```

**Tip:** agregá badge de Actions apuntando a tu repo (cuando CI esté en PASO 8).

---

## PASO 8 — CI para el portfolio

**Dónde:** `.github/workflows/playwright-portfolio.yml` (raíz del repo)

**Importante:** el workflow del Módulo 06 corre `05-estabilidad`. Este es **otro** workflow para el portfolio (o reemplazás uno solo cuando portfolio sea lo principal).

**Esqueleto** (misma idea que Módulo 06):

```yaml
name: Portfolio Playwright Tests

on:
  pull_request:
  push:
    branches: [master]

defaults:
  run:
    working-directory: practicos/07-portfolio

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: practicos/07-portfolio/package-lock.json
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: portfolio-playwright-report
          path: practicos/07-portfolio/playwright-report/
```

**Verificá:** PR → Actions → workflow **Portfolio Playwright Tests** → verde.

---

## PASO 9 — `PITCH.md` (entrevista)

**Dónde:** `practicos/07-portfolio/PITCH.md`

Escribí un guion de **3–5 minutos** en inglés:

1. Who you are (manual QA → automation)  
2. What this repo shows  
3. Walkthrough: API test example + UI checkout + CI  
4. One lesson learned (flaky/postmortem del 05)  

Practicá en voz alta. Esto alimenta el Módulo 08.

---

## PASO 10 — Git y merge (vos a mano)

```powershell
cd C:\Users\Fernando\qa-automation-ruta
git add practicos/07-portfolio .github/workflows/playwright-portfolio.yml PROGRESO.md
git status
git commit -m "Add unified Playwright portfolio with API, UI, POM, and CI"
git push -u origin practice/modulo-07-portfolio
```

PR → `master` → merge → `git checkout master` → `git pull`.

---

## 7.4 Rúbrica (≥ 80% para aprobar)

| Criterio | Peso | [ ] |
|----------|------|-----|
| README profesional EN | 15% | |
| UI suite con POM | 25% | |
| API suite con asserts útiles | 20% | |
| CI verde en master | 20% | |
| Docs (strategy + how to run) | 10% | |
| Código limpio (sin sleeps) | 10% | |

---

## 7.5 Criterio de aprobación

- [ ] `practicos/07-portfolio/` completo y tests verdes localmente  
- [ ] README EN + docs/  
- [ ] CI verde en PR/merge  
- [ ] PITCH.md listo  
- [ ] `PROGRESO.md` Módulo 07 tildado  

Pedí: **“Profe, revisá el portfolio (Módulo 07)”** + qué PASO terminaste.

---

## 7.6 Vocabulario EN

> "This portfolio demonstrates end-to-end UI tests with Playwright, API contract checks, Page Object design, and a GitHub Actions pipeline that gates pull requests on smoke results."

---

## 7.7 Recursos

- Playwright docs: https://playwright.dev/docs/intro
- Sauce Demo: https://www.saucedemo.com
- JSONPlaceholder: https://jsonplaceholder.typicode.com
