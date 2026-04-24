import { http, HttpResponse } from "msw";
import {
  mockInstructor,
  mockInstructor2,
  mockPaginatedInstructors,
} from "./instructor.fixtures";

const BASE = "http://localhost:8000/api";

export const instructorHandlers = [
  // LIST
  http.get(`${BASE}/instructors`, () =>
    HttpResponse.json(mockPaginatedInstructors)
  ),

  // SHOW
  http.get(`${BASE}/instructors/${mockInstructor.id}`, () =>
    HttpResponse.json({ success: true, message: "OK", data: mockInstructor })
  ),

  // STORE
  http.post(`${BASE}/instructors`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const created = {
      ...mockInstructor,
      id: "33333333-3333-3333-3333-333333333333",
      user: {
        ...mockInstructor.user,
        first_name: body.first_name as string,
        last_name: body.last_name as string,
        email: body.email as string,
      },
      specialties: (body.specialties as string) ?? null,
    };
    return HttpResponse.json(
      { success: true, message: "Formateur créé avec succès.", data: created },
      { status: 201 }
    );
  }),

  // UPDATE
  http.put(`${BASE}/instructors/${mockInstructor.id}`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const updated = {
      ...mockInstructor,
      user: { ...mockInstructor.user, ...body },
      specialties: (body.specialties as string) ?? mockInstructor.specialties,
    };
    return HttpResponse.json({
      success: true,
      message: "Formateur mis à jour avec succès.",
      data: updated,
    });
  }),

  // DELETE
  http.delete(`${BASE}/instructors/${mockInstructor.id}`, () =>
    HttpResponse.json({
      success: true,
      message: "Formateur supprimé avec succès.",
      data: null,
    })
  ),

  // 404
  http.get(`${BASE}/instructors/00000000-0000-0000-0000-000000000000`, () =>
    HttpResponse.json(
      { success: false, message: "Ressource introuvable." },
      { status: 404 }
    )
  ),
];

export const handlers = [...instructorHandlers];

// Handler pour email dupliqué
export const duplicateEmailHandler = http.post(
  `${BASE}/instructors`,
  () =>
    HttpResponse.json(
      {
        success: false,
        message: "Erreur de validation.",
        errors: { email: ["Cette adresse email est déjà utilisée."] },
      },
      { status: 422 }
    )
);

// Handler pour formateur inactif
export const inactiveInstructorHandler = http.get(
  `${BASE}/instructors`,
  () =>
    HttpResponse.json({
      ...mockPaginatedInstructors,
      data: [mockInstructor2],
      meta: { ...mockPaginatedInstructors.meta, total: 1, to: 1 },
    })
);

// Unused export to satisfy unused import lint
export { mockInstructor2 };
