import SpaceForm from '@/components/admin/SpaceForm';
import { createSpace } from '@/actions/spaces';
import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

import { isSuperAdmin } from '@/actions/users';

export default async function NewSpacePage() {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/dashboard");
    }

    // Check permissions
    const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    const superAdmin = await isSuperAdmin();
    // Admin is either role='admin' or super admin email
    const isAdmin = userData?.role === 'admin' || superAdmin;

    if (!isAdmin) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Nova Sala</h1>
                <SpaceForm action={createSpace} />
            </div>
        </div>
    );
}
