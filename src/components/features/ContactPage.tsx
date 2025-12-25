'use client'

import React from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '../../lib/schemas';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';
import { cn } from '../../lib/utils';

const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contato Geral Payload:', data);
      setIsSubmitted(true);
      toast.success('Mensagem enviada com sucesso!');
      reset();
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar sua mensagem.');
    }
  };

  return (
    <div className="relative bg-white overflow-hidden pt-32 pb-24 min-h-[80vh]">
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="text-center mb-20 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs">Fale Conosco</span>
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">Vamos planejar seu <br /> próximo grande evento?</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Nossa equipe está pronta para ajudar você a encontrar a solução ideal para suas necessidades corporativas.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Informações de Contato */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <ContactCard 
                icon={Phone} 
                title="Telefone" 
                content="+55 (81) 9 9187-0929" 
                subContent="Seg a Sex, 9h às 18h"
              />
              <ContactCard 
                icon={Mail} 
                title="E-mail" 
                content="contato@yevent.com.br" 
                subContent="Suporte corporativo 24/7"
              />
              <ContactCard 
                icon={MapPin} 
                title="Sede" 
                content="Recife, PE" 
                subContent="Rua Manuel de Brito, 311"
              />
              <ContactCard 
                icon={Clock} 
                title="Horário" 
                content="09:00 - 18:00" 
                subContent="Atendimento presencial"
              />
            </div>

            <div className="pt-8 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Siga nossas novidades</p>
              <div className="flex gap-4">
                <a id="contact-link-linkedin" href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a id="contact-link-instagram" href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-blue-900/5">
              {isSubmitted ? (
                <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Mensagem Recebida!</h3>
                  <p className="text-slate-500 mb-8 font-medium">Obrigado por entrar em contato. Um de nossos consultores responderá você em até 24 horas úteis.</p>
                  <Button id="contact-btn-success-reset" onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-2xl px-10">Enviar outra mensagem</Button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      id="contact-input-name"
                      label="Nome" 
                      placeholder="Como podemos te chamar?" 
                      {...register('name')} 
                      error={errors.name?.message}
                      className="rounded-2xl px-6 py-4"
                    />
                    <Input 
                      id="contact-input-email"
                      label="E-mail" 
                      placeholder="seu@email.com.br" 
                      {...register('email')} 
                      error={errors.email?.message}
                      className="rounded-2xl px-6 py-4"
                    />
                  </div>
                  <Input 
                    id="contact-input-phone"
                    label="Telefone" 
                    placeholder="(00) 00000-0000" 
                    {...register('phone')} 
                    error={errors.phone?.message}
                    className="rounded-2xl px-6 py-4"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Mensagem</label>
                    <textarea 
                      id="contact-textarea-message"
                      className={cn(
                        "w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none transition-all h-32 font-medium text-slate-800 focus:ring-2 focus:ring-blue-600/20",
                        errors.message ? "border-red-500" : "border-slate-200 focus:border-blue-600"
                      )}
                      placeholder="Conte-nos um pouco sobre o que você precisa..."
                      {...register('message')}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                  </div>
                  <Button 
                    id="contact-btn-submit"
                    type="submit" 
                    className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Processando...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon: Icon, title, content, subContent }: { icon: any, title: string, content: string, subContent: string }) => (
  <div className="group p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all flex gap-6 cursor-default">
    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-lg font-semibold text-slate-900 mb-1">{content}</p>
      <p className="text-sm text-slate-500 font-medium">{subContent}</p>
    </div>
  </div>
);

export default ContactPage;
