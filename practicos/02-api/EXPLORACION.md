1. PRACTICA A
GET https://jsonplaceholder.typicode.com/todos/1 => 200 SUCCESS
HEADERS =>
Content-Type:application/json

{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}

POST https://jsonplaceholder.typicode.com/posts => 201 CREATED
HEADERS = >
Accept:application/json
Content-Type:application/json

{
    "title": "QA-Automation Route",
    "body": "I am learning postman with IA",
    "userId": "111", // permitio mandar un string donde normalmente se acepta
    "id": 101
}

