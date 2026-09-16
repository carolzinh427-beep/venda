import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { SearchFilters } from '../components/home/SearchFilters';
import { CategoriesGrid } from '../components/home/CategoriesGrid';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { WhyListSection } from '../components/home/WhyListSection';
import { FarmAgencySection } from '../components/home/FarmAgencySection';
import { FaqSection } from '../components/home/FaqSection';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectMachine: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectMachine }) => {
  const { setFilters } = useApp();

  const handleSelectCategory = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    onNavigate('/maquinas');
  };

  const handleSearchSubmit = () => {
    onNavigate('/maquinas');
  };

  return (
    <div className="space-y-0 animate-fade-in">
      {/* 1. HERO SECTION */}
      <Hero onNavigate={onNavigate} />

      {/* 2. SEARCH & FILTERS BAR */}
      <SearchFilters onSearchSubmit={handleSearchSubmit} />

      {/* 3. VISUAL CATEGORIES GRID */}
      <CategoriesGrid onSelectCategory={handleSelectCategory} />

      {/* 4. FEATURED MACHINES */}
      <FeaturedSection 
        onSelectMachine={onSelectMachine} 
        onNavigateCatalog={() => onNavigate('/maquinas')} 
      />

      {/* 5. HOW IT WORKS */}
      <HowItWorks />

      {/* 6. WHY LIST WITH US (1% vs 2%) */}
      <WhyListSection onNavigateAnnounce={() => onNavigate('/anunciar')} />

      {/* 7. FARM AGENCY SPECIALIZED SECTION */}
      <FarmAgencySection onNavigateAgencyPage={() => onNavigate('/agenciamento-lavouras')} />

      {/* 8. FAQ SECTION */}
      <FaqSection />
    </div>
  );
};
