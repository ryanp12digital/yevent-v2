
'use client'

import React, { useState } from 'react'
import { Search, MapPin, Users, Building2 } from 'lucide-react'
import Button from '../ui/Button'
import { FilterCriteria } from '../../lib/types'

interface HeroProps {
  onSearch?: (filters: FilterCriteria) => void
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [capacity, setCapacity] = useState(50)
  const [city, setCity] = useState('')
  const [type, setType] = useState('')

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch({
        city,
        type,
        capacity
      })
    }
  }

  return (
    <section id="hero-section" className="relative h-screen min-h-[800px] flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Image fix - using standard img to ensure ESM compatibility */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury office space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <div className="space-y-6 mb-12 animate-in fade-in slide-in-from-top-8 duration-1000">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em]">
            Hospedagem de eventos premium
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] drop-shadow-2xl">
            Encontre o local perfeito para seus eventos corporativos.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            Encontre e reserve espaços corporativos de alto padrão em segundos. 
            Ambientes que inspiram inovação e resultados.
          </p>
        </div>

        {/* Search Bar Re-designed for high-end look */}
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl rounded-4xl md:rounded-[2.5rem] p-2 md:p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-stretch md:items-center text-slate-800 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 border border-white/20">
          
          <div className="flex flex-col md:flex-row flex-1 items-stretch md:items-center">
            {/* Cidade */}
            <div className="flex-1 flex items-center px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-slate-100 group transition-colors hover:bg-slate-50 rounded-2xl md:rounded-none">
              <MapPin className="text-blue-600 mr-4 w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-left w-full">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Localização</span>
                <select 
                  id="hero-select-city"
                  className="w-full bg-transparent outline-none font-semibold appearance-none cursor-pointer text-slate-900 text-sm md:text-base pr-4"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Todas as Cidades</option>
                  <option value="Fortaleza">Fortaleza, CE</option>
                  <option value="Salvador">Salvador, BA</option>
                  <option value="Recife">Recife, PE</option>
                </select>
              </div>
            </div>

            {/* Tipo */}
            <div className="flex-1 flex items-center px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-slate-100 group transition-colors hover:bg-slate-50 rounded-2xl md:rounded-none">
              <Building2 className="text-blue-600 mr-4 w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-left w-full">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Tipo de Espaço</span>
                <select 
                  id="hero-select-type"
                  className="w-full bg-transparent outline-none font-semibold appearance-none cursor-pointer text-slate-900 text-sm md:text-base pr-4"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Qualquer formato</option>
                  <option value="Auditório">Auditório</option>
                  <option value="Sala de Reunião">Sala de Reunião</option>
                  <option value="Sala de Aula">Sala de Aula</option>
                </select>
              </div>
            </div>

            {/* Capacidade */}
            <div className="flex-[1.2] flex items-center px-6 py-4 md:py-2 group transition-colors hover:bg-slate-50 rounded-2xl md:rounded-none">
              <Users className="text-blue-600 mr-4 w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="text-left w-full">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Até {capacity} Pessoas</span>
                  <span className="text-xs font-bold text-blue-600">
                    {capacity >= 200 ? '200+' : capacity}
                  </span>
                </div>
                <input 
                  id="hero-range-capacity"
                  type="range" 
                  className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none mt-2" 
                  min="5" 
                  max="200" 
                  step="5"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="p-2 md:p-0 md:pl-4">
            <Button 
              id="hero-btn-search"
              size="lg" 
              onClick={handleSearchClick}
              className="w-full md:w-auto md:rounded-2xl flex items-center justify-center py-5 md:py-5 md:px-10 shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all bg-blue-600 border-none group"
            >
              <Search className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              <span className="uppercase tracking-[0.2em] text-[11px] font-bold">Buscar Espaço</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
