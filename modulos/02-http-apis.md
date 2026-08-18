# Módulo 02 — HTTP, APIs y testing de contrato

**Duración sugerida:** 1–2 semanas  
**Prerrequisito:** Módulos 00–01  
**Objetivo:** Entender cómo habla el frontend con el backend y automatizar pruebas de API (muy pedido en el mercado).

---

## 2.1 Clase del profesor

Muchos “bugs de UI” son en realidad **fallos de API**. Un buen QA Automation prueba:
- UI (lo que ve el usuario)
- API (el contrato entre sistemas)

Si solo automatizás clicks, sos reemplazable. Si entendés HTTP, sos valioso.

---

## 2.2 Teoría

### Cliente ↔ Servidor

```
Browser / Test  --HTTP request-->  Server
Browser / Test  <--HTTP response-- Server
```

### Métodos HTTP comunes

| Método | Uso típico |
|--------|------------|
| GET | Leer datos (no debería modificar) |
| POST | Crear recurso |
| PUT/PATCH | Actualizar |
| DELETE | Borrar |

### Status codes (memorá familias)

- **2xx** éxito (200 OK, 201 Created)
- **4xx** error del cliente (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx** error del servidor (500 Internal Server Error)

### Headers y body

- **Headers:** metadatos (Content-Type, Authorization)
- **Body:** payload (casi siempre JSON en APIs modernas)

### JSON

Formato de datos texto. Ejemplo:

```json
{
  "id": 1,
  "title": "Learn Playwright",
  "completed": false
}
```

### Qué es un test de API

Arrange: preparás datos/auth  
Act: hacés el request  
Assert: status + shape del JSON + reglas de negocio

### Auth (idea)

- API Key, Bearer Token, Basic Auth, cookies/sesión  
En prácticas usaremos APIs públicas y Restful Booker (tiene auth).

---

## 2.3 Vocabulario EN

| ES | EN | Frase |
|----|-----|-------|
| solicitud | request | "I sent a POST request to create a booking." |
| respuesta | response | "The response body includes the booking id." |
| punto de entrada | endpoint | "We hit the /todos endpoint." |
| carga útil | payload | "The payload is missing the email field." |
| código de estado | status code | "I asserted the status code equals 201." |
| contrato | contract | "This test validates the API contract." |
| no autorizado | unauthorized | "Without a token we get 401 Unauthorized." |

**Frase de la semana:**  
*"I validated both the status code and the response schema."*

---

## 2.4 Apps / recursos para practicar

| Recurso | URL | Uso |
|---------|-----|-----|
| JSONPlaceholder | https://jsonplaceholder.typicode.com | CRUD fake, ideal para empezar |
| Restful Booker | https://restful-booker.herokuapp.com | Auth + booking |
| HTTPBin | https://httpbin.org | Inspeccionar requests |
| Postman (manual primero) | https://www.postman.com | Explorar endpoints antes de automatizar |

**Regla de clase:** primero explorá en Postman (o browser), **después** automatizá. Así no automatizás a ciegas.

---

## 2.5 Setup Playwright (solo request, aún sin UI profunda)

```bash
mkdir -p practicos/02-api
cd practicos/02-api
npm init -y
npm install -D @playwright/test typescript
npx playwright install
```

Creá `playwright.config.ts` mínimo y carpeta `tests/`.

---

## 2.6 Práctico

### Parte A — Exploración manual (obligatoria)

En Postman o curl:

1. `GET https://jsonplaceholder.typicode.com/todos/1`
2. Anotá: status, headers relevantes, campos del body
3. `POST /posts` con un JSON inventado
4. Documentá en `practicos/02-api/EXPLORACION.md`

### Parte B — Automatización (dónde y qué)

**Dónde trabajás:** siempre dentro de `practicos/02-api/`

**Estructura esperada:**

```text
practicos/02-api/
  package.json
  playwright.config.ts
  EXPLORACION.md          ← Parte A
  tests/
    todos.spec.ts         ← Parte B (creá este archivo)
```

**Setup (si aún no lo hiciste), en PowerShell:**

```powershell
cd practicos/02-api
npm init -y
npm install -D @playwright/test typescript
npx playwright install
```

**`playwright.config.ts` mínimo** (en la raíz de `02-api`):

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "https://jsonplaceholder.typicode.com",
  },
});
```

**Archivo a crear:** `tests/todos.spec.ts`  
Ahí van **4 tests** (4 bloques `test(...)`). No es UI: usás `request` de Playwright.

Idea de cada test:

1. **GET feliz** — `GET /todos/1`  
   Assert: status `200`, `id` es `number`, `title` string no vacío.
2. **GET id inexistente** — `GET /todos/999999`  
   Anotá el status real (JSONPlaceholder a veces igual da 200 con `{}`). Documentalo en un comentario o en `EXPLORACION.md`.
3. **POST crear post** — `POST /posts` con tu JSON inventado  
   Assert: status `201` (o el que responda) y que el body traiga tu `title` / `body` / `userId`.
4. **Encadenado** — en un solo test: hacés POST, leés el `id` de la respuesta y validás que ese `id` exista y que los campos coincidan con lo enviado.

**Cómo correrlos:**

```powershell
cd practicos/02-api
npx playwright test
```

Esqueleto orientativo (completalo vos; no copies ciego):

```ts
import { test, expect } from "@playwright/test";

