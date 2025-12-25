import React from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Headset } from 'lucide-react';

export default function AboutYeventPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    {/* Placeholder for an office image, using a dark overlay */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">Yevent</h1>
                    <div className="mt-8">
                        <Link href="/cadastro">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-6 text-lg">
                                Anuncie aqui seu espaço
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-4 max-w-5xl py-20 space-y-20">

                {/* Conheça a Yevent */}
                <div className="grid md:grid-cols-3 gap-10 items-start border-b border-gray-200 pb-16">
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold text-slate-800">Conheça a Yevent</h2>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A Yevent é uma plataforma global construída para ser o melhor elo entre que proprietários de espaços, locadores e administradores profissionais. Estamos sempre a disposição para você ter o melhor tipo de assistência e confiança na busca da sua solução.
                        </p>
                    </div>
                </div>

                {/* Confiança */}
                <div className="grid md:grid-cols-3 gap-10 items-start border-b border-gray-200 pb-16">
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold text-slate-800">Confiança</h2>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Estaremos sempre a postos, no sentido de ser o melhor elo, para que você esclareça todas as dúvidas e tenha o máximo de tranquilidade com a organização e realização do seu evento.
                        </p>
                    </div>
                </div>

                {/* Segurança */}
                <div className="grid md:grid-cols-3 gap-10 items-start border-b border-gray-200 pb-16">
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold text-slate-800">Segurança</h2>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Todos os espaços ofertados passam por uma vistoria on-line ou presencial, para estarem conforme as imagens disponibilizadas. Com isso, você tem a segurança que o que está vendo é verdadeiro.
                        </p>
                    </div>
                </div>

                {/* Apoio ao cliente */}
                <div className="grid md:grid-cols-3 gap-10 items-start">
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold text-slate-800">Apoio ao cliente</h2>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Estaremos 24 horas disponíveis, 7 dias na semana, a postos para fornecer todo suporte necessário a proprietários/ administradores de espaços e clientes, que necessitam de apoio ou que tenham dúvidas.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
