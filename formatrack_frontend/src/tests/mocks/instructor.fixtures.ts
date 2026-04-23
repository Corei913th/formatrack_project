import { Instructor } from "@/modules/instructors";
import { PaginatedApiResponse } from "@/types/api.type";

export const mockInstructor: Instructor = {
  id: "11111111-1111-1111-1111-111111111111",
  specialties: "PHP, Laravel",
  hourly_rate: "75.00",
  user: {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    first_name: "Jean",
    last_name: "Dupont",
    email: "jean.dupont@test.com",
    phone: "+33612345678",
    is_active: true,
  },
  created_at: "2026-04-22T10:00:00.000Z",
  updated_at: "2026-04-22T10:00:00.000Z",
};

export const mockInstructor2: Instructor = {
  id: "22222222-2222-2222-2222-222222222222",
  specialties: "Management",
  hourly_rate: "90.00",
  user: {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    first_name: "Marie",
    last_name: "Martin",
    email: "marie.martin@test.com",
    phone: null,
    is_active: false,
  },
  created_at: "2026-04-22T11:00:00.000Z",
  updated_at: "2026-04-22T11:00:00.000Z",
};

export const mockPaginatedInstructors: PaginatedApiResponse<Instructor> = {
  success: true,
  message: "Liste des formateurs.",
  data: [mockInstructor, mockInstructor2],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 2,
    from: 1,
    to: 2,
  },
};
