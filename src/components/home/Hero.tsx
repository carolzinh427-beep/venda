import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, PlusCircle, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { settings, machines } = useApp();

  const totalMachines = machines.filter(m => m.status === 'APPROVED' || m.status === 'PUBLISHED').length;

  return (
    <section className="relative bg-agro-dark text-white overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-agro-leaf/20">
      
      {/* BACKGROUND IMAGE OVERLAY WITH GRADIENT MASK */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=2000&q=80" 
          alt="Trator no Campo Agro" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-agro-dark via-agro-dark/95 to-agro-dark/80 z-0"></div>

      {/* AMBIENT GLOW ACCENTS */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-agro-leaf/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-agro-leaf/40 border border-agro-leaf/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300 tracking-wide">
              <Shield className="w-3.5 h-3.5 text-agro-accent" />
              <span>Plataforma Especializada no Agronegócio</span>
            </div>

            {/* MAIN HEADING */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              {settings.hero_title || "Máquinas certas para quem vive do campo."}
            </h1>

            {/* SUBTITLE */}
            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
              {settings.hero_subtitle || "Encontre máquinas e implementos agrícolas à venda ou anuncie seu equipamento para alcançar compradores em todo o Brasil."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/maquinas')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-agro-leaf to-emerald-700 hover:from-emerald-700 hover:to-agro-leaf text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 border border-emerald-500/30"
              >
                <Search className="w-5 h-5 text-emerald-300" />
                <span>Ver Máquinas</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>

              <button
                onClick={() => onNavigate('/anunciar')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-agro-accent to-amber-600 hover:from-amber-600 hover:to-agro-accent text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-agro-glow transition-all transform active:scale-95 border border-amber-400/40"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Quero Anunciar</span>
              </button>
            </div>

            {/* VALUE PROPOSITIONS */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Anúncios Verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atendimento Pessoal</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modalidade 1% e 2%</span>
              </div>
            </div>

          </div>

          {/* RIGHT HERO CARD / VISUAL PREVIEW */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-gradient-to-b from-agro-green/80 to-agro-dark p-2 border border-agro-leaf/40 shadow-2xl">
              
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80" 
                  alt="Trator Agrícola John Deere" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-agro-dark via-transparent to-transparent"></div>
                
                {/* FLOATING BADGE */}
                <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{totalMachines} Máquinas Disponíveis</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider bg-agro-accent text-white px-2 py-0.5 rounded">
                    Destaque da Semana
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Trator John Deere 6110J 4x4</h3>
                  <p className="text-xs text-gray-300">Linhares / ES • 2.450 hrs • Ano 2021</p>
                </div>
              </div>

              {/* CARD BOTTOM BAR */}
              <div className="p-3 flex items-center justify-between bg-agro-dark/90 rounded-b-xl text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Valor de Mercado</span>
                  <span className="text-emerald-400 font-extrabold text-base">R$ 345.000</span>
                </div>
                <button
                  onClick={() => onNavigate('/maquinas')}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors text-xs"
                >
                  Ver Detalhes
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
