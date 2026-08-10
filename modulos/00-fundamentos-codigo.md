# Módulo 00 — Fundamentos de código

**Duración sugerida:** 1–2 semanas  
**Objetivo:** Entender qué es código, variables, control de flujo, funciones y tipos — para dejar de “seguir recetas” y empezar a razonar.

---

## 0.1 Por qué este módulo (clase del profesor)

Como QA Manual ya sabés *qué* probar. Automation es *cómo expresar esas pruebas en un lenguaje que la máquina ejecuta*.

Sin fundamentos, la IA te escribe Playwright y vos no podés:
- debuggear un fallo
- explicar en entrevista *por qué* funciona
- adaptar el código a un caso nuevo

Por eso **primero código, después herramientas**.

---

## 0.2 Teoría esencial (léela antes de tocar el teclado)

### Qué es un programa

Un programa es una secuencia de **instrucciones** que la computadora ejecuta en orden (salvo que vos cambies el flujo con `if`, bucles, etc.).

### Variables

Una **variable** es un nombre que guarda un valor.

```ts
const username = "fernando"; // no se reasigna
let attempts = 0;            // se puede reasignar
attempts = attempts + 1;
```

- `const`: preferilo por defecto (menos bugs).
- `let`: solo cuando el valor cambia.

### Tipos (TypeScript)

Los tipos dicen *qué forma* tiene un valor. Evitan errores tontos antes de correr el test.

```ts
let age: number = 30;
let isLoggedIn: boolean = false;
let title: string = "Checkout";

// Objeto tipado
type User = {
  id: number;
  email: string;
};

const user: User = { id: 1, email: "qa@test.com" };
```

### Funciones

Una función empaqueta lógica reutilizable. En testing: cada helper, cada page method, cada assert custom es una función.

```ts
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
```

### Control de flujo

```ts
if (status === 200) {
  // camino feliz
} else {
  // camino de error
}

for (const item of items) {
  // repetir por cada elemento
}
```

### Arrays y objetos

```ts
const statuses = [200, 201, 204];
const product = { name: "Laptop", price: 1200 };

// Destructuring (muy usado en automation)
const { name, price } = product;
```

### Async / await (CRÍTICO para automation)

Casi todo en la web es **asíncrono**: pedís algo y esperás la respuesta.

```ts
async function fetchStatus(): Promise<number> {
  const response = await fetch("https://example.com");
  return response.status;
}
```

`await` = “esperá este resultado antes de seguir”.  
Sin esto, no entendés Playwright ni APIs.

### Qué es un test (idea)

Un test automatizado es código que:
1. **Arrange** — prepara el estado
2. **Act** — ejecuta la acción
3. **Assert** — verifica el resultado esperado

Eso es exactamente lo que ya hacés a mano; ahora lo escribís.

---

## 0.3 Vocabulario técnico EN (clase bilingüe)

| ES | EN | Cómo decirlo |
|----|----|--------------|
| variable | variable | "I declared a constant for the base URL." |
| función | function / method | "I extracted this into a helper function." |
| tipo | type | "TypeScript caught a type error at compile time." |
| asíncrono | asynchronous / async | "This call is async, so we await the response." |
| afirmación | assertion | "The assertion checks that the status is 200." |
| fallar / pasar | fail / pass | "The test failed on the assertion, not on setup." |
| depurar | debug | "I debugged it by logging the response body." |
| valor esperado | expected value | "Expected 200, but got 500." |

**Frase de la semana (memorízala):**  
*"I understand the difference between a syntax error and a failed assertion."*

---

## 0.4 Setup del entorno

1. Instalá **Node.js LTS**: https://nodejs.org  
2. Verificá en terminal:
   ```bash
   node -v
   npm -v
   ```
3. Creá carpeta de práctica (dentro de este repo):
   ```bash
   mkdir practicos/00-fundamentos
   cd practicos/00-fundamentos
   npm init -y
   npm install -D typescript tsx @types/node
   npx tsc --init
   ```

---

## 0.5 Práctico (obligatorio)

Creá el archivo `practicos/00-fundamentos/ejercicios.ts` y resolvé **sin pegar solución de IA**. Podés preguntarme dudas de concepto.

### Ejercicio A — Variables y tipos

Declará:
- `baseUrl` (string, const)
- `retries` (number, let) empezando en 0
- `isSmoke` (boolean)

Incrementá `retries` hasta 3 con un `while` o `for`.

### Ejercicio B — Función pura

Escribí `normalizeEmail(email: string): string` que:
- quite espacios
- pase a minúsculas

Ejemplo: `"  QA@Test.COM "` → `"qa@test.com"`

### Ejercicio C — Clasificar status codes

Función `classifyStatus(code: number): "success" | "client_error" | "server_error" | "other"`  
- 200–299 → success  
- 400–499 → client_error  
- 500–599 → server_error  
- resto → other  

### Ejercicio D — Async

Función `getTodoTitle(id: number): Promise<string>` que llame a:  
`https://jsonplaceholder.typicode.com/todos/{id}`  
y retorne el `title`.

Corré con:
```bash
npx tsx ejercicios.ts
```

### Ejercicio E — Explain in English (escrito)

En `practicos/00-fundamentos/EXPLAIN.md` escribí 4–6 oraciones en inglés explicando:
1. What a function is
2. What `await` does
3. What an assertion means in testing (even if you haven't coded one yet)

---

## 0.6 Criterio de aprobación

- [ ] Node y npm funcionan en tu máquina
- [ ] Los 4 ejercicios de código corren sin error
- [ ] Podés explicar con tus palabras: `const` vs `let`, función, `async/await`
- [ ] `EXPLAIN.md` entregado (inglés imperfecto está OK; silencio no)

Cuando termines: **“Profe, revisá el Módulo 00”** y pegá tu código o decime la ruta.

---

## 0.7 Recursos de clase

- TypeScript Handbook (Basics + Everyday Types): https://www.typescriptlang.org/docs/handbook/2/basic-types.html
- JavaScript.info — Variables, Functions, Async: https://javascript.info
- MDN — Promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
