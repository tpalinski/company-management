import supertest from "supertest";
const url = "localhost:3001";

const request = supertest(url);


// Main routes tests

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

// Employees tests

describe("GET /api/employees", () => {
    test("Should return employees", async () => {
        const response = await request.get('/api/employees');
        expect(response.body).toBeTruthy();
    })
    test("Should return status 200", async () => {
        const response = await request.get('/api/employees');
        expect(response.status).toBe(200);
    })
})

describe("GET /api/employees/:pesel", () => {
    test("Should return valid employee", async () => {
        const response = await request.get('/api/employees/11111111111');
        expect(response.body).toHaveProperty("pesel")
    })
    test("Should return status 400 with invalid employee", async () => {
        const response = await request.get('/api/employees/10000000000');
        expect(response.status).toBe(400);
    })
})

describe("GET /api/employees/:pesel/projects", () => {
    test("Should return valid list of projects", async () => {
        const response = await request.get('/api/employees/11111111112/projects');
        expect(response.body).toBeTruthy();
    })
    test("Should return status 400 with invalid employee", async () => {
        const response = await request.get('/api/employees/10000000000/projects');
        expect(response.status).toBe(400);
    })
})