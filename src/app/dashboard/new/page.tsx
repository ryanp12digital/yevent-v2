import SpaceForm from '@/components/admin/SpaceForm';
import { createSpace } from '@/actions/spaces';

export default function NewSpacePage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Nova Sala</h1>
                <SpaceForm action={createSpace} />
            </div>
        </div>
    );
}
