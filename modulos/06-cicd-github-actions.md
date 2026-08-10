# Módulo 06 — CI/CD con GitHub Actions

**Duración sugerida:** 1–2 semanas  
**Prerrequisito:** Módulos 01 + 05 (repo en GitHub + suite estable)  
**Objetivo:** Que tus tests corran solos en cada Pull Request.

---

## 6.1 Clase del profesor

**CI (Continuous Integration):** cada cambio se integra y se valida automáticamente.  
**CD (Continuous Delivery/Deployment):** el software queda listo (o se despliega) de forma frecuente.

Para QA Automation, tu valor en CI es:
> “Ningún PR mergea si el smoke está rojo.”

Eso es lo que buscan las empresas cuando dicen “experiencia con CI/CD”.

---

## 6.2 Teoría

### Pipeline (idea)

```
Push / PR
  → checkout código
  → setup Node
  → npm ci
  → instalar browsers Playwright
  → correr tests
  → subir reporte / artifacts si falla
```

### GitHub Actions — piezas

- **Workflow:** archivo YAML en `.github/workflows/`
- **Trigger:** `pull_request`, `push`, `workflow_dispatch`
- **Job:** unidad de trabajo en un runner
- **Step:** comando individual
- **Artifact:** archivos guardados (reportes, traces)

### Ejemplo mínimo (esqueleto)

```yaml
name: Playwright Tests
on:
  pull_request:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

Vas a **entender cada línea**, no solo pegarla.

### Smoke en CI vs Regression nocturna

- PR: smoke rápido (5–15 min)
- Nightly: regression más amplia

---

## 6.3 Vocabulario EN

| ES | EN | Frase |
|----|-----|-------|
| integración continua | continuous integration (CI) | "Our CI runs smoke tests on every PR." |
| entrega continua | continuous delivery (CD) | "CD keeps the build ready to release." |
| flujo de trabajo | workflow | "I added a GitHub Actions workflow for Playwright." |
| artefacto | artifact | "I uploaded the HTML report as an artifact." |
| ejecutor | runner | "The job runs on an Ubuntu runner." |
| disparador | trigger | "The workflow is triggered on pull requests." |

**Frase de la semana:**  
*"I configured the pipeline to fail the pull request when smoke tests fail."*

---

## 6.4 Práctico

En el repo de tu suite (recomendado: `practicos/07` o el proyecto unificado del Módulo 07; si aún no, usá `practicos/04` o `05`):

1. Creá `.github/workflows/playwright.yml`
2. Trigger en `pull_request` y `push` a main
3. Cache de npm (opcional, nota extra)
4. Subí artifact del reporte si falla
5. Abrí un PR de prueba que:
   - primero rompa un test a propósito → CI rojo
   - luego arreglalo → CI verde
6. Documentá capturas o links de los checks en `practicos/06-cicd/EVIDENCIA.md`

### Explain in English

Explain what happens from the moment you open a PR until the CI check turns green or red.

---

## 6.5 Criterio de aprobación

- [ ] Workflow en GitHub Actions funcionando
- [ ] Evidencia de CI rojo y CI verde
- [ ] Podés explicar checkout → install → test → artifact
- [ ] Explain EN OK

Pedí: **“Profe, revisá el Módulo 06”** + link al workflow run.

---

## 6.6 Recursos

- GitHub Actions quickstart: https://docs.github.com/en/actions/writing-workflows/quickstart
- Playwright CI: https://playwright.dev/docs/ci
- Playwright + GitHub Actions: https://playwright.dev/docs/ci-intro
