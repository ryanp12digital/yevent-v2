'use server'

import { WEBHOOK_URL } from '../lib/constants';

export async function sendWebhook(payload: any) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Webhook Server Action Error:', response.statusText);
            return { success: false, error: `Server error: ${response.statusText}` };
        }

        return { success: true };
    } catch (error) {
        console.error('Webhook Server Action Exception:', error);
        return { success: false, error: 'Network error or unreachable host' };
    }
}
