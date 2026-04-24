import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";
import {
  useInstructors,
  useInstructorById,
  useCreateInstructor,
  useUpdateInstructor,
  useDeleteInstructor,
} from "@/modules/instructors";
import { mockInstructor } from "../../mocks/instructor.fixtures";

const BASE = "http://localhost:8000/api";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
};

describe("useInstructors", () => {
  it("charge la liste des formateurs", async () => {
    const { result } = renderHook(() => useInstructors(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data?.data).toHaveLength(2);
  });

  it("est en état loading au départ", () => {
    const { result } = renderHook(() => useInstructors(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("passe en erreur si le serveur répond 500", async () => {
    server.use(
      http.get(`${BASE}/instructors`, () =>
        HttpResponse.json({ message: "Error" }, { status: 500 })
      )
    );
    const { result } = renderHook(() => useInstructors(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useInstructorById", () => {
  it("charge un formateur par ID", async () => {
    const { result } = renderHook(
      () => useInstructorById(mockInstructor.id),
      { wrapper: createWrapper() }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data?.id).toBe(mockInstructor.id);
  });

  it("n'exécute pas la requête si l'ID est vide", () => {
    const { result } = renderHook(() => useInstructorById(""), {
      wrapper: createWrapper(),
    });
    expect(result.current.fetchStatus).toBe("idle");
  });
});

describe("useCreateInstructor", () => {
  it("crée un formateur avec succès", async () => {
    const { result } = renderHook(() => useCreateInstructor(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({
      first_name: "Alice",
      last_name: "Durand",
      email: "alice@test.com",
      password: "password123",
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.success).toBe(true);
  });

  it("passe en erreur si le serveur répond 422", async () => {
    server.use(
      http.post(`${BASE}/instructors`, () =>
        HttpResponse.json(
          { success: false, message: "Validation error" },
          { status: 422 }
        )
      )
    );
    const { result } = renderHook(() => useCreateInstructor(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({
      first_name: "X",
      last_name: "Y",
      email: "x@y.com",
      password: "password123",
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useUpdateInstructor", () => {
  it("met à jour un formateur avec succès", async () => {
    const { result } = renderHook(() => useUpdateInstructor(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({
      id: mockInstructor.id,
      first_name: "Modifié",
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.success).toBe(true);
  });

  it("passe en erreur si le serveur répond 404", async () => {
    server.use(
      http.put(`${BASE}/instructors/${mockInstructor.id}`, () =>
        HttpResponse.json({ message: "Not found" }, { status: 404 })
      )
    );
    const { result } = renderHook(() => useUpdateInstructor(), {
      wrapper: createWrapper(),
    });
    result.current.mutate({ id: mockInstructor.id, first_name: "X" });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useDeleteInstructor", () => {
  it("supprime un formateur avec succès", async () => {
    const { result } = renderHook(() => useDeleteInstructor(), {
      wrapper: createWrapper(),
    });
    result.current.mutate(mockInstructor.id);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.success).toBe(true);
  });

  it("passe en erreur si le serveur répond 404", async () => {
    server.use(
      http.delete(`${BASE}/instructors/${mockInstructor.id}`, () =>
        HttpResponse.json({ message: "Not found" }, { status: 404 })
      )
    );
    const { result } = renderHook(() => useDeleteInstructor(), {
      wrapper: createWrapper(),
    });
    result.current.mutate(mockInstructor.id);
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
