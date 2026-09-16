import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tractor, Wheat, Sprout, Droplets, Wrench, Truck, Sliders, Cog, MoreHorizontal 
} from 'lucide-react';

interface CategoriesGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ onSelectCategory }) => {
  const { categories, filters, machines } = useApp();

  // Helper map for lucide icon rendering
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tractor': return <Tractor className="w-6 h-6" />;
      case 'Wheat': return <Wheat className="w-6 h-6" />;
      case 'Sprout': return <Sprout className="w-6 h-6" />;
      case 'Droplets': return <Droplets className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'ScatterPlot': return <Sliders className="w-6 h-6" />;
      case 'Cog': return <Cog className="w-6 h-6" />;
      default: return <MoreHorizontal className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-14 bg-agro-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">
              Navegue por Categoria
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-agro-dark tracking-tight">
              O que você procura hoje?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Selecione uma categoria para filtrar o estoque de máquinas e equipamentos disponíveis.
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3">
          {categories.map((cat) => {
            const count = machines.filter(m => m.category_id === cat.id && m.status === 'PUBLISHED').length;
            const isSelected = filters.category === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id === filters.category ? '' : cat.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all transform active:scale-95 text-center group ${
                  isSelected
                    ? 'bg-agro-green text-white border-agro-leaf shadow-lg ring-2 ring-agro-accent'
                    : 'bg-white text-agro-dark border-gray-200/80 hover:border-agro-leaf/40 hover:shadow-agro-card'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                  isSelected 
                    ? 'bg-white/10 text-agro-accent' 
                    : 'bg-agro-surface text-agro-leaf group-hover:bg-agro-leaf group-hover:text-white'
                }`}>
                  {getIcon(cat.iconName)}
                </div>

                <span className="text-xs font-bold leading-snug line-clamp-1">
                  {cat.name}
                </span>

                <span className={`text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count} {count === 1 ? 'item' : 'itens'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
