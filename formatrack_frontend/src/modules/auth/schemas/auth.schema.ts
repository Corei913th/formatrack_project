import { z } from "zod";




export const LoginSchema = z.object({
  email: z
    .string({ error: "L'email est requis." })
    .email("Adresse email invalide")
    .min(1, { message: "L'email est requis." }),
  password: z
    .string({ error: "Le mot de passe est requis" })
    .min(1, { message: "Le mot de passe est requis" }),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z
    .string({ error: "Refresh token requis" })
    .min(1, { message: "Refresh token requis" }),
});


export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string({ error: "Mot de passe actuel requis" })
    .min(1, { message: "Mot de passe actuel requis" }),
  newPassword: z
    .string({ error: "Nouveau mot de passe requis" })
    .min(8, { message: "Le nouveau mot de passe doit contenir au moins 8 caractères" }),
});


export const VerifyEmailSchema = z.object({
  token: z
    .string({ error: "Token de vérification requis" })
    .min(1, { message: "Token de vérification requis" }),
});


export type LoginDTO = z.infer<typeof LoginSchema>;
export type RefreshTokenDTO = z.infer<typeof RefreshTokenSchema>;
export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
export type VerifyEmailDTO = z.infer<typeof VerifyEmailSchema>;
