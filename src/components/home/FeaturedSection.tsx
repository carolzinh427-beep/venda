import React from 'react';
import { useApp } from '../../context/AppContext';
import { MachineCard } from '../machines/MachineCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedSectionProps {
  onSelectMachine: (id: string) => void;
  onNavigateCatalog: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onSelectMachine, onNavigateCatalog }) => {
  const { machines } = useApp();

  const featuredMachines = machines
    .filter(m => m.status === 'PUBLISHED')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 6);

  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-agro-accent mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Oportunidades em Destaque</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-agro-dark tracking-tight">
              Máquinas em destaque
            </h2>
          </div>

          <button
            onClick={onNavigateCatalog}
            className="inline-flex items-center gap-2 text-sm font-bold text-agro-leaf hover:text-agro-dark transition-colors group"
          >
            <span>Ver todo o estoque ({machines.filter(m => m.status === 'PUBLISHED').length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARDS GRID */}
        {featuredMachines.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Nenhuma máquina cadastrada no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredMachines.map((machine) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onSelect={onSelectMachine}
              />
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateCatalog}
            className="inline-flex items-center justify-center gap-2 bg-agro-cream hover:bg-agro-surface text-agro-dark font-extrabold text-sm px-8 py-4 rounded-xl border border-agro-leaf/30 shadow-sm transition-all hover:shadow-md"
          >
            <span>Explorar catálogo completo de tratores e implementos</span>
            <ArrowRight className="w-4 h-4 text-agro-leaf" />
          </button>
        </div>

      </div>
    </section>
  );
};
