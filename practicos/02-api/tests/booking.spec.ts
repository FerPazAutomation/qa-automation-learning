import { test, expect } from "@playwright/test";

test("Authentication, create a booking and get the booking details", async ({ request }) => {
    const auth = await request.post("/auth", {
        data: { username: "admin", password: "password123" },
    });
    const { token } = await auth.json();
    expect(token).toBeDefined();

    const payload = {
        firstname: "John",
        lastname: "Doe",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-01-02"
        }
    };

    const create = await request.post("/booking", {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        data: payload,
    });
    const created = await create.json();
    const bookingid = created.bookingid;
    expect(bookingid).toBeDefined();

    const get = await request.get(
        `/booking/${bookingid}`,
        { headers: { Accept: "application/json" } }
    );
    expect(get.status()).toBe(200);
    const getBody = await get.json();
    expect(getBody.firstname).toBe(payload.firstname);
    expect(getBody.lastname).toBe(payload.lastname);
    expect(getBody.totalprice).toBe(payload.totalprice);
    expect(getBody.depositpaid).toBe(true);
    expect(getBody.bookingdates.checkin).toBe(payload.bookingdates.checkin);
    expect(getBody.bookingdates.checkout).toBe(payload.bookingdates.checkout);

});

