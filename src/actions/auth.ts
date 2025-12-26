'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');

    // Hardcoded credentials as requested for simplicity
    if (username === 'ryan' && password === 'modlogi') {
        cookies().set('admin_session', 'true', { httpOnly: true, path: '/' });
        redirect('/dashboard');
    }
}

export async function logout() {
    cookies().delete('admin_session');
    redirect('/login');
}
