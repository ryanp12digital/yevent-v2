
'use client'

import React, { useState } from 'react'
import Hero from '@/components/sections/Hero'
import SpacesList from '@/components/sections/SpacesList'
import { FilterCriteria } from '@/lib/types'

import { Space } from '@/data/spaces'

interface HomePageViewProps {
  initialSpaces: Space[]
}

export default function HomePageView({ initialSpaces }: HomePageViewProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    city: '',
    type: '',
    capacity: 200
  });

  const handleSearch = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    setTimeout(() => {
      const spacesSection = document.getElementById('spaces-list-section');
      if (spacesSection) {
        spacesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <Hero onSearch={handleSearch} />

      {/* Seção de Transição */}
      <div className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="space-y-4 max-w-2xl">
              <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Exclusividade</span>
              <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                Destaques selecionados <br /> para sua empresa.
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-lg max-w-sm pb-2">
              Conheça os espaços que estão transformando a forma como grandes marcas realizam seus eventos.
            </p>
          </div>

          <SpacesList
            limit={3}
            showTitle={false}
            filters={filters}
            seeAllHref="/spaces"
            spaces={initialSpaces}
          />
        </div>
      </div>
    </div>
  )
}
