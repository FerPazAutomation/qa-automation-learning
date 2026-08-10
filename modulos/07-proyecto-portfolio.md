# Módulo 07 — Proyecto portfolio (entregable de empleo)

**Duración sugerida:** 2–3 semanas  
**Prerrequisito:** Módulos 00–06  
**Objetivo:** Un repo público que demuestre nivel mid de QA Automation.

---

## 7.1 Clase del profesor

Los recruiters no leen tus 40 tests. Mirán:
1. README claro
2. Estructura profesional
3. CI verde
4. Si entendés API + UI + diseño

Este módulo **une todo**.

---

## 7.2 Alcance del proyecto (obligatorio)

Repo: `playwright-qa-portfolio` (nombre sugerido)

### Debe incluir

1. **UI E2E** contra Sauce Demo o Bookcart (flujo compra o equivalente)
2. **API tests** contra JSONPlaceholder o Restful Booker
3. **POM** + data-driven
4. **GitHub Actions** smoke en PR
5. **README** en inglés (y opcional español)
6. Carpeta `docs/` con:
   - test strategy (1 página)
   - how to run locally
   - known limitations

### Estructura sugerida

```
playwright-qa-portfolio/
  README.md
  package.json
  playwright.config.ts
  .github/workflows/playwright.yml
  pages/
  tests/
    api/
    ui/
  data/
  docs/
    TEST_STRATEGY.md
```

---

## 7.3 README mínimo (EN)

Secciones:
- About
- Tech stack
- How to run
- What's covered (smoke / regression)
- CI
- Author / LinkedIn

---

## 7.4 Vocabulario EN (portfolio talk)

Practicá decir:

> "This portfolio demonstrates end-to-end UI tests with Playwright, API contract checks, Page Object design, and a GitHub Actions pipeline that gates pull requests on smoke results."

---

## 7.5 Práctico / rúbrica

| Criterio | Peso | Hecho |
|----------|------|-------|
| README profesional EN | 15% | [ ] |
| UI suite con POM | 25% | [ ] |
| API suite con asserts útiles | 20% | [ ] |
| CI verde en main | 20% | [ ] |
| Docs de estrategia | 10% | [ ] |
| Código limpio (nombres, sin sleeps) | 10% | [ ] |

### Explain in English (video o texto)

Grabá 3–5 minutos (o escribí un script) presentando el repo como en entrevista.

---

## 7.6 Criterio de aprobación

- [ ] Repo público
- [ ] CI verde
- [ ] Rúbrica ≥ 80%
- [ ] Pitch EN listo

Pedí: **“Profe, revisá el portfolio (Módulo 07)”** + URL del repo.

---

## 7.7 Recursos de práctica (apps)

- https://www.saucedemo.com
- https://bookcart.azurewebsites.net
- https://the-internet.herokuapp.com
- https://jsonplaceholder.typicode.com
- https://restful-booker.herokuapp.com
