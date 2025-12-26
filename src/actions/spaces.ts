'use server';

import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getSpaces() {
    const { rows } = await sql`SELECT * FROM spaces ORDER BY created_at DESC`;
    return rows;
}

export async function getSpace(id: string) {
    const { rows } = await sql`SELECT * FROM spaces WHERE id = ${id}`;
    return rows[0];
}

export async function createSpace(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const capacity = parseInt(formData.get('capacity') as string) || 0;
    const area = formData.get('area') as string;
    const price = parseFloat(formData.get('price') as string) || 0;

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

    // Insert with image array
    await sql`
    INSERT INTO spaces (name, description, image, city, address, capacity, area, price, tags, amenities)
    VALUES (${name}, ${description}, ${imageUrls as any}, ${city}, ${address}, ${capacity}, ${area}, ${price}, ${tags as any}, ${amenities as any})
  `;

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function updateSpace(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const capacity = parseInt(formData.get('capacity') as string) || 0;
    const area = formData.get('area') as string;
    const price = parseFloat(formData.get('price') as string) || 0;

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

    await sql`
      UPDATE spaces
      SET name=${name}, description=${description}, image=${allImages as any}, city=${city}, address=${address}, capacity=${capacity}, area=${area}, price=${price}, tags=${tags as any}, amenities=${amenities as any}
      WHERE id=${id}
    `;

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function deleteSpace(id: string) {
    await sql`DELETE FROM spaces WHERE id = ${id}`;
    revalidatePath('/dashboard');
}
