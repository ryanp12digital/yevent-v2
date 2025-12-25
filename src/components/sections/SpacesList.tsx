
'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SPACES, type Space } from '../../data/spaces'
import { Users, Maximize2, ArrowRight, MapPin, Plus, LayoutGrid, XCircle } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'
import { FilterCriteria } from '../../lib/types'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

interface SpacesListProps {
  limit?: number
  showTitle?: boolean
  onViewDetails?: (space: Space) => void
  onSeeAll?: () => void
  seeAllHref?: string
  filters?: FilterCriteria
}

const SpacesList: React.FC<SpacesListProps> = ({ limit, showTitle = true, onViewDetails, onSeeAll, seeAllHref, filters }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayCount, setDisplayCount] = useState(limit || 6)

  // Filtragem dos espaços
  const filteredSpaces = SPACES.filter(space => {
    if (!filters) return true;

    // Lógica da capacidade
    const matchCapacity = space.capacity <= filters.capacity;
    const matchCity = !filters.city || filters.city === '' || space.city === filters.city;
    
    // Verifica se o tipo está no nome ou nas tags
    const matchType = !filters.type || filters.type === '' || 
      space.tags.some(tag => tag.toLowerCase().includes(filters.type.toLowerCase())) ||
      space.name.toLowerCase().includes(filters.type.toLowerCase());

    return matchCapacity && matchCity && matchType;
  });

  const isFiltering = filters && (filters.city !== '' || filters.type !== '' || filters.capacity < 200);
  const finalSpaces = isFiltering ? filteredSpaces : filteredSpaces.slice(0, limit ? limit : displayCount);

  // Re-run animation when list changes
  useGSAP(() => {
    const cards = gsap.utils.toArray('.space-card')
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, { scope: containerRef, dependencies: [finalSpaces] })

  const handleSeeAllClick = (e: React.MouseEvent) => {
    if (onSeeAll) {
      e.preventDefault()
      onSeeAll()
    }
  }

  // Componente interno para renderizar o conteúdo do card (evita duplicação)
  const CardContent = ({ space }: { space: Space }) => (
    <>
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-50">
        <img 
          id={`space-img-${space.id}`}
          src={space.image} 
          alt={space.name}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 z-10">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-[9px] font-bold text-blue-600 uppercase rounded-full shadow-lg tracking-[0.2em]">
            {space.city}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-blue-600 mb-4 font-bold text-[9px] uppercase tracking-[0.25em] opacity-80">
          <MapPin className="w-3.5 h-3.5" />
          <span>Premium Location</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
          {space.name}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Capacidade</span>
              <span className="text-xs font-semibold text-slate-900">{space.capacity} pessoas</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Área</span>
              <span className="text-xs font-semibold text-slate-900">{space.area}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div>
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Investimento</span>
            <div className="text-slate-900 font-semibold text-xl md:text-2xl tracking-tighter">
              {space.price ? formatCurrency(space.price) : 'Consulte'}
            </div>
          </div>
          <div 
            id={`space-btn-view-${space.id}`}
            className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:-rotate-45 shadow-lg group-hover:shadow-blue-200"
          >
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section id="spaces-list-section" className="relative bg-white overflow-hidden" ref={containerRef}>
      <div className="relative max-w-[1440px] mx-auto z-10">
        {showTitle && (
          <div className="mb-20 text-center space-y-4">
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Catálogo Premium</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tighter">Nossa Curadoria de Espaços</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Ambientes projetados para elevar o profissionalismo da sua marca e garantir o sucesso do seu evento.
            </p>
          </div>
        )}

        {/* Feedback de busca vazia */}
        {finalSpaces.length === 0 && (
          <div id="spaces-empty-state" className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum espaço encontrado</h3>
            <p className="text-slate-500">Tente ajustar seus filtros para encontrar o que procura.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {finalSpaces.map((space) => (
            <React.Fragment key={space.id}>
              {onViewDetails ? (
                // Modo SPA / App.tsx
                <div 
                  id={`space-card-${space.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onViewDetails(space);
                  }}
                  className="space-card group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-400 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.12)] transition-all duration-700 flex flex-col cursor-pointer"
                >
                  <CardContent space={space} />
                </div>
              ) : (
                // Modo Next.js / App Router (Links REAIS)
                <Link
                  href={`/spaces/${space.id}`}
                  id={`space-card-${space.id}`}
                  className="space-card group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-400 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.12)] transition-all duration-700 flex flex-col cursor-pointer"
                >
                  <CardContent space={space} />
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Botões de ação (Ver todos / Carregar mais) */}
        {!isFiltering && limit && (
          <div className="mt-20 flex justify-center">
            {seeAllHref ? (
              <Link 
                href={seeAllHref}
                id="spaces-link-see-all"
                className="group flex items-center gap-4 px-10 py-4 font-bold uppercase text-[10px] tracking-[0.25em] bg-white border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-xl shadow-slate-200"
              >
                <LayoutGrid className="w-4 h-4 transition-transform group-hover:rotate-12" />
                Explorar todos os espaços
              </Link>
            ) : (
              <button 
                type="button"
                id="spaces-btn-see-all"
                onClick={handleSeeAllClick}
                className="group flex items-center gap-4 px-10 py-4 font-bold uppercase text-[10px] tracking-[0.25em] bg-white border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-xl shadow-slate-200"
              >
                <LayoutGrid className="w-4 h-4 transition-transform group-hover:rotate-12" />
                Explorar todos os espaços
              </button>
            )}
          </div>
        )}

        {!limit && !isFiltering && displayCount < SPACES.length && (
          <div className="mt-20 flex justify-center">
            <button 
              type="button"
              id="spaces-btn-load-more"
              onClick={() => setDisplayCount(prev => prev + 3)}
              className="group flex items-center gap-4 px-10 py-4 font-bold uppercase text-[10px] tracking-[0.25em] bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all duration-500 shadow-2xl"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Carregar mais opções
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default SpacesList
