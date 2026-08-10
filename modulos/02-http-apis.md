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

### Parte B — Automatización

Creá `tests/todos.spec.ts`:

1. GET `/todos/1` → status 200 → `id` es number → `title` no vacío
2. GET `/todos/999999` → ¿qué status da? documentá el comportamiento real
3. POST `/posts` → status 201 (o el que responda) → el body refleja tu payload
4. Encadená: crear post (simulado) y validar campos

### Parte C — Restful Booker (nivel +1)

1. Auth → obtener token
2. Crear booking
3. GET booking by id
4. Assert de campos clave

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
