'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabase';

const SUPER_ADMIN_EMAIL = 'ryansantiago@p12digital.com.br';

export async function isSuperAdmin(): Promise<boolean> {
    try {
        const supabase = createServerSupabaseClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return false;
        }

        return user.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    } catch (err) {
        console.error('isSuperAdmin exception:', err);
        return false;
    }
}

export async function getUsers() {
    try {
        // Authenticate user
        const supabase = createServerSupabaseClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.log('getUsers - no authenticated user');
            return [];
        }

        // Authorization check
        if (user.email?.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
            console.log('getUsers - access denied for:', user.email);
            return [];
        }

        // Use Admin Client for DB operations to bypass RLS
        const adminSupabase = createAdminSupabaseClient();

        const { data, error } = await adminSupabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('getUsers db error:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('getUsers exception:', err);
        return [];
    }
}

export async function createUser(formData: FormData) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autenticado");
    }

    if (user.email?.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
        throw new Error("Acesso negado. Apenas o super administrador pode criar usuários.");
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string || 'user';

    if (!name || !email || !password) {
        throw new Error("Nome, email e senha são obrigatórios.");
    }

    const adminSupabase = createAdminSupabaseClient();

    // Create user in Supabase Auth using Admin Client
    const { data: signUpData, error: signUpError } = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name }
    });

    if (signUpError) {
        console.error('Error creating user in auth:', signUpError);
        throw new Error(`Erro ao criar usuário: ${signUpError.message}`);
    }

    if (signUpData.user) {
        // Insert into public.users table using Admin Client
        const { error: insertError } = await adminSupabase
            .from('users')
            .insert({
                id: signUpData.user.id,
                name,
                email,
                role
            });

        if (insertError) {
            console.error('Error inserting user:', insertError);
            // Optional: delete auth user if db insert fails to keep consistency
            throw new Error("Erro ao salvar dados do usuário.");
        }
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function updateUserRole(userId: string, newRole: string) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autenticado");
    }

    if (user.email?.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
        throw new Error("Acesso negado.");
    }

    if (userId === user.id) {
        throw new Error("Você não pode alterar sua própria permissão.");
    }

    const adminSupabase = createAdminSupabaseClient();

    const { error } = await adminSupabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

    if (error) {
        console.error('Error updating user role:', error);
        throw new Error("Erro ao atualizar permissão do usuário");
    }

    revalidatePath('/dashboard');
}

export async function deleteUser(userId: string) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autenticado");
    }

    if (user.email?.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
        throw new Error("Acesso negado.");
    }

    if (userId === user.id) {
        throw new Error("Você não pode excluir sua própria conta.");
    }

    const adminSupabase = createAdminSupabaseClient();

    // Delete from public.users using Admin Client (Auth deletion usually handled separately or via cascade/trigger, but standard practice is delete auth first)
    // However, here let's delete from public.users first or Auth.admin.deleteUser

    // Better: Delete from Auth, and let trigger handle public.users if exists, or delete manually.
    // We don't have triggers confirmed. So let's delete both manually.

    // 1. Delete from Auth
    const { error: authDeleteError } = await adminSupabase.auth.admin.deleteUser(userId);
    if (authDeleteError) {
        console.error('Error deleting auth user:', authDeleteError);
        throw new Error("Erro ao excluir usuário da autenticação");
    }

    // 2. Delete from public.users (might happen automatically if cascade is set, but safe to try)
    const { error } = await adminSupabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (error) {
        console.error('Error deleting user from db:', error);
        // Don't throw if auth deletion worked, just log it.
    }

    revalidatePath('/dashboard');
}
