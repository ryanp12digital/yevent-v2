'use server';

import * as z from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from "@/lib/schemas/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Simple in-memory rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" };
    }

    const { email, password } = validatedFields.data;

    // Basic Rate Limiting
    const attempt = loginAttempts.get(email);
    if (attempt && attempt.count >= MAX_ATTEMPTS && Date.now() - attempt.lastAttempt < LOCKOUT_TIME) {
        return { error: "Muitas tentativas. Tente novamente em 15 minutos." };
    }

    const supabase = createServerSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // Update rate limiting count
        const currentCount = (attempt?.count || 0) + 1;
        loginAttempts.set(email, { count: currentCount, lastAttempt: Date.now() });

        if (error.message.includes("Invalid login credentials")) {
            return { error: "Credenciais inválidas!" };
        }
        return { error: error.message };
    }

    // Reset attempts on success
    loginAttempts.delete(email);

    revalidatePath("/", "layout");
    return { success: "Login bem-sucedido!" };
}

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" };
    }

    const { email, password, name } = validatedFields.data;

    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: 'user',
            },
        },
    });

    if (error) {
        if (error.message.includes("User already registered")) {
            return { error: "E-mail já está em uso!" };
        }
        return { error: error.message };
    }

    return { success: "Cadastro realizado com sucesso! Verifique seu e-mail se necessário." };
}

export async function logout() {
    const supabase = createServerSupabaseClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/login");
}

export async function resetPassword(values: z.infer<typeof ResetPasswordSchema>) {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "E-mail inválido!" };
    }

    const { email } = validatedFields.data;
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?next=/dashboard/reset-password`,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: "Link de recuperação enviado para seu e-mail!" };
}
