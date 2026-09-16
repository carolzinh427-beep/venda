import React from 'react';
import { Machine } from '../../types';
import { MapPin, Calendar, Clock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

interface MachineCardProps {
  machine: Machine;
  onSelect: (machineId: string) => void;
  onInterest?: (machine: Machine) => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine, onSelect, onInterest }) => {

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = () => {
    switch (machine.status) {
      case 'SOLD':
        return <span className="bg-rose-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">Vendido</span>;
      case 'NEGOTIATING':
        return <span className="bg-amber-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">Em Negociação</span>;
      case 'PENDING':
        return <span className="bg-amber-500 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">Pendente</span>;
      case 'HIDDEN':
      case 'REJECTED':
        return <span className="bg-gray-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">Indisponível</span>;
      default:
        return <span className="bg-emerald-700 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">Disponível</span>;
    }
  };

  const isPlatformOwned = machine.source_type === 'admin' || machine.owner_type === 'PLATFORM';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-agro-card hover:shadow-agro-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      
      {/* CARD TOP IMAGE */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onSelect(machine.id)}>
        <img
          src={machine.images[0] || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
          alt={machine.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80"></div>

        {/* STATUS BADGE TOP LEFT */}
        <div className="absolute top-3 left-3">
          {getStatusBadge()}
        </div>

        {/* OWNER TYPE BADGE TOP RIGHT */}
        <div className="absolute top-3 right-3">
          {isPlatformOwned ? (
            <span className="bg-agro-dark/90 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Própria</span>
            </span>
          ) : (
            <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-500/40 flex items-center gap-1 shadow-sm">
              <UserCheck className="w-3 h-3 text-amber-400" />
              <span>Terceiro</span>
            </span>
          )}
        </div>

        {/* FEATURED BADGE */}
        {machine.featured && (
          <div className="absolute bottom-3 left-3 bg-agro-accent text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
            Destaque
          </div>
        )}
      </div>

      {/* CARD BODY */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
        <div>
          {/* BRAND & CATEGORY */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-1">
            <span className="text-agro-leaf uppercase tracking-wider font-extrabold">{machine.brand}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">{machine.model}</span>
          </div>

          {/* NAME */}
          <h3 
            onClick={() => onSelect(machine.id)}
            className="text-base font-extrabold text-agro-dark hover:text-agro-leaf transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {machine.name}
          </h3>

          {/* QUICK METRICS GRID */}
          <div className="grid grid-cols-2 gap-2 my-3 py-2 px-2.5 bg-agro-cream rounded-xl text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-agro-leaf shrink-0" />
              <span>Ano {machine.year}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-agro-leaf shrink-0" />
              <span>{machine.hours ? `${machine.hours.toLocaleString('pt-BR')} hrs` : 'N/I'}</span>
            </div>

            <div className="flex items-center gap-1.5 col-span-2 text-gray-600 border-t border-gray-200/60 pt-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-agro-leaf shrink-0" />
              <span className="truncate">{machine.location || `${machine.city}/${machine.state}`}</span>
            </div>
          </div>
        </div>

        {/* PRICE & ACTION */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Valor</span>
            <span className={`font-black text-lg tracking-tight ${
              machine.price ? 'text-agro-dark' : 'text-amber-600 text-sm font-bold'
            }`}>
              {formatPrice(machine.price)}
            </span>
          </div>

          <button
            onClick={() => onSelect(machine.id)}
            className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <span>Ver Máquina</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
