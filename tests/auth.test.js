const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Auth API", () => {
    it(
        "signup works",
        async () => {
            const res = await request(app)
                .post("/api/auth/signup")
                .send({
                    fullName: "Test User",
                    email: "test1@test.com",
                    password: "Password@123"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.token).toBeDefined();
        },
        10000 // ⬅️ increase timeout
    );

    it(
        "login works",
        async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "test1@test.com",
                    password: "Password@123"
                });

            expect(res.body.token).toBeDefined();
        },
        10000
    );
});
