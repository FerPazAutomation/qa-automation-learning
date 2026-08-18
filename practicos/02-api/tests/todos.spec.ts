import { test, expect } from "@playwright/test";

// Exercise 1
  test("GET /todos/1 returns a valid todo", async ({ request }) => {
    const response = await request.get("/todos/1");
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(typeof responseJson.id).toBe("number");
    expect(typeof responseJson.title).toBe("string");
    expect(responseJson.title.length).toBeGreaterThan(0);
    expect(responseJson.completed).toBe(false);
    expect(responseJson.userId).toBe(1);
  });

// Exercise 2
  test("GET /todos/999999 documents real behavior", async ({ request }) => {
    const response = await request.get("/todos/999999");
    expect(response.status()).toBe(404);
  });

// Exercise 3
  test("POST /posts creates a post with my payload", async ({ request }) => {
    const payload = {
      title: "QA-Automation Route",
      body: "I am learning API testing",
      userId: 1,
    };
    const response = await request.post("/posts", { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
    expect(body.id).toBeDefined();   
  });

// Exercise 4
test("POST then GET documents that the resource is not persisted", async ({ request }) => {
  const payload = {
    title: "QA-Automation Route, exercise 4",
    body: "I am learning API testing",
    userId: 11,
  };

  const create = await request.post("/posts", { data: payload });
  expect(create.status()).toBe(201);

  const created = await create.json();
  expect(created.id).toBeDefined();
  expect(created.title).toBe(payload.title);

  const getCreated = await request.get(`/posts/${created.id}`);
  // JSONPlaceholder is fake: POST returns an id, GET that id is 404
  expect(getCreated.status()).toBe(404);
});
    