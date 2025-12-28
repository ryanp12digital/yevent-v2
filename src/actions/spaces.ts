'use server';

import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase';
import { isSuperAdmin } from '@/actions/users';

export async function getSpaces() {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching spaces:', error);
        return [];
    }
    return data || [];
}

export async function getSpace(id: string) {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching space:', error);
        return null;
    }
    return data;
}

export async function createSpace(formData: FormData) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autenticado");
    }

    // Check admin role
    const { data: dbUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    const superAdmin = await isSuperAdmin();

    if (dbUser?.role !== "admin" && !superAdmin) {
        throw new Error("Não autorizado");
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const capacity = parseInt(formData.get('capacity') as string) || 0;
    const area = formData.get('area') as string;
    const price = formData.get('price') as string;

    // Handle multiple images
    const imageFiles = formData.getAll('images') as File[];
    const tags = formData.getAll('tags') as string[];
    const amenities = formData.getAll('amenities') as string[];

    // Upload all images to Vercel Blob
    const imageUrls: string[] = [];
    for (const imageFile of imageFiles) {
        if (imageFile && imageFile.size > 0) {
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
                addRandomSuffix: true,
            });
            imageUrls.push(blob.url);
        }
    }

    // Insert with Supabase
    const { error } = await supabase
        .from('spaces')
        .insert({
            name,
            description,
            image: imageUrls,
            city,
            address,
            capacity,
            area,
            price,
            tags,
            amenities,
        });

    if (error) {
        console.error('Error creating space:', error);
        throw new Error("Erro ao criar espaço");
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function updateSpace(id: string, formData: FormData) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autenticado");
    }

    // Check admin role
    const { data: dbUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    const superAdmin = await isSuperAdmin();

    if (dbUser?.role !== "admin" && !superAdmin) {
        throw new Error("Não autorizado");
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const capacity = parseInt(formData.get('capacity') as string) || 0;
    const area = formData.get('area') as string;
    const price = formData.get('price') as string;

    // Handle multiple new images
    const newImageFiles = formData.getAll('images') as File[];
    const existingImages = JSON.parse(formData.get('existingImages') as string || '[]');
    const tags = formData.getAll('tags') as string[];
    const amenities = formData.getAll('amenities') as string[];

    // Upload new images
    const newImageUrls: string[] = [];
    for (const imageFile of newImageFiles) {
        if (imageFile && imageFile.size > 0) {
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
                addRandomSuffix: true,
            });
            newImageUrls.push(blob.url);
        }
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...newImageUrls];

    const { error } = await supabase
        .from('spaces')
        .update({
            name,
            description,
            image: allImages,
            city,
            address,
            capacity,
            area,
            price,
            tags,
            amenities,
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating space:', error);
        throw new Error("Erro ao atualizar espaço");
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function deleteSpace(id: string) {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autenticado");
    }

    // Check admin role
    const { data: dbUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    const superAdmin = await isSuperAdmin();

    if (dbUser?.role !== "admin" && !superAdmin) {
        throw new Error("Não autorizado");
    }

    const { error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting space:', error);
        throw new Error("Erro ao excluir espaço");
    }

    revalidatePath('/dashboard');
}
