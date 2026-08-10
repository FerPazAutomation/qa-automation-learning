// EJERCICIO A

const baseUrl = "https://the-internet.herokuapp.com";
let retries = 0; // numero de intentos
while (retries < 3) {
  retries++; // incrementa el numero de intentos
  console.log(`Retrying... ${retries}`); // imprime el numero de intentos
}
const isSmoke = true;

// EJERCICIO B

const normalizeEmail = (email: string): string => {
  // primero limpia espacios, despues pasa a minusculas
  return email.trim().toLowerCase();
};

console.log(normalizeEmail("  test@MARK.com "));

// EJERCICIO C

const classifyStatus = (
  code: number
): "success" | "client_error" | "server_error" | "other" => {
  if (code >= 200 && code < 300) {
    return "success";
  } else if (code >= 400 && code < 500) {
    return "client_error";
  } else if (code >= 500 && code < 600) {
    return "server_error";
  } else {
    return "other";
  }
};

console.log(classifyStatus(200)); // success
console.log(classifyStatus(404)); // client_error
console.log(classifyStatus(500)); // server_error
console.log(classifyStatus(301)); // other

// EJERCICIO D

async function getTodoTitle(id: number): Promise<string> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  const data = await response.json();
  return data.title;
}

async function main() {
  const title = await getTodoTitle(1);
  console.log(title);
}

main();
