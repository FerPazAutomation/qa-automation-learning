import { test, expect } from "@playwright/test";

// Exercise 1
  test("GET Successful response and check some fields", async ({ request }) => {
    const response = await request.get("/todos/1");
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    expect(typeof responseJson.id).toBe("number");
    expect(typeof responseJson.title).toBe("string");
    expect(responseJson.title.length).toBeGreaterThan(0);
  });


// Exercise 2
  test("Check POST successful response and check some fields", async ({ request }) => {
    const payload = {
      title: "Module 7 Portfolio",
      body: "I am creating a portfolio using Playwright",
      userId: 121,
    };
    const response = await request.post("/posts", { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
    expect(body.id).toBeDefined();   
  });

// Exercise 3
test("POST then GET documents that the resource is not persisted", async ({ request }) => {
  const payload = {
    title: "Module 7 Portfolio, exercise 3",
    body: "I am creating a portfolio using Playwright",
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
    