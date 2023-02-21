import supertest from "supertest";
const url = "localhost:3001";

const request = supertest(url);

describe("GET /", () => {
    test("Should return Hello", async () => {
        const response = await request.get('/');
        expect(response.text).toBe("Hello");
    })
    test("Should return status 200", async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })
});

describe("GET /api", () => {
    test("Should return text: Please enter valid API path", async () => {
        const response = await request.get('/api');
        expect(response.text).toBe('Please enter valid API path');
    })

    test("Should return status 404", async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(404);
    })
})