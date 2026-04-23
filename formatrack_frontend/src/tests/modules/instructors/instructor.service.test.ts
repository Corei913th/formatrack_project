import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";
import { instructorService } from "@/modules/instructors";
import {
  mockInstructor,
  mockPaginatedInstructors,
} from "../../mocks/instructor.fixtures";
import { duplicateEmailHandler } from "../../mocks/handlers";

const BASE = "http://localhost:8000/api";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("InstructorService", () => {
  // -------------------------------------------------------------------------
  // list()
  // -------------------------------------------------------------------------
  describe("list()", () => {
    it("retourne la liste paginée des formateurs", async () => {
      const result = await instructorService.list();
      expect(result.success).toBe(true);
      expect(result.data?.data).toHaveLength(2);
      expect(result.data?.meta.total).toBe(2);
    });

    it("retourne les données du premier formateur correctement", async () => {
      const result = await instructorService.list();
      const first = result.data?.data[0];
      expect(first?.id).toBe(mockInstructor.id);
      expect(first?.user.email).toBe("jean.dupont@test.com");
      expect(first?.specialties).toBe("PHP, Laravel");
    });

    it("inclut les métadonnées de pagination", async () => {
      const result = await instructorService.list();
      expect(result.data?.meta).toMatchObject({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 2,
      });
    });

    it("retourne une liste vide si aucun formateur", async () => {
      server.use(
        http.get(`${BASE}/instructors`, () =>
          HttpResponse.json({
            ...mockPaginatedInstructors,
            data: [],
            meta: { ...mockPaginatedInstructors.meta, total: 0, from: null, to: null },
          })
        )
      );
      const result = await instructorService.list();
      expect(result.data?.data).toHaveLength(0);
      expect(result.data?.meta.total).toBe(0);
    });

    it("lève une erreur en cas d'échec serveur", async () => {
      server.use(
        http.get(`${BASE}/instructors`, () =>
          HttpResponse.json({ message: "Server Error" }, { status: 500 })
        )
      );
      await expect(instructorService.list()).rejects.toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // getById()
  // -------------------------------------------------------------------------
  describe("getById()", () => {
    it("retourne un formateur par son ID", async () => {
      const result = await instructorService.getById(mockInstructor.id);
      expect(result.success).toBe(true);
      expect(result.data?.id).toBe(mockInstructor.id);
      expect(result.data?.user.first_name).toBe("Jean");
    });

    it("retourne les spécialités et le taux horaire", async () => {
      const result = await instructorService.getById(mockInstructor.id);
      expect(result.data?.specialties).toBe("PHP, Laravel");
      expect(result.data?.hourly_rate).toBe("75.00");
    });

    it("lève une erreur pour un ID inexistant (404)", async () => {
      await expect(
        instructorService.getById("00000000-0000-0000-0000-000000000000")
      ).rejects.toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // create()
  // -------------------------------------------------------------------------
  describe("create()", () => {
    it("crée un formateur et retourne les données", async () => {
      const result = await instructorService.create({
        first_name: "Alice",
        last_name: "Durand",
        email: "alice@test.com",
        password: "password123",
        specialties: "Python",
      });
      expect(result.success).toBe(true);
      expect(result.data?.user.first_name).toBe("Alice");
      expect(result.data?.user.email).toBe("alice@test.com");
    });

    it("crée un formateur sans champs optionnels", async () => {
      const result = await instructorService.create({
        first_name: "Bob",
        last_name: "Test",
        email: "bob@test.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
      expect(result.data?.user.email).toBe("bob@test.com");
    });

    it("lève une erreur 422 pour email dupliqué", async () => {
      server.use(duplicateEmailHandler);
      await expect(
        instructorService.create({
          first_name: "Dup",
          last_name: "Email",
          email: "jean.dupont@test.com",
          password: "password123",
        })
      ).rejects.toBeDefined();
    });

    it("lève une erreur en cas d'échec serveur", async () => {
      server.use(
        http.post(`${BASE}/instructors`, () =>
          HttpResponse.json({ message: "Error" }, { status: 500 })
        )
      );
      await expect(
        instructorService.create({
          first_name: "X",
          last_name: "Y",
          email: "x@y.com",
          password: "password123",
        })
      ).rejects.toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // update()
  // -------------------------------------------------------------------------
  describe("update()", () => {
    it("met à jour un formateur et retourne les données", async () => {
      const result = await instructorService.update({
        id: mockInstructor.id,
        first_name: "NouveauPrénom",
        specialties: "Java, Spring",
      });
      expect(result.success).toBe(true);
      expect(result.data?.user.first_name).toBe("NouveauPrénom");
    });

    it("met à jour le taux horaire", async () => {
      server.use(
        http.put(`${BASE}/instructors/${mockInstructor.id}`, async ({ request }) => {
          const body = (await request.json()) as Record<string, unknown>;
          return HttpResponse.json({
            success: true,
            message: "OK",
            data: { ...mockInstructor, hourly_rate: String(body.hourly_rate) },
          });
        })
      );
      const result = await instructorService.update({
        id: mockInstructor.id,
        hourly_rate: 120.5,
      });
      expect(result.data?.hourly_rate).toBe("120.5");
    });

    it("lève une erreur pour un ID inexistant", async () => {
      server.use(
        http.put(`${BASE}/instructors/00000000-0000-0000-0000-000000000000`, () =>
          HttpResponse.json({ message: "Not found" }, { status: 404 })
        )
      );
      await expect(
        instructorService.update({
          id: "00000000-0000-0000-0000-000000000000",
          first_name: "Test",
        })
      ).rejects.toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // delete()
  // -------------------------------------------------------------------------
  describe("delete()", () => {
    it("supprime un formateur avec succès", async () => {
      const result = await instructorService.delete(mockInstructor.id);
      expect(result.success).toBe(true);
      expect(result.message).toBe("Formateur supprimé avec succès.");
    });

    it("lève une erreur pour un ID inexistant", async () => {
      server.use(
        http.delete(`${BASE}/instructors/00000000-0000-0000-0000-000000000000`, () =>
          HttpResponse.json({ message: "Not found" }, { status: 404 })
        )
      );
      await expect(
        instructorService.delete("00000000-0000-0000-0000-000000000000")
      ).rejects.toBeDefined();
    });

    it("lève une erreur en cas d'échec serveur", async () => {
      server.use(
        http.delete(`${BASE}/instructors/${mockInstructor.id}`, () =>
          HttpResponse.json({ message: "Error" }, { status: 500 })
        )
      );
      await expect(
        instructorService.delete(mockInstructor.id)
      ).rejects.toBeDefined();
    });
  });
});
