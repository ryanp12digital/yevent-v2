import { getSpaces, deleteSpace } from '@/actions/spaces';
import { Space } from '@/data/spaces';
import Link from 'next/link';

export default async function DashboardPage() {
    const spaces = await getSpaces() as Space[];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                    <div className="space-x-4">
                        {/* Logout button form */}
                        <form action={async () => {
                            'use server';
                            const { logout } = await import('@/actions/auth');
                            await logout();
                        }} className="inline-block">
                            <button className="text-gray-600 hover:text-gray-900 font-medium">Sair</button>
                        </form>
                        <Link
                            href="/dashboard/new"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                        >
                            + Nova Sala
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
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
                                            Editar
                                        </Link>
                                        <form action={deleteSpace.bind(null, space.id)} className="inline-block">
                                            <button type="submit" className="text-red-600 hover:text-red-900">
                                                Excluir
                                            </button>
                                        </form>
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
