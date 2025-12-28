import { getSpaces, deleteSpace } from '@/actions/spaces';
import { getUsers, updateUserRole, isSuperAdmin } from '@/actions/users';
import { Space } from '@/data/spaces';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase';
import UserRoleSelector from '@/components/dashboard/UserRoleSelector';

interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    role: string | null;
    created_at: string | null;
}

export default async function DashboardPage() {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check if user is admin from public.users table
    const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user?.id)
        .single();

    const superAdmin = await isSuperAdmin();
    // Admin is either role='admin' or the hardcoded super admin email
    const isAdmin = userData?.role === 'admin' || superAdmin;
    const spaces = await getSpaces() as any as Space[];
    const users = superAdmin ? await getUsers() as UserData[] : [];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                    <div className="flex items-center gap-4">
                        {/* Logout button form */}
                        <form action={async () => {
                            'use server';
                            const { logout } = await import('@/actions/auth');
                            await logout();
                        }} className="inline-block">
                            <button className="text-gray-600 hover:text-gray-900 font-medium">Sair</button>
                        </form>
                    </div>
                </div>

                {/* Users Section - Only visible to Super Admin */}
                {superAdmin && (
                    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Gerenciamento de Usuários
                                </h2>
                                <p className="text-blue-100 text-sm mt-1">Controle as permissões de acesso dos usuários</p>
                            </div>
                            <Link
                                href="/dashboard/usuarios/new"
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Novo Usuário
                            </Link>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissão</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${u.role === 'admin' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                    {u.role === 'admin' ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="font-semibold text-gray-900">{u.name || 'Sem nome'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {u.email || 'Sem email'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${u.role === 'admin'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {u.role === 'admin' ? 'Administrador' : 'Usuário'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {u.email !== 'ryansantiago@p12digital.com.br' ? (
                                                <UserRoleSelector userId={u.id} currentRole={u.role || 'user'} />
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Super Admin</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                Nenhum usuário cadastrado.
                            </div>
                        )}
                    </div>
                )}

                {/* Spaces Section */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Salas Cadastradas
                        </h2>
                        {isAdmin && (
                            <Link
                                href="/dashboard/new"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Nova Sala
                            </Link>
                        )}
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {spaces.map((space) => (
                                <tr key={space.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {space.image && (
                                            <img
                                                src={typeof space.image === 'string' ? space.image : (space.image as any).src}
                                                alt={space.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{space.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{space.city}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{space.capacity} pessoas</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/dashboard/edit/${space.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            {isAdmin ? 'Editar' : 'Visualizar'}
                                        </Link>
                                        {isAdmin && (
                                            <form action={deleteSpace.bind(null, space.id)} className="inline-block">
                                                <button type="submit" className="text-red-600 hover:text-red-900">
                                                    Excluir
                                                </button>
                                            </form>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {spaces.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            Nenhuma sala cadastrada.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
