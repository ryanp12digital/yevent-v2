'use client';

import { useState, useTransition } from 'react';
import { updateUserRole } from '@/actions/users';
import { toast } from 'react-hot-toast';

interface UserRoleSelectorProps {
    userId: string;
    currentRole: string;
}

export default function UserRoleSelector({ userId, currentRole }: UserRoleSelectorProps) {
    const [isPending, startTransition] = useTransition();

    const handleRoleChange = (newRole: string) => {
        startTransition(async () => {
            try {
                await updateUserRole(userId, newRole);
                toast.success('Permissão atualizada!');
            } catch (err: any) {
                toast.error(err.message || 'Erro ao atualizar');
            }
        });
    };

    return (
        <select
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            disabled={isPending}
            className="block w-32 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
        >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
        </select>
    );
}
