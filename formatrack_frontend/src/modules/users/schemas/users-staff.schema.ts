import { z } from "zod";
import { UserRole } from "@/types/enums";

// Regex pour téléphone camerounais
const PHONE_REGEX = /^(6[5-9]\d{7}|2[2-3]\d{7})$/;

// Schema de base aligné sur le Backend Filtertrack API
const BaseUserStaffSchema = z.object({
  first_name: z
    .string()
    .min(1, "Le prénom est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  last_name: z
    .string()
    .min(1, "Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .email("Email invalide")
    .min(1, "L'email est requis"),
  phone: z
    .string()
    .regex(PHONE_REGEX, "Numéro de téléphone invalide (ex: 655123456)")
    .optional()
    .or(z.literal("")),
  role: z.nativeEnum(UserRole, {
    message: "Rôle invalide",
  }),
  is_active: z.boolean().default(true),
});

export const CreateUserStaffSchema = BaseUserStaffSchema.extend({
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password_confirmation"],
});

export const UpdateUserStaffSchema = z.object({
  id: z.string().uuid("ID invalide"),
}).and(
  BaseUserStaffSchema.partial().extend({
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .optional(),
    password_confirmation: z.string().optional(),
  }).refine(
    (data) => {
      // Si password fourni, confirmation requise
      if (data.password) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["password_confirmation"],
    }
  )
);

export type CreateUserStaffDTO = z.infer<typeof CreateUserStaffSchema>;
export type UpdateUserStaffDTO = z.infer<typeof UpdateUserStaffSchema>;

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrateur",
  [UserRole.INSTRUCTOR]: "Formateur",
  [UserRole.STUDENT]: "Apprenant",
};
