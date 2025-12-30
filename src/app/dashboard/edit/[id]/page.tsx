import SpaceForm from '@/components/admin/SpaceForm';
import { updateSpace, getSpace } from '@/actions/spaces';
import { Space } from '@/data/spaces';
import { createServerSupabaseClient } from '@/lib/supabase';
import { isSuperAdmin } from '@/actions/users';

export default async function EditSpacePage({ params }: { params: { id: string } }) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check admin role from users table
    const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user?.id)
        .single();
    
    const superAdmin = await isSuperAdmin();
    // Admin is either role='admin' or super admin email
    const isAdmin = userData?.role === 'admin' || superAdmin;
    
    const space = await getSpace(params.id) as any as Space;
    const updateSpaceWithId = updateSpace.bind(null, params.id);

    if (!space) {
        return <div>Sala não encontrada</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    {isAdmin ? 'Editar Sala' : 'Visualizar Sala'}
                </h1>
                <SpaceForm initialData={space} action={updateSpaceWithId} readOnly={!isAdmin} />
            </div>
        </div>
    );
}
