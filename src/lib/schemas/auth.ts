import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido",
    }),
    password: z.string().min(1, {
        message: "A senha é obrigatória",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido",
    }),
    password: z.string().min(8, {
        message: "Mínimo de 8 caracteres",
    }).regex(/[A-Z]/, {
        message: "Deve conter ao menos uma letra maiúscula",
    }).regex(/[a-z]/, {
        message: "Deve conter ao menos uma letra minúscula",
    }).regex(/[0-9]/, {
        message: "Deve conter ao menos um número",
    }).regex(/[^A-Za-z0-9]/, {
        message: "Deve conter ao menos um símbolo",
    }),
    name: z.string().min(1, {
        message: "O nome é obrigatório",
    }),
});

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Mínimo de 8 caracteres",
    }),
});
