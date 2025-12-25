'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, type BookingFormData } from '../../lib/schemas';
import { useUTMTracker } from '../../hooks/useUTMTracker';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface BookingFormProps {
  spaceId?: string;
  spaceName?: string;
  onClose: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const BookingForm: React.FC<BookingFormProps> = ({ spaceId, spaceName, onClose }) => {
  const utms = useUTMTracker();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Implement Escape key shortcut to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'loading') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      space_id: spaceId,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setStatus('loading');
    setErrorMessage(null);
    
    // Payload robusto para o webhook
    const payload = {
      ...data,
      space_id: spaceId,
      space_name: spaceName,
      utms,
      timestamp: new Date().toISOString(),
    };

    console.log('[Tech Lead Simulation] Enviando Lead para Webhook:', payload);

    try {
      // Simular delay de rede e 10% de chance de erro para testar feedback visual
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) {
            reject(new Error('Falha na conexão com o servidor.'));
          } else {
            resolve(true);
          }
        }, 1800);
      });

      setStatus('success');
      toast.success('Reserva solicitada!');
      reset();
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
      toast.error('Erro ao enviar solicitação.');
    }
  };

  return (
    <div 
      id="booking-modal-overlay"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        // Close on backdrop click if not loading
        if (e.target === e.currentTarget && status !== 'loading') {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {status !== 'loading' && (
          <button 
            id="booking-btn-close"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Obrigado pela sua reserva!</h2>
              <p className="text-slate-500 mb-8">
                Recebemos sua solicitação para o espaço <strong>{spaceName}</strong>. 
                Nossa equipe entrará em contato em breve via e-mail ou WhatsApp.
              </p>
              <Button id="booking-btn-success-close" onClick={onClose} className="w-full">
                Fechar
              </Button>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Algo deu errado</h2>
              <p className="text-slate-500 mb-8">
                {errorMessage || 'Não foi possível processar seu pedido agora.'}
              </p>
              <Button id="booking-btn-error-retry" onClick={() => setStatus('idle')} variant="outline" className="w-full">
                Tentar novamente
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Solicite um Orçamento</h2>
              <p className="text-slate-500 mb-6 text-sm">
                {spaceName ? `Interesse em: ${spaceName}` : 'Preencha os campos abaixo para receber uma proposta personalizada.'}
              </p>

              <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  id="booking-input-name"
                  label="Nome completo"
                  placeholder="Seu nome aqui"
                  disabled={status === 'loading'}
                  autoFocus
                  {...register('name')}
                  error={errors.name?.message}
                />
                
                <Input
                  id="booking-input-email"
                  label="E-mail corporativo"
                  type="email"
                  placeholder="exemplo@empresa.com"
                  disabled={status === 'loading'}
                  {...register('email')}
                  error={errors.email?.message}
                />

                <Input
                  id="booking-input-phone"
                  label="Telefone / WhatsApp"
                  placeholder="(00) 00000-0000"
                  disabled={status === 'loading'}
                  {...register('phone')}
                  error={errors.phone?.message}
                />

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Detalhes do evento</label>
                  <textarea
                    id="booking-textarea-message"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24 disabled:opacity-50 disabled:bg-slate-50"
                    placeholder="Data pretendida, número de pessoas, etc."
                    {...register('message')}
                  ></textarea>
                  {errors.message?.message && <p className="text-xs text-red-500">{errors.message?.message}</p>}
                </div>

                <Button 
                  id="booking-btn-submit"
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Reservar agora!'
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
