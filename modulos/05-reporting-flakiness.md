# Módulo 05 — Reporting, flakiness y buenas prácticas

**Duración sugerida:** 1 semana  
**Prerrequisito:** Módulo 04  
**Objetivo:** Entregar suites confiables: saber por qué falló un test y cómo estabilizarlo.

---

## 5.1 Clase del profesor

Un test flaky (a veces pasa, a veces no) **destruye confianza**. El equipo deja de mirar el rojo del CI.

Tu trabajo no es solo “tener muchos tests”: es tener **señales confiables**.

---

## 5.2 Teoría

### Causas comunes de flakiness

1. Waits incorrectos / race conditions
2. Selectores ambiguos (múltiples matches)
3. Datos compartidos entre tests (orden dependiente)
4. Entorno lento / red inestable
5. Animaciones / overlays
6. Estado sucio (usuario ya logueado, carrito con items)

### Remedios

- Assertions con auto-wait (`expect` de Playwright)
- Locators estrictos y únicos
- Tests **independientes** (cada uno prepara su estado)
- `test.describe.configure({ mode: 'serial' })` solo cuando hay razón real
- Retries en CI con mesura (no ocultar bugs eternos)
- Trace on first retry

### Reportes

Playwright HTML report + trace:
```bash
npx playwright test
npx playwright show-report
```

En config típico:
```ts
reporter: [["html"], ["list"]],
use: {
  trace: "on-first-retry",
  screenshot: "only-on-failure",
  video: "retain-on-failure",
}
```

### Bugs vs test defects

En entrevista te van a preguntar cómo distinguís:
- **Product bug:** la app no cumple el requisito
- **Test defect:** selector mal, data mala, aserción incorrecta, flaky wait

---

## 5.3 Vocabulario EN

| ES | EN | Frase |
|----|-----|-------|
| condición de carrera | race condition | "It failed due to a race condition before the modal opened." |
| reintento | retry | "We retry flaky tests once in CI." |
| rastro / traza | trace | "The trace shows the button was covered by an overlay." |
| falso positivo/negativo | false positive/negative | "A flaky pass is a false signal." |
| aislamiento | isolation | "Each test runs in isolation with fresh state." |

**Frase de la semana:**  
*"Before blaming the application, I check whether the failure is a test defect or a product bug."*

---

## 5.4 Práctico

En `practicos/05-estabilidad/`:

1. Activá HTML report + trace on first retry + screenshot on failure
2. Elegí 1 test frágil a propósito (mal locator o sleep) y documentá el fallo
3. Arreglalo correctamente (sin sleep eterno)
4. Escribí `FLAKY_POSTMORTEM.md`:
   - síntoma
   - causa raíz
   - fix
   - cómo lo prevenirías en el equipo
5. Asegurate que la suite completa sea independiente (correr 2 veces seguidas = mismo resultado)

### Explain in English

Narrate your postmortem in English (8–12 lines). This is interview gold.

---

## 5.5 Criterio de aprobación

- [ ] Report + traces configurados
- [ ] Postmortem escrito (ES + EN)
- [ ] Suite estable en 2 corridas consecutivas
- [ ] Sabés explicar product bug vs test defect

Pedí: **“Profe, revisá el Módulo 05”**

---

## 5.6 Recursos

- Playwright Trace Viewer: https://playwright.dev/docs/trace-viewer
- Best practices: https://playwright.dev/docs/best-practices
