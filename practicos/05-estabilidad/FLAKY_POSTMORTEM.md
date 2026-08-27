## Síntoma
Al correr `npx playwright test`, el login falló (timeout / locator not found).
Con retries=1 vi el retry en el reporte HTML.

## Causa raíz
Test defect (no product bug): en LoginPage usé getByRole(..., name: "Username1").
El name accesible real es "Username".

## Fix
Cambié "Username1" → "Username". Suite verde.

## Prevención
- Revisar locators en code review
- Preferir getByRole con el name que muestra Accessibility en DevTools
- No asumir nombres; validar en la UI

## English narration
I intentionally broke the username locator to practice failure analysis.
The HTML report and retry showed a locator error, not an application bug.
Root cause: wrong accessible name "Username1" instead of "Username".
I fixed the page object and re-ran the suite successfully.
This distinguishes a test defect from a product bug.
In a team I would catch this with locator review and stable role-based selectors.
Traces/screenshots on failure help confirm what the browser saw.