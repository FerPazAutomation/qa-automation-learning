# Módulo 04 — Diseño de automatización (POM, data-driven, capas)

**Duración sugerida:** 1–2 semanas  
**Prerrequisito:** Módulo 03  
**Objetivo:** Dejar de tener “tests spaghetti” y diseñar suites mantenibles.

---

## 4.1 Clase del profesor

Escribir un test que funciona es nivel 1.  
Escribir tests que **otro QA pueda mantener en 6 meses** es nivel profesional.

Patrones clave:
- **Page Object Model (POM):** la página conoce sus locators y acciones; el test conoce el negocio.
- **Data-driven:** mismos pasos, distintos datos.
- **Separación de responsabilidades:** test ≠ page ≠ datos ≠ config.

---

## 4.2 Teoría

### Anti-patrón (mal)

```ts
test("login", async ({ page }) => {
  await page.locator("#username").fill("tomsmith");
  await page.locator("#password").fill("SuperSecretPassword!");
  await page.locator(".fa-sign-in").click();
  // 80 líneas más...
});
```

Problemas: selectores duplicados, tests ilegibles, un cambio de UI rompe 40 archivos.

### Page Object (bien, idea)

```ts
// pages/LoginPage.ts
export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
```

```ts
// tests/login.spec.ts
test("valid user reaches secure area", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("tomsmith", "SuperSecretPassword!");
  await expect(page.getByText("You logged into a secure area!")).toBeVisible();
});
```

### Pirámide de testing (para decidir qué automatizar)

```
      /\
     /UI\        pocos, caros, frágiles
    /----\
   / API  \      muchos, rápidos, estables
  /--------\
 /  Unit    \    (devs; vos colaborás en calidad)
```

Como QA Automation: **más API + smoke UI**, no “todo por UI”.

### Qué automatizar vs no

Automatizá: regresiones estables, reglas de negocio claras, smoke.  
Cuidado / no primero: captchas, animaciones puramente visuales sin valor, entornos inestables.

---

## 4.3 Vocabulario EN

| ES | EN | Frase |
|----|-----|-------|
| modelo de objetos de página | Page Object Model | "I refactored the suite to use the Page Object Model." |
| mantenibilidad | maintainability | "POM improves maintainability when the UI changes." |
| dirigido por datos | data-driven | "We run a data-driven test for invalid login cases." |
| fixture | fixture | "Playwright fixtures inject the page object." |
| deuda técnica | technical debt | "Hardcoded sleeps create technical debt." |

**Frase de la semana:**  
*"I keep business assertions in the test and selectors inside the page object."*

---

## 4.4 Práctico

Refactorizá tu suite del Módulo 03 en `practicos/04-diseno/`:

1. `pages/` con al menos Login + Inventory/Todo (según el sitio)
2. `tests/` delgados (flujo de negocio)
3. `data/users.json` (o `.ts`) con usuarios válidos/inválidos
4. Un test data-driven de login inválido (2–3 casos)
5. Config: `baseURL` en `playwright.config.ts`

### Challenge (nota extra)

Agregá un helper `expectErrorMessage(text)` reutilizable.

### Explain in English

Explain what belongs in a Page Object versus what belongs in a test file, and why that split matters for maintainability.

---

## 4.5 Criterio de aprobación

- [ ] POM aplicado en ≥ 2 páginas
- [ ] Tests leíbles sin selectores CSS sueltos (idealmente)
- [ ] Data-driven presente
- [ ] Explain EN OK

Pedí: **“Profe, revisá el Módulo 04”**

---

## 4.6 Recursos

- Playwright POM: https://playwright.dev/docs/pom
- Martin Fowler — PageObject: https://martinfowler.com/bliki/PageObject.html
