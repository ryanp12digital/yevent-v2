import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

const SUPER_ADMIN_EMAIL = 'ryansantiago@p12digital.com.br';

export async function POST(request: NextRequest) {
    try {
        const supabase = createServerSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
        }

        // Only super admin can create users
        if (user.email !== SUPER_ADMIN_EMAIL) {
            return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
        }

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string || 'user';

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Nome, email e senha são obrigatórios' }, { status: 400 });
        }

        // Create user via signUp (will need email confirmation unless disabled)
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (signUpError) {
            return NextResponse.json({ message: signUpError.message }, { status: 400 });
        }

        if (signUpData.user) {
            // Insert into public.users table
            const { error: insertError } = await supabase
                .from('users')
                .insert({
                    id: signUpData.user.id,
                    name,
                    email,
                    role
                });

            if (insertError) {
                return NextResponse.json({ message: 'Erro ao salvar dados do usuário' }, { status: 500 });
            }
        }

        return NextResponse.json({ message: 'Usuário criado com sucesso' }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Erro interno' }, { status: 500 });
    }
}
