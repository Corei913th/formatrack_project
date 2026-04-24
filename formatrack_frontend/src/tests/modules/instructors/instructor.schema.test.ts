import { describe, it, expect } from "vitest";
import {
  CreateInstructorSchema,
  UpdateInstructorSchema,
} from "@/modules/instructors";

describe("CreateInstructorSchema", () => {
  const valid = {
    first_name: "Alice",
    last_name: "Durand",
    email: "alice@test.com",
    password: "password123",
    phone: "+33612345678",
    specialties: "PHP, Laravel",
    hourly_rate: 75,
  };

  it("valide un payload complet correct", () => {
    expect(CreateInstructorSchema.safeParse(valid).success).toBe(true);
  });

  it("valide sans les champs optionnels", () => {
    const { phone, specialties, hourly_rate, ...minimal } = valid;
    expect(CreateInstructorSchema.safeParse(minimal).success).toBe(true);
  });

  it("rejette si first_name manquant", () => {
    const { first_name, ...rest } = valid;
    const result = CreateInstructorSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.first_name).toBeDefined();
  });

  it("rejette si last_name manquant", () => {
    const { last_name, ...rest } = valid;
    const result = CreateInstructorSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.last_name).toBeDefined();
  });

  it("rejette si email manquant", () => {
    const { email, ...rest } = valid;
    const result = CreateInstructorSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
  });

  it("rejette un email invalide", () => {
    const result = CreateInstructorSchema.safeParse({
      ...valid,
      email: "pas-un-email",
    });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
  });

  it("rejette si password manquant", () => {
    const { password, ...rest } = valid;
    const result = CreateInstructorSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
  });

  it("rejette un password trop court (< 8 chars)", () => {
    const result = CreateInstructorSchema.safeParse({
      ...valid,
      password: "1234567",
    });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
  });

  it("rejette un hourly_rate négatif", () => {
    const result = CreateInstructorSchema.safeParse({
      ...valid,
      hourly_rate: -10,
    });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.hourly_rate).toBeDefined();
  });

  it("accepte hourly_rate = 0", () => {
    expect(
      CreateInstructorSchema.safeParse({ ...valid, hourly_rate: 0 }).success
    ).toBe(true);
  });

  it("accepte hourly_rate null", () => {
    expect(
      CreateInstructorSchema.safeParse({ ...valid, hourly_rate: null }).success
    ).toBe(true);
  });

  it("accepte phone vide (string vide)", () => {
    expect(
      CreateInstructorSchema.safeParse({ ...valid, phone: "" }).success
    ).toBe(true);
  });
});

describe("UpdateInstructorSchema", () => {
  it("valide un payload partiel (tous les champs optionnels)", () => {
    expect(
      UpdateInstructorSchema.safeParse({ first_name: "Nouveau" }).success
    ).toBe(true);
  });

  it("valide un payload vide", () => {
    expect(UpdateInstructorSchema.safeParse({}).success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = UpdateInstructorSchema.safeParse({ email: "pas-un-email" });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
  });

  it("rejette un hourly_rate négatif", () => {
    const result = UpdateInstructorSchema.safeParse({ hourly_rate: -5 });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.flatten().fieldErrors.hourly_rate).toBeDefined();
  });

  it("accepte is_active false", () => {
    expect(
      UpdateInstructorSchema.safeParse({ is_active: false }).success
    ).toBe(true);
  });

  it("accepte specialties null", () => {
    expect(
      UpdateInstructorSchema.safeParse({ specialties: null }).success
    ).toBe(true);
  });
});
