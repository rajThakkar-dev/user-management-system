const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
    it("signup works", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                fullName: "Test User",
                email: "test@test.com",
                password: "Password@123"
            });
        expect(res.statusCode).toBe(201);
    });

    it("login works", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@test.com",
                password: "Password@123"
            });
        expect(res.body.token).toBeDefined();
    });
});
