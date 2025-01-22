import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().min(1, "required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export type RegisterUserRequest = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    email: z.string().min(1, "required").email("Invalid email address"),
    password: z.string().min(1, "required"),
  })
  .refine((data) => data.email || data.password, {
    message: "Email or password is required",
    path: ["email"],
  });

export type LoginUserRequest = z.infer<typeof loginUserSchema>;

export const refreshTokenScheme = z.object({
  refreshToken: z.string().min(1, "Required"),
});

export type RefreshTokenScheme = z.infer<typeof refreshTokenScheme>;
