import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import config from "../utils/env";

const adminToken = jwt.sign(
    { id: 1, role: "ADMIN" },
    config.JWT_SECRET || "secret_kunci_rahasia",
    { expiresIn: "1h" }
);

const userToken = jwt.sign(
    { id: 2, role: "USER" },
    config.JWT_SECRET || "secret_kunci_rahasia",
    { expiresIn: "1h" }
);

describe("GET /api/categories", () => {
    it("should return 200 and list of categories (admin)", async () => {
        const res = await request(app)
            .get("/api/categories")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);

        // Jika ada data, cek properti dasar
        if (res.body.data.length > 0) {
            const category = res.body.data[0];
            expect(category).toHaveProperty("id");
            expect(category).toHaveProperty("name");
        }
    });

    it("should return 200 and list of categories (user)", async () => {
        const res = await request(app)
            .get("/api/categories")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

describe("GET /api/categories/:id", () => {
    let validCategoryId: string | undefined;

    // Ambil ID kategori yang valid sebelum test
    beforeAll(async () => {
        const categoriesRes = await request(app)
            .get("/api/categories")
            .set("Authorization", `Bearer ${adminToken}`);

        if (categoriesRes.body.data && categoriesRes.body.data.length > 0) {
            validCategoryId = categoriesRes.body.data[0].id;
        }
    });

    it("should return 200 and category data if ID exists (admin)", async () => {
        if (!validCategoryId) {
            console.log("Skip test: No categories available");
            return;
        }

        const res = await request(app)
            .get(`/api/categories/${validCategoryId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("id", validCategoryId);
        expect(res.body.data).toHaveProperty("name");
    });

    it("should return 200 and category data if ID exists (user)", async () => {
        if (!validCategoryId) return;

        const res = await request(app)
            .get(`/api/categories/${validCategoryId}`)
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.id).toBe(validCategoryId);
    });

    it("should return 400 for invalid ID format", async () => {
        const res = await request(app)
            .get("/api/categories/not-a-number")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});

describe("GET /api/categories/stats", () => {
    //   it("should return 400 if no token", async () => {
    //     const res = await request(app).get("/api/categories/stats");
    //     expect(res.statusCode).toBe(400);
    //     expect(res.body.success).toBe(false);
    //   });

    it("should return 200 and category stats (admin)", async () => {
        const res = await request(app)
            .get("/api/categories/stats")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
    });

    it("should return 200 and category stats (user)", async () => {
        const res = await request(app)
            .get("/api/categories/stats")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
    });
});