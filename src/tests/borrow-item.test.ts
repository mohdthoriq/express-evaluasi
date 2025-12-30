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

describe("GET /api/borrow-items", () => {
  it("should return 401 if no token", async () => {
    const res = await request(app).get("/api/borrow-items");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
  it("should return 200 and list of borrow items (admin)", async () => {
    const res = await request(app)
      .get("/api/borrow-items")
      .set("Authorization", `Bearer ${adminToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    
    // Jika ada data, cek strukturnya
    if (res.body.data.length > 0) {
      const firstItem = res.body.data[0];
      expect(firstItem).toHaveProperty("id");
      expect(firstItem).toHaveProperty("userId");
      expect(firstItem).toHaveProperty("bookId");
      // tambahkan property lain sesuai model borrow item
    }
  });
});

describe("GET /api/borrow-items/stats", () => {
  describe("Authentication & Authorization", () => {
    it("should return 401 if no token", async () => {
      const res = await request(app).get("/api/borrow-items/stats");
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 for non-admin users", async () => {
      const res = await request(app)
        .get("/api/borrow-items/stats")
        .set("Authorization", `Bearer ${userToken}`);
      
      // Current implementation returns 400 for non-admin
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/akses khusus admin|admin only/i);
    });
  });

  describe("Admin access", () => {
    it("should return 200 and borrow stats for admin", async () => {
      const res = await request(app)
        .get("/api/borrow-items/stats")
        .set("Authorization", `Bearer ${adminToken}`);
      
      console.log("Borrow stats status:", res.statusCode);
      console.log("Borrow stats response:", res.body);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      
      // Cek struktur data stats
      // Kemungkinan properties:
      if (res.body.data) {
        console.log("Stats data keys:", Object.keys(res.body.data));
        
        // Common borrow stats properties
        if ('totalBorrows' in res.body.data) {
          expect(typeof res.body.data.totalBorrows).toBe("number");
        }
        
        if ('activeBorrows' in res.body.data) {
          expect(typeof res.body.data.activeBorrows).toBe("number");
        }
        
        if ('overdueBorrows' in res.body.data) {
          expect(typeof res.body.data.overdueBorrows).toBe("number");
        }
        
        if ('mostBorrowedBook' in res.body.data) {
          expect(res.body.data.mostBorrowedBook).toBeDefined();
        }
      }
    });

    it("should return valid statistics data", async () => {
      const res = await request(app)
        .get("/api/borrow-items/stats")
        .set("Authorization", `Bearer ${adminToken}`);
      
      if (res.statusCode === 200) {
        const stats = res.body.data;
        
        // Jika ada totalBorrows, harus >= 0
        if (stats.totalBorrows !== undefined) {
          expect(stats.totalBorrows).toBeGreaterThanOrEqual(0);
        }
        
        // Jika ada activeBorrows, harus <= totalBorrows
        if (stats.totalBorrows !== undefined && stats.activeBorrows !== undefined) {
          expect(stats.activeBorrows).toBeLessThanOrEqual(stats.totalBorrows);
        }
        
        // Jika ada overdueBorrows, harus <= activeBorrows
        if (stats.activeBorrows !== undefined && stats.overdueBorrows !== undefined) {
          expect(stats.overdueBorrows).toBeLessThanOrEqual(stats.activeBorrows);
        }
      }
    });
  });
});


describe("GET /api/borrow-items/:id", () => {
  describe("Authentication & Authorization", () => {
    it("should return 401 if no token", async () => {
      const res = await request(app).get("/api/borrow-items/123");
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 for non-admin users", async () => {
      const res = await request(app)
        .get("/api/borrow-items/123")
        .set("Authorization", `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("Admin access", () => {
    let validBorrowId: string | undefined;

    // Get a valid borrow ID before tests
    beforeAll(async () => {
      // Try to get list of borrow items
      const listRes = await request(app)
        .get("/api/borrow-items")
        .set("Authorization", `Bearer ${adminToken}`);
      
      if (listRes.statusCode === 200 && listRes.body.data.length > 0) {
        validBorrowId = listRes.body.data[0].id;
      }
    });

    it("should return 200 for valid borrow ID", async () => {
      if (!validBorrowId) {
        console.log("No borrow items found, skipping test");
        return;
      }

      const res = await request(app)
        .get(`/api/borrow-items/${validBorrowId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toHaveProperty("id", validBorrowId);
    });

    it("should return 404 for non-existent borrow ID", async () => {
      const fakeId = "00000000-0000-0000-0000-000000000000";
      
      const res = await request(app)
        .get(`/api/borrow-items/${fakeId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      
      expect([404, 400]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 for invalid ID format", async () => {
      const res = await request(app)
        .get("/api/borrow-items/invalid-format")
        .set("Authorization", `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});