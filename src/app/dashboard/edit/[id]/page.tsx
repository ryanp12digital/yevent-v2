import SpaceForm from '@/components/admin/SpaceForm';
import { updateSpace, getSpace } from '@/actions/spaces';
import { Space } from '@/data/spaces';

export default async function EditSpacePage({ params }: { params: { id: string } }) {
    const space = await getSpace(params.id) as Space;
    const updateSpaceWithId = updateSpace.bind(null, params.id);

    if (!space) {
        return <div>Sala não encontrada</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Sala</h1>
                <SpaceForm initialData={space} action={updateSpaceWithId} />
            </div>
        </div>
    );
}
