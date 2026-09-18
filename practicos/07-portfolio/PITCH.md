# Portfolio Interview Pitch

## English (interview version)

Hello, my name is Fernando Paz.

I have around five years of experience in Manual QA. During that time, I developed skills in test case design, exploratory testing, regression testing, defect reporting, and collaboration with development teams.

I am currently transitioning into QA Automation. I chose this path because I want to complement my manual testing experience with technical skills and create faster, repeatable, and reliable test coverage.

To demonstrate this transition, I built this portfolio project using Playwright and TypeScript.

The project covers two testing layers: API and UI.

For API testing, I use JSONPlaceholder. I created tests for GET and POST requests. These tests verify HTTP status codes and important response fields. I also documented the behavior of this fake API when a created resource is not actually persisted.

For UI testing, I use Sauce Demo. The suite covers a successful login, data-driven invalid login scenarios, and a complete checkout flow. The checkout test logs in, adds two products to the cart, verifies the cart badge, completes the customer information, and confirms the purchase.

I implemented the Page Object Model to separate page actions from test assertions. For example, login and inventory actions are stored in page classes, while the test files describe the expected behavior. I also separated test data from the tests. This makes the suite easier to read and maintain.

The project uses different Playwright projects for API and UI tests, each with its own base URL. It also generates an HTML report and captures screenshots and traces when failures occur.

I configured GitHub Actions as the continuous integration pipeline. The complete test suite runs automatically on pull requests and pushes to the master branch. This provides a quality gate before changes are merged.

One important lesson from this learning path was understanding the difference between a product bug and a test automation defect. I intentionally worked with an unstable locator, analyzed the failure using Playwright reports and traces, and corrected the test. This taught me that a failed automated test is evidence that must be investigated, not automatic proof of a product bug.

I bring around five years of Manual QA experience, and this portfolio demonstrates the automation skills I have developed during my transition. My manual testing background helps me choose relevant scenarios, understand risk, and investigate failures instead of only writing scripts.

My next goal is to apply these skills in a professional automation team, continue improving my TypeScript and Playwright knowledge, and contribute to maintainable test suites and CI pipelines.

---

## Español (referencia / práctica)

Hola, mi nombre es Fernando Paz.

Tengo aproximadamente cinco años de experiencia en QA Manual. Durante ese tiempo, desarrollé habilidades en diseño de casos de prueba, pruebas exploratorias, pruebas de regresión, reporte de defectos y colaboración con equipos de desarrollo.

Actualmente estoy haciendo la transición hacia QA Automation. Elegí este camino porque quiero complementar mi experiencia en testing manual con habilidades técnicas y crear una cobertura de pruebas más rápida, repetible y confiable.

Para demostrar esta transición, construí este proyecto de portfolio utilizando Playwright y TypeScript.

El proyecto cubre dos niveles de testing: API y UI.

Para las pruebas de API utilizo JSONPlaceholder. Creé pruebas para solicitudes GET y POST. Estas pruebas verifican códigos de estado HTTP y campos importantes de las respuestas. También documenté el comportamiento de esta API simulada cuando un recurso creado no se guarda realmente.

Para las pruebas de UI utilizo Sauce Demo. La suite cubre un inicio de sesión exitoso, escenarios data-driven de inicio de sesión inválido y un flujo completo de checkout. La prueba de checkout inicia sesión, agrega dos productos al carrito, verifica el indicador del carrito, completa la información del cliente y confirma la compra.

Implementé Page Object Model para separar las acciones de las páginas de las validaciones de los tests. Por ejemplo, las acciones de login e inventario se guardan en clases de página, mientras que los archivos de tests describen el comportamiento esperado. También separé los datos de prueba de los tests. Esto hace que la suite sea más fácil de leer y mantener.

El proyecto utiliza diferentes projects de Playwright para las pruebas de API y UI, cada uno con su propia URL base. También genera un reporte HTML y captura screenshots y traces cuando ocurren fallos.

Configuré GitHub Actions como pipeline de integración continua. La suite completa se ejecuta automáticamente en los pull requests y en los pushes a la rama `master`. Esto proporciona un control de calidad antes de integrar cambios.

Una lección importante de esta ruta de aprendizaje fue entender la diferencia entre un bug del producto y un defecto de la automatización. Trabajé intencionalmente con un locator inestable, analicé el fallo utilizando reportes y traces de Playwright y corregí la prueba. Esto me enseñó que un test automatizado fallido es evidencia que debe investigarse, no una prueba automática de que existe un bug en el producto.

Aporto aproximadamente cinco años de experiencia en QA Manual, y este portfolio demuestra las habilidades de automatización que desarrollé durante mi transición. Mi experiencia en testing manual me ayuda a elegir escenarios relevantes, entender los riesgos e investigar fallos, en lugar de limitarme a escribir scripts.

Mi próximo objetivo es aplicar estas habilidades en un equipo profesional de automatización, continuar mejorando mis conocimientos de TypeScript y Playwright y contribuir al desarrollo de suites de pruebas mantenibles y pipelines de integración continua.