test("GET /todos/1 returns a valid todo", async ({ request }) => {
  const response = await request.get("/todos/1");
  // expect status + body fields
});

test("GET /todos/999999 documents real behavior", async ({ request }) => {
  const response = await request.get("/todos/999999");
  // log/assert the real status and body
});

test("POST /posts creates a post with my payload", async ({ request }) => {
  const payload = { title: "...", body: "...", userId: 1 };
  const response = await request.post("/posts", { data: payload });
  // expect status + body reflects payload
});

test("POST then validate returned fields", async ({ request }) => {
  // post → read json → assert id + fields
});
```

### Parte C — Restful Booker (nivel +1)

Esta parte simula mejor un sistema real (banco, reservas, etc.): **primero te identificás, después creás, después leés lo creado**.

Docs: https://restful-booker.herokuapp.com/apidoc/index.html  
Base URL: `https://restful-booker.herokuapp.com`

**Regla de clase:** explorá en Postman primero (como la Parte A), **después** automatizá en `tests/booking.spec.ts`.

#### Qué es distinto de JSONPlaceholder

| JSONPlaceholder | Restful Booker |
|-----------------|----------------|
| Sin login | Hay que pedir un **token** |
| POST “falso” (GET del id nuevo = 404) | El booking **sí existe** después del POST |
| Status create = 201 | Create suele responder **200** (anotá el real) |

**EN:** *"Authentication proves who you are; then you create a resource and read it back by id."*

#### Paso 1 — Auth (obtener token)

En Postman:

- Método: `POST`
- URL: `https://restful-booker.herokuapp.com/auth`
- Body raw JSON:

```json
{
  "username": "admin",
  "password": "password123"
}
```

(esas credenciales son públicas de la demo, no son un secreto de un banco)

Respuesta esperada: algo como `{ "token": "abc123..." }`.

Guardá ese valor: lo vas a usar como cookie `token=...` en operaciones que lo pidan (update/delete). **Crear y GET booking suelen no exigir token**; el token es para practicar el flujo de auth.

#### Paso 2 — Crear booking

- Método: `POST`
- URL: `https://restful-booker.herokuapp.com/booking`
- Header: `Content-Type: application/json` y `Accept: application/json`
- Body de ejemplo (inventá nombre/fechas):

```json
{
  "firstname": "Fernando",
  "lastname": "QA",
  "totalprice": 150,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-09-01",
    "checkout": "2026-09-05"
  },
  "additionalneeds": "Breakfast"
}
```

En la respuesta buscá `bookingid` (número) y el objeto `booking` con tus campos.

#### Paso 3 — GET por id

- Método: `GET`
- URL: `https://restful-booker.herokuapp.com/booking/{bookingid}`
- Header importante: `Accept: application/json` (si no, a veces devuelve XML)

Assertá que `firstname`, `lastname`, `totalprice` coincidan con lo que enviaste.

#### Paso 4 — Automatizar

Archivo nuevo: `practicos/02-api/tests/booking.spec.ts`

Un test (o dos) que haga **el encadenado de verdad**:

1. `POST /auth` → extraer `token`  
2. `POST /booking` → extraer `bookingid`  
3. `GET /booking/{bookingid}` → assert de campos  

En Playwright, `baseURL` de Restful Booker es otro dominio. Opciones:

- URL absoluta en esos tests, o  
- un segundo `request` / `baseURL` solo para este archivo.

Ejemplo de extraer token y encadenar (vos completás asserts):

```ts
const auth = await request.post("https://restful-booker.herokuapp.com/auth", {
  data: { username: "admin", password: "password123" },
});
const { token } = await auth.json();

const create = await request.post("https://restful-booker.herokuapp.com/booking", {
  headers: { Accept: "application/json" },
  data: { /* payload */ },
});
const created = await create.json();
const id = created.bookingid;

const get = await request.get(
  `https://restful-booker.herokuapp.com/booking/${id}`,
  { headers: { Accept: "application/json" } }
);
```

Documentá en `EXPLORACION.md` status reales (auth, create, get).

---

**Criterio de esta parte:** ≥ 1 test verde que cree un booking y lo vuelva a leer por id. El token tiene que existir en la respuesta de `/auth` aunque el GET no lo use.

### Parte D — Explain in English

`EXPLAIN.md`:

Explain:
- What an endpoint is
- Difference between 401 and 404
- Why API tests are often faster/more stable than UI tests

---

## 2.7 Criterio de aprobación

- [ ] Exploración manual documentada
- [ ] ≥ 4 tests API verdes localmente
- [ ] Sabés explicar request/response/status/JSON
- [ ] Explain EN entregado

Pedí: **“Profe, revisá el Módulo 02”**

---

## 2.8 Recursos

- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
- Playwright API testing: https://playwright.dev/docs/api-testing
- JSONPlaceholder guide: https://jsonplaceholder.typicode.com/guide
