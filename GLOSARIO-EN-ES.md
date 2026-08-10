# Glosario técnico EN ↔ ES (QA Automation)

Usá este archivo para estudiar 5–10 términos por día en voz alta.

## Fundamentos

| EN | ES | Example sentence |
|----|----|------------------|
| variable | variable | I stored the base URL in a variable. |
| constant | constante | The timeout is a constant. |
| function | función | I extracted a helper function. |
| parameter / argument | parámetro / argumento | The function takes a username parameter. |
| return value | valor de retorno | The function returns a boolean. |
| type | tipo | TypeScript inferred the type. |
| asynchronous | asíncrono | API calls are asynchronous. |
| await | await (esperar) | We await the response before asserting. |
| promise | promesa | fetch returns a promise. |
| debug | depurar | I debugged the failure with logs. |

## Testing

| EN | ES | Example sentence |
|----|----|------------------|
| test case | caso de prueba | I converted my manual test case into an automated script. |
| assertion | aserción / afirmación | The assertion failed because the text was missing. |
| expected / actual | esperado / actual | Expected 200 but actual was 500. |
| smoke test | prueba de humo | Smoke tests verify critical paths quickly. |
| regression suite | suite de regresión | The regression suite runs nightly. |
| end-to-end (E2E) | extremo a extremo | This E2E test covers checkout. |
| flaky test | test inestable | We fixed a flaky test caused by a race condition. |
| false positive | falso positivo | A bad locator caused a false positive failure. |
| edge case | caso borde | I added coverage for an edge case with empty input. |
| exploratory testing | prueba exploratoria | Automation doesn't replace exploratory testing. |

## UI Automation

| EN | ES | Example sentence |
|----|----|------------------|
| locator | localizador | I used a role-based locator. |
| selector | selector | Avoid brittle CSS selectors. |
| Page Object Model (POM) | modelo de objetos de página | POM keeps selectors in one place. |
| auto-waiting | auto-espera | Playwright's auto-waiting reduces sleeps. |
| headless | sin interfaz visible | CI runs tests in headless mode. |
| headed | con navegador visible | I ran headed mode to debug. |
| trace | traza | The trace showed the overlay blocking the button. |

## API

| EN | ES | Example sentence |
|----|----|------------------|
| request / response | solicitud / respuesta | I inspected the response body. |
| endpoint | endpoint / punto de acceso | We call the /login endpoint. |
| payload | carga útil | The payload includes email and password. |
| status code | código de estado | I asserted the status code. |
| header | encabezado | The Authorization header carries the token. |
| contract | contrato | Contract tests validate the schema. |
| unauthorized (401) | no autorizado | Missing token returns 401 Unauthorized. |
| not found (404) | no encontrado | A wrong id returns 404 Not Found. |

## Git & CI/CD

| EN | ES | Example sentence |
|----|----|------------------|
| repository | repositorio | The tests live in this repository. |
| commit | commit / confirmación | Write a clear commit message. |
| branch | rama | Create a feature branch. |
| pull request (PR) | solicitud de extracción | Open a PR for review. |
| merge | fusionar | We merge after CI is green. |
| continuous integration (CI) | integración continua | CI runs on every pull request. |
| workflow | flujo de trabajo | I updated the GitHub Actions workflow. |
| artifact | artefacto | Upload the report as an artifact. |
| quality gate | puerta de calidad | Failing smoke tests block the merge as a quality gate. |

## Soft skills de entrevista

| EN | ES | Example sentence |
|----|----|------------------|
| trade-off | compromiso / trade-off | There's a trade-off between coverage and runtime. |
| maintainability | mantenibilidad | Design for maintainability, not just green tests. |
| root cause | causa raíz | We found the root cause in the shared test data. |
| stakeholder | interesado / stakeholder | I reported the risk to stakeholders. |
