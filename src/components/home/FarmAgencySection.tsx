import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Phone, ArrowRight, Shield } from 'lucide-react';

interface FarmAgencySectionProps {
  onNavigateAgencyPage: () => void;
}

export const FarmAgencySection: React.FC<FarmAgencySectionProps> = ({ onNavigateAgencyPage }) => {
  const { settings } = useApp();

  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre o Agenciamento de Lavouras e Propriedades Rurais.')}`;

  return (
    <section className="py-16 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-agro-dark via-agro-green to-[#0D3622] rounded-3xl overflow-hidden shadow-2xl border border-agro-leaf/40 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* LEFT CONTENT */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 bg-agro-leaf/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-agro-accent" />
                <span>Serviço Especializado de Negociação</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {settings.farm_agency_title || "Agenciamento de Lavouras e Propriedades Rurais"}
              </h2>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                {settings.farm_agency_description || "Intermediamos a compra e venda de lavouras e propriedades rurais com discrição, análise técnica e alcance em todo o Brasil. Conectamos vendedores a compradores qualificados."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-emerald-200">
                <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/10">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sigilo e Discrição Comercial</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/10">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Análise de Aptidão Agrícola</span>
                </div>
              </div>

              {/* CTAS */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar com o Especialista</span>
                </a>

                <button
                  onClick={onNavigateAgencyPage}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <span>Conhecer o Serviço</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* RIGHT VISUAL */}
            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="Lavoura e Plantação Rurais"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-agro-dark via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-agro-dark/80 backdrop-blur-md rounded-2xl border border-white/10 text-xs">
                <span className="text-agro-accent font-extrabold uppercase block text-[10px] mb-1">Agenciamento de Terras</span>
                <p className="font-semibold text-white">Avaliação precisa, consultoria de valuation e rede nacional de compradores de lavouras.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
