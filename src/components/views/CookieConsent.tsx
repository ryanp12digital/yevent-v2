"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('yevent-cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('yevent-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('yevent-cookie-consent', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] w-[90%] md:w-[400px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-blue-600">Controle sua privacidade</h3>

            </div>

            <p className="text-sm text-gray-700 mb-3">
                Nosso site usa cookies para melhorar a navegação.
            </p>

            <div className="flex flex-wrap gap-x-2 text-xs text-blue-600 font-medium mb-6">
                <Link href="/politicas-de-privacidade" className="underline hover:text-blue-800">
                    Política de Privacidade
                </Link>
                <span>-</span>
                <Link href="/termo-de-uso" className="underline hover:text-blue-800">
                    Termos de uso
                </Link>
            </div>

            <div className="flex items-center justify-between gap-3">


                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReject}
                        className="px-5 py-2 rounded-full border border-black text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                    >
                        Rejeitar
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-5 py-2 rounded-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
