import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, X, RefreshCw, ChevronDown, Check } from 'lucide-react';

interface SearchFiltersProps {
  onSearchSubmit?: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearchSubmit }) => {
  const { filters, setFilters, resetFilters, categories, machines } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands, models, locations for dropdown options
  const uniqueBrands = Array.from(new Set(machines.map(m => m.brand).filter(Boolean))).sort();
  const uniqueLocations = Array.from(new Set(machines.map(m => m.location).filter(Boolean))).sort();

  const handleInputChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const hasActiveFilters = Boolean(
    filters.search || filters.category || filters.brand || filters.model || 
    filters.yearMin || filters.yearMax || filters.priceMin || filters.priceMax || 
    filters.location || filters.ownerType
  );

  return (
    <div className="relative -mt-8 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-agro-hover border border-agro-leaf/20 p-4 sm:p-6 text-agro-graphite">
        
        {/* HEADER TITLE */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-agro-cream border border-agro-leaf/20 text-agro-leaf">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-agro-dark tracking-tight">
              Encontre sua próxima máquina
            </h2>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>

        {/* MAIN SEARCH FORM */}
        <form onSubmit={handleSearch} className="space-y-4">
          
          {/* SEARCH BAR & MAIN INPUT */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleInputChange('search', e.target.value)}
                placeholder="Digite marca, modelo ou equipamento..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-agro-leaf focus:bg-white transition-all"
              />
              {filters.search && (
                <button 
                  type="button" 
                  onClick={() => handleInputChange('search', '')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* CATEGORY SELECTOR IN MAIN BAR */}
            <div className="w-full md:w-56">
              <select
                value={filters.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-agro-leaf focus:bg-white"
              >
                <option value="">Todas as Categorias</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Buscar</span>
            </button>

            {/* MOBILE FILTER TOGGLE */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm px-4 py-3 rounded-xl border border-gray-300"
            >
              <Filter className="w-4 h-4 text-agro-leaf" />
              <span>Filtros {hasActiveFilters && '(Ativos)'}</span>
            </button>
          </div>

          {/* DESKTOP ADVANCED FILTERS GRID */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            
            {/* BRAND */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Marca</label>
              <select
                value={filters.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-agro-leaf"
              >
                <option value="">Todas as Marcas</option>
                {uniqueBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* MODEL */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Modelo</label>
              <input
                type="text"
                value={filters.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="Ex: 6110J, MF 9695"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-agro-leaf"
              />
            </div>

            {/* YEAR RANGE */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Ano Mínimo</label>
              <select
                value={filters.yearMin}
                onChange={(e) => handleInputChange('yearMin', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-agro-leaf"
              >
                <option value="">Qualquer Ano</option>
                {[2024, 2023, 2022, 2021, 2020, 2018, 2015, 2010, 2005, 2000].map(y => (
                  <option key={y} value={y.toString()}>A partir de {y}</option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Localização</label>
              <select
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-agro-leaf"
              >
                <option value="">Todas as Cidades/UF</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* PRICE MAX */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Preço Máximo</label>
              <select
                value={filters.priceMax}
                onChange={(e) => handleInputChange('priceMax', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-agro-leaf"
              >
                <option value="">Sem limite de valor</option>
                <option value="100000">Até R$ 100.000</option>
                <option value="300000">Até R$ 300.000</option>
                <option value="500000">Até R$ 500.000</option>
                <option value="1000000">Até R$ 1.000.000</option>
                <option value="2000000">Até R$ 2.000.000</option>
              </select>
            </div>

          </div>

        </form>

        {/* MOBILE FILTERS MODAL / DRAWER */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
            <div className="w-full max-w-xs sm:max-w-md bg-white h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-agro-leaf" />
                    <h3 className="font-extrabold text-lg text-agro-dark">Filtros de Busca</h3>
                  </div>
                  <button 
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-600 bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-left">
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Categoria</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Todas as Categorias</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Marca</label>
                    <select
                      value={filters.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Todas as Marcas</option>
                      {uniqueBrands.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Modelo</label>
                    <input
                      type="text"
                      value={filters.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Ex: 6110J, MF 9695"
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Ano Mínimo</label>
                    <select
                      value={filters.yearMin}
                      onChange={(e) => handleInputChange('yearMin', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Qualquer Ano</option>
                      {[2024, 2023, 2022, 2021, 2020, 2018, 2015, 2010].map(y => (
                        <option key={y} value={y.toString()}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Localização</label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Todas as Cidades/UF</option>
                      {uniqueLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Preço Máximo</label>
                    <select
                      value={filters.priceMax}
                      onChange={(e) => handleInputChange('priceMax', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Sem limite</option>
                      <option value="100000">Até R$ 100.000</option>
                      <option value="300000">Até R$ 300.000</option>
                      <option value="500000">Até R$ 500.000</option>
                      <option value="1000000">Até R$ 1.000.000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Origem do Anúncio</label>
                    <select
                      value={filters.ownerType}
                      onChange={(e) => handleInputChange('ownerType', e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Todas as Origens</option>
                      <option value="PLATFORM">Máquinas Próprias (Plataforma)</option>
                      <option value="THIRD_PARTY">Anúncios de Vendedores Terceiros</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileFilterOpen(false);
                    if (onSearchSubmit) onSearchSubmit();
                  }}
                  className="w-full bg-agro-leaf text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Aplicar Filtros</span>
                </button>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Limpar Todos os Filtros
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
