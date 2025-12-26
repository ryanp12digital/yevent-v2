'use client';

import { Space } from '@/data/spaces';
import { useState, useTransition } from 'react';
import { generateSEODescription } from '@/actions/ai';

const AVAILABLE_TAGS = [
    'Auditório', 'Corporativo', 'Fortaleza', 'Reunião', 'Privativo',
    'Palestras', 'Workshops', 'Sala de Aula', 'Treinamentos', 'Eventos',
    'Flexível', 'Salvador', 'Recife', 'Grande Porte'
];

const AVAILABLE_AMENITIES = [
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'projector', label: 'Projetor' },
    { id: 'sound', label: 'Som' },
    { id: 'coffee', label: 'Café' },
    { id: 'water', label: 'Água' },
    { id: 'tv', label: 'TV' }
];

interface SpaceFormProps {
    initialData?: Space;
    action: (formData: FormData) => Promise<void>;
}

export default function SpaceForm({ initialData, action }: SpaceFormProps) {
    // Get initial images as array
    const getInitialImages = (): string[] => {
        if (!initialData?.image) return [];
        if (Array.isArray(initialData.image)) return initialData.image;
        if (typeof initialData.image === 'string') return [initialData.image];
        return [];
    };

    const [imagePreviews, setImagePreviews] = useState<string[]>(getInitialImages());
    const [description, setDescription] = useState((initialData as any)?.description || '');
    const [isGeneratingAI, startGeneratingAI] = useTransition();
    const [aiError, setAiError] = useState<string | null>(null);

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleGenerateAI = () => {
        const formElement = document.querySelector('form') as HTMLFormElement;
        if (!formElement) return;

        const formData = new FormData(formElement);
        const name = formData.get('name') as string;
        const city = formData.get('city') as string;
        const capacity = parseInt(formData.get('capacity') as string) || 0;
        const amenities = formData.getAll('amenities') as string[];

        if (!name || !city || !capacity) {
            setAiError('Preencha nome, cidade e capacidade primeiro');
            return;
        }

        setAiError(null);
        startGeneratingAI(async () => {
            try {
                const generated = await generateSEODescription(name, city, capacity, amenities);
                setDescription(generated);
            } catch (error) {
                setAiError('Erro ao gerar descrição. Tente novamente.');
                console.error(error);
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Add existing images to formData
        formData.set('existingImages', JSON.stringify(imagePreviews.filter(img => img.startsWith('http'))));

        await action(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome da Sala</label>
                    <input
                        name="name"
                        defaultValue={initialData?.name}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                    <select
                        name="city"
                        defaultValue={initialData?.city}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    >
                        <option value="">Selecione...</option>
                        <option value="Fortaleza">Fortaleza</option>
                        <option value="Salvador">Salvador</option>
                        <option value="Recife">Recife</option>
                    </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input
                        name="address"
                        defaultValue={initialData?.address}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>

                {/* Description with AI */}
                <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <button
                            type="button"
                            onClick={handleGenerateAI}
                            disabled={isGeneratingAI}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGeneratingAI ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Gerando...
                                </>
                            ) : (
                                <>
                                    ✨ Gerar com IA
                                </>
                            )}
                        </button>
                    </div>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Descreva o espaço ou clique em 'Gerar com IA' para criar automaticamente"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                    {aiError && (
                        <p className="mt-1 text-xs text-red-600">{aiError}</p>
                    )}
                </div>

                {/* Capacity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Capacidade (pessoas)</label>
                    <input
                        type="number"
                        name="capacity"
                        defaultValue={initialData?.capacity}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>

                {/* Area with m² */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Área</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="number"
                            name="area"
                            defaultValue={initialData?.area?.replace('m²', '').trim()}
                            required
                            placeholder="Ex: 35"
                            className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            m²
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preço (mensal/diária)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        defaultValue={initialData?.price}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    />
                </div>

                {/* Multiple Images Upload */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagens</label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />

                    {/* Image Previews Grid */}
                    {imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="h-32 w-full object-cover rounded-md border-2 border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    {index === 0 && (
                                        <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                            Principal
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Etiquetas (Tags)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {AVAILABLE_TAGS.map(tag => (
                        <label key={tag} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag}
                                defaultChecked={initialData?.tags?.includes(tag)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">{tag}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Amenities */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {AVAILABLE_AMENITIES.map(amenity => (
                        <label key={amenity.id} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="amenities"
                                value={amenity.id}
                                defaultChecked={initialData?.amenities?.includes(amenity.id)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">{amenity.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Salvar Sala
                </button>
            </div>
        </form>
    );
}
