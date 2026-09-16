import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MachineCard } from '../components/machines/MachineCard';
import { SearchFilters } from '../components/home/SearchFilters';
import { Tractor, Filter, RefreshCw, Layers } from 'lucide-react';

interface CatalogPageProps {
  onSelectMachine: (id: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelectMachine }) => {
  const { machines, filters, resetFilters } = useApp();
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'year-desc'>('recent');

  // Filter machines based on active filters & PUBLISHED status
  const filteredMachines = useMemo(() => {
    return machines.filter(m => {
      // Must be PUBLISHED or SOLD (if sold option visible)
      if (m.status !== 'PUBLISHED' && m.status !== 'SOLD') return false;

      // Text search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesBrand = m.brand.toLowerCase().includes(query);
        const matchesModel = m.model.toLowerCase().includes(query);
        const matchesDesc = m.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesDesc) return false;
      }

      // Category
      if (filters.category && m.category_id !== filters.category) return false;

      // Brand
      if (filters.brand && m.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;

      // Model
      if (filters.model && !m.model.toLowerCase().includes(filters.model.toLowerCase())) return false;

      // Location
      if (filters.location && !m.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

      // Owner Type
      if (filters.ownerType && m.owner_type !== filters.ownerType) return false;

      // Year Min
      if (filters.yearMin && m.year < parseInt(filters.yearMin, 10)) return false;

      // Year Max
      if (filters.yearMax && m.year > parseInt(filters.yearMax, 10)) return false;

      // Price Max
      if (filters.priceMax && m.price && m.price > parseInt(filters.priceMax, 10)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'year-desc') return b.year - a.year;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [machines, filters, sortBy]);

  return (
    <div className="py-8 bg-agro-cream min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB & PAGE HEADER */}
        <div className="mb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">
            Estoque de Equipamentos
          </span>
          <h1 className="text-3xl font-extrabold text-agro-dark tracking-tight mt-1">
            Catálogo de Máquinas Agrícolas
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Exibindo tratores, colheitadeiras, plantadeiras e implementos disponíveis para negociação.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* RESULTS HEADER & SORTING */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm mb-8 text-left">
          <div className="flex items-center gap-2 text-sm font-bold text-agro-dark">
            <Layers className="w-4 h-4 text-agro-leaf" />
            <span>{filteredMachines.length} {filteredMachines.length === 1 ? 'máquina encontrada' : 'máquinas encontradas'}</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-800 px-3 py-2 focus:ring-1 focus:ring-agro-leaf focus:outline-none"
            >
              <option value="recent">Mais Recentes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="year-desc">Ano mais Novo</option>
            </select>

            {(filters.search || filters.category || filters.brand || filters.ownerType || filters.priceMax) && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-2 rounded-lg border border-rose-200"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* CATALOG GRID */}
        {filteredMachines.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 shadow-sm my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-agro-cream text-agro-leaf mx-auto flex items-center justify-center">
              <Tractor className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-agro-dark">Nenhuma máquina encontrada</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Tente alterar os termos de busca ou remover alguns filtros aplicados.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-agro-leaf text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Ver todas as máquinas</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMachines.map(machine => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onSelect={onSelectMachine}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
