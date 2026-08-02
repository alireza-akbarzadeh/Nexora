import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name must be 64 characters or less"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or less"),
});

export const twoFactorCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(6, "Enter a 6-digit code")
    .max(10, "Code is too long"),
  trustDevice: z.boolean().optional(),
});

export const enableTwoFactorSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type TwoFactorCodeFormValues = z.infer<typeof twoFactorCodeSchema>;
export type EnableTwoFactorFormValues = z.infer<typeof enableTwoFactorSchema>;
