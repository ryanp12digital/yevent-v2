
'use client'

import React, { useState, useEffect } from 'react';
import { useSafeRouter } from '../../hooks/useSafeRouter';
import { type Space } from '../../data/spaces';
import { 
  Users, Maximize2, ArrowLeft, Wifi, Tv, Coffee, 
  Wind, ShieldCheck, MapPin, Calendar, Check, X, ZoomIn
} from 'lucide-react';
import Button from '../ui/Button';
import { formatCurrency, cn } from '../../lib/utils';
import BookingForm from './BookingForm';

interface SpaceDetailProps {
  space: Space;
  onBack?: () => void;
}

const SpaceDetail: React.FC<SpaceDetailProps> = ({ space, onBack }) => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const router = useSafeRouter();

  // Fechar lightbox com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const amenities = [
    { icon: Wifi, label: 'Wi-Fi de Alta Velocidade' },
    { icon: Tv, label: 'Projetor e Áudio' },
    { icon: Coffee, label: 'Coffee Break (Opcional)' },
    { icon: Wind, label: 'Ar Condicionado' },
    { icon: ShieldCheck, label: 'Segurança 24h' },
    { icon: Calendar, label: 'Reserva Flexível' },
  ];

  // Simular uma galeria com a imagem principal e algumas aleatórias
  const galleryImages = [
    space.image,
    `https://picsum.photos/seed/${space.id}1/800/600`,
    `https://picsum.photos/seed/${space.id}2/800/600`,
    `https://picsum.photos/seed/${space.id}3/800/600`,
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router) {
      router.push('/spaces');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/spaces';
    }
  };

  return (
    <>
      <div className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <button 
            id="detail-btn-back"
            onClick={handleBack}
            className="flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Voltar para busca
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              {/* Galeria de Imagens */}
              <div className="space-y-4">
                <div 
                  className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl cursor-zoom-in group relative"
                  onClick={() => setLightboxImage(galleryImages[0])}
                >
                  <img 
                    src={galleryImages[0]} 
                    alt={space.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 h-32">
                  {galleryImages.slice(1).map((img, idx) => (
                    <div 
                      key={idx}
                      className="rounded-2xl overflow-hidden bg-slate-100 cursor-pointer relative group"
                      onClick={() => setLightboxImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`Galeria ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="text-white w-6 h-6 drop-shadow-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  {space.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 id="detail-title" className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6">{space.name}</h1>
                
                <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase">Capacidade</span>
                      <span className="font-semibold text-slate-900">{space.capacity} Pessoas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase">Tamanho</span>
                      <span className="font-semibold text-slate-900">{space.area}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase">Localização</span>
                      <span className="font-semibold text-slate-900">{space.city}, Brasil</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none">
                  <h3 className="text-2xl font-semibold mb-4 text-slate-900">Sobre o espaço</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    Este espaço foi meticulosamente planejado para atender às demandas de eventos corporativos modernos. Localizado estrategicamente no centro financeiro de {space.city}, oferece a infraestrutura completa para treinamentos, workshops e reuniões de alto nível.
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    O ambiente conta com iluminação natural, mobiliário ergonômico e isolamento acústico de primeira linha, garantindo que seu evento ocorra sem interrupções e com o máximo de conforto para todos os participantes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-slate-900">O que este local oferece</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-sm font-bold text-slate-400 uppercase mb-1">Valor do turno</span>
                    <div className="text-3xl font-semibold text-slate-900 tracking-tighter">
                      {space.price ? formatCurrency(space.price) : 'Sob Consulta'}
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase">
                    Disponível
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span>Reserva garantida e imediata</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span>Suporte técnico on-site</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check className="w-5 h-5 text-blue-600" />
                    <span>Cancelamento grátis até 48h antes</span>
                  </div>
                </div>

                <Button 
                  id="detail-btn-request-booking"
                  size="lg" 
                  className="w-full py-5 text-base font-bold uppercase tracking-widest shadow-xl shadow-blue-200 rounded-2xl"
                  onClick={() => setIsBookingFormOpen(true)}
                >
                  Solicitar Reserva
                </Button>

                <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                  Você não será cobrado ainda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBookingFormOpen && (
        <BookingForm 
          spaceId={space.id}
          spaceName={space.name}
          onClose={() => setIsBookingFormOpen(false)}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={lightboxImage} 
              alt="Visualização ampliada" 
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SpaceDetail;
