import { z } from "zod";

export const CreateInstructorSchema = z.object({
  first_name: z
    .string()
    .min(1, "Le prénom est requis")
    .max(255, "Le prénom ne peut pas dépasser 255 caractères"),
  last_name: z
    .string()
    .min(1, "Le nom est requis")
    .max(255, "Le nom ne peut pas dépasser 255 caractères"),
  email: z.string().min(1, "L'email est requis").email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  phone: z.string().max(20).optional().or(z.literal("")),
  specialties: z.string().optional().or(z.literal("")),
  hourly_rate: z
    .number({ invalid_type_error: "Le taux horaire doit être un nombre" })
    .min(0, "Le taux horaire ne peut pas être négatif")
    .optional()
    .nullable(),
});

export const UpdateInstructorSchema = z.object({
  first_name: z.string().min(1).max(255).optional(),
  last_name: z.string().min(1).max(255).optional(),
  email: z.string().email("Email invalide").optional(),
  phone: z.string().max(20).optional().nullable(),
  is_active: z.boolean().optional(),
  specialties: z.string().optional().nullable(),
  hourly_rate: z
    .number({ invalid_type_error: "Le taux horaire doit être un nombre" })
    .min(0, "Le taux horaire ne peut pas être négatif")
    .optional()
    .nullable(),
});

export type CreateInstructorDTO = z.infer<typeof CreateInstructorSchema>;
export type UpdateInstructorDTO = z.infer<typeof UpdateInstructorSchema> & {
  id: string;
};
