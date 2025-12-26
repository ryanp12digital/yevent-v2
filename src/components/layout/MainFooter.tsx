
'use client'

import React from 'react';
import Link from 'next/link';
import { Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeRouter } from '../../hooks/useSafeRouter';
import { newsletterSchema, type NewsletterFormData } from '../../lib/schemas';
import { toast } from 'react-hot-toast';
import { type ViewState } from '../../lib/types';

interface MainFooterProps {
  onNavigate?: (view: ViewState) => void;
}

const MainFooter: React.FC<MainFooterProps> = ({ onNavigate }) => {
  const router = useSafeRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onNewsletterSubmit = async (data: NewsletterFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Newsletter signup:', data);
    toast.success('Inscrição realizada com sucesso!');
    reset();
  };

  const handleNavigate = (view: ViewState) => {
    // SPA Mode
    if (onNavigate) {
      onNavigate(view);
      return;
    }

    // Next.js Mode
    const pathMap: Record<string, string> = {
      home: '/',
      spaces: '/spaces',
      contact: '/contact',
      detail: '/spaces',
      terms: '/termo-de-uso',
      privacy: '/politicas-de-privacidade'
    };

    const path = pathMap[view];
    if (path && router) {
      router.push(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path || '/';
    }
  };

  return (
    <footer id="footer-section" className="bg-white pt-24">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 -mb-16 relative z-20">
        <div className="bg-blue-600 rounded-[4rem] p-12 md:p-20 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)] flex flex-col lg:flex-row items-center justify-between gap-12 border-[8px] border-blue-500/30">
          <div className="text-white text-center lg:text-left space-y-2">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-none uppercase">INSCREVA-SE PARA RECEBER</h3>
            <p className="text-blue-100 text-base md:text-base font-medium tracking-[0.1em] opacity-90">NOTIFICAÇÃO DE NOVOS ESPAÇOS</p>
          </div>
          <form
            id="footer-newsletter-form"
            onSubmit={handleSubmit(onNewsletterSubmit)}
            className="w-full lg:w-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center"
          >
            <div className="relative flex-1 md:w-96">
              <input
                id="footer-input-newsletter"
                type="email"
                placeholder="Seu melhor Email"
                required
                {...register('email')}
                className="w-full px-8 py-6 rounded-[2rem] bg-slate-950/20 backdrop-blur-md border border-white/20 outline-none text-white placeholder:text-blue-100 font-semibold transition-all focus:bg-slate-950/40 focus:border-white/40"
              />
            </div>
            <button
              id="footer-btn-newsletter-submit"
              type="submit"
              disabled={isSubmitting}
              className="px-14 py-6 font-bold uppercase tracking-[0.2em] text-[11px] bg-slate-950 text-white hover:bg-black transition-all rounded-[2rem] shadow-2xl active:scale-95 whitespace-nowrap disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Inscreva-se agora'}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-slate-50 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
            {/* Brand */}
            <div className="space-y-10">
              <span id="footer-link-brand" className="text-3xl font-bold text-blue-600 tracking-tighter cursor-pointer" onClick={() => handleNavigate('home')}>Yevent</span>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Escritório Central</p>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="font-medium leading-relaxed">Recife - Rua Manuel de Brito, 311 - Pina - Recife-PE.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 text-sm text-slate-600">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <p id="footer-info-phone" className="font-semibold pt-3">+55 (81) 9 9187-0929</p>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <p id="footer-info-email" className="font-semibold pt-3">suporte@yevent.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links 1 */}
            <div className="space-y-10">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Conheça a Yevent</h4>
              <ul className="space-y-5 text-sm text-slate-500 font-semibold uppercase tracking-widest text-[11px]">
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=558191870929&text=Gostaria+de+saber+mais+sobre+a+Yevent&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Quem somos
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=558191870929&text=Gostaria+de+entender+como+a+Yevent+funciona&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Como funciona
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Links 2 */}
            <div className="space-y-10">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Atendimento</h4>
              <ul className="space-y-5 text-sm text-slate-500 font-semibold uppercase tracking-widest text-[11px]">
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=558191870929&text=Gostaria+de+ajuda+para+locar+uma+sala+na+Yevent&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Centro de ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=558191870929&text=Tenho+interesse+em+ser+um+parceiro&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Seja um parceiro
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=558191870929&text=D%C3%BAvidas+sobre+pol%C3%ADtica+de+cancelamento&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Políticas de cancelamento
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=558191870929&text=Gostaria+de+entrar+em+contato+com+a+ouvidoria&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Ouvidoria
                  </a>
                </li>
              </ul>
            </div>

            {/* Políticas */}
            <div className="space-y-10">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Políticas</h4>
              <ul className="space-y-5 text-sm text-slate-500 font-semibold uppercase tracking-widest text-[11px]">
                <li><Link href="/termo-de-uso" className="hover:text-blue-600 transition-colors">Termos de uso</Link></li>
                <li><Link href="/politicas-de-privacidade" className="hover:text-blue-600 transition-colors">Política de privacidade</Link></li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Siga-nos</h4>
                <div className="flex gap-4">
                  <a id="footer-link-linkedin" href="#" className="w-14 h-14 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:-translate-y-1">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a id="footer-link-instagram" href="#" className="w-14 h-14 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:-translate-y-1">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Segurança</p>
                <div className="flex items-center gap-2 text-green-600 font-bold text-[11px] uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Navegação Segura
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-10 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
            <p>Yevent © Todos os direitos reservados 2024</p>
            <div className="flex gap-8">
              <span className="text-slate-900">Desenvolvido por Tech Lead Studio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
