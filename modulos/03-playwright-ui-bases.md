# Módulo 03 — Playwright UI: bases

**Duración sugerida:** 2 semanas  
**Prerrequisito:** Módulos 00–02  
**Objetivo:** Automatizar flujos de UI con esperas correctas, selectores robustos y assertions claras.

---

## 3.1 Clase del profesor

Playwright controla un navegador real: abre páginas, hace click, escribe, espera condiciones.

Tu experiencia manual se traduce así:

| Manual | Automation |
|--------|------------|
| Abrir URL | `page.goto` |
| Click en botón | `locator.click` |
| Escribir en input | `locator.fill` |
| Verificar texto | `expect(...).toHaveText` |
| Esperar spinner | auto-wait / `expect` con estado |

El error #1 de juniors: **waits fijos** (`waitForTimeout(5000)`). Eso genera tests flaky y lentos. Playwright ya espera condiciones; aprendé a usarlas.

---

## 3.2 Teoría

### Locators (cómo encontrar elementos)

Preferencia (de mejor a peor, simplificado):

1. `getByRole` — accesible y estable  
2. `getByLabel` / `getByPlaceholder` / `getByText`  
3. `getByTestId` — si el equipo agrega `data-testid`  
4. CSS/XPath — último recurso

```ts
page.getByRole("button", { name: "Log in" })
page.getByLabel("Username")
```

### Auto-waiting

Playwright espera a que el elemento sea **actionable** (visible, enabled, estable) antes del click. Por eso muchos `sleep` sobran.

### Assertions

```ts
await expect(page.getByRole("heading", { name: "Secure Area" })).toBeVisible();
```

### Anatomía de un test UI

```ts
test("user can log in with valid credentials", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("You logged into a secure area!")).toBeVisible();
});
```

### Smoke vs Regression

- **Smoke:** pocos tests críticos (¿la app respira?)
- **Regression:** cobertura más amplia de flujos

---

## 3.3 Vocabulario EN

| ES | EN | Frase |
|----|-----|-------|
| selector / localizador | locator | "I used a role-based locator instead of CSS." |
| inestable | flaky | "The test is flaky because of a race condition." |
| humo | smoke test | "We run smoke tests on every pull request." |
| regresión | regression suite | "The regression suite covers checkout and login." |
| extremo a extremo | end-to-end (E2E) | "This is an end-to-end test of the login flow." |
| rastro | trace | "I opened the Playwright trace to debug the failure." |

**Frase de la semana:**  
*"I prefer role-based locators because they are closer to how users interact with the page."*

---

## 3.4 Sitios para practicar (seguros y legales)

| Sitio | URL | Escenarios |
|-------|-----|------------|
| The Internet | https://the-internet.herokuapp.com | Login, dropdown, checkboxes, waits, alerts |
| Playwright TodoMVC | https://demo.playwright.dev/todomvc | CRUD de tareas, filtros |
| Sauce Demo | https://www.saucedemo.com | Login + carrito (clásico en entrevistas) |
| Bookcart | https://bookcart.azurewebsites.net | E-commerce light |

**No** uses sitios reales de bancos/redes sociales para practicar automation agresiva.

---

## 3.5 Setup

```bash
mkdir -p practicos/03-ui
cd practicos/03-ui
npm init -y
npm install -D @playwright/test
npx playwright install
npx playwright codegen https://the-internet.herokuapp.com/login
```

`codegen` te muestra acciones — **úsalo para aprender selectores**, no para dejar el código crudo sin limpiar.

---

## 3.6 Práctico

### Parte A — Login (The Internet)

Automatizá:
1. Login válido → mensaje de éxito
2. Login inválido → mensaje de error
3. (Opcional) Logout

### Parte B — TodoMVC

1. Crear 3 todos
2. Completar uno
3. Filtrar Active / Completed
4. Borrar uno
5. Assert de contadores si aplica

### Parte C — Sauce Demo (mini E2E)

1. Login `standard_user`
2. Agregar 2 productos
3. Checkout hasta confirmación
4. Assert del mensaje final

### Parte D — Disciplina

- Cero `waitForTimeout` salvo justificación escrita en comentario
- Nombres de test en inglés: `test("user can ...")`
- Un assert significativo por comportamiento (pueden ser varios asserts relacionados)

### Parte E — Explain in English

Explain why auto-waiting reduces flakiness and why `getByRole` is preferred over brittle CSS selectors.

---

## 3.7 Criterio de aprobación

- [ ] ≥ 8 tests UI verdes
- [ ] Al menos 2 sitios cubiertos
- [ ] Sin sleeps injustificados
- [ ] Podés debuggear un fallo con trace/report
- [ ] Explain EN OK

Comando útil de debug:
```bash
npx playwright test --headed --debug
npx playwright show-report
```

Pedí: **“Profe, revisá el Módulo 03”**

---

## 3.8 Recursos

- Playwright Intro: https://playwright.dev/docs/intro
- Locators: https://playwright.dev/docs/locators
- Assertions: https://playwright.dev/docs/test-assertions
- Trace viewer: https://playwright.dev/docs/trace-viewer
