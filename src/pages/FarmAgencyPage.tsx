import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Phone, ArrowLeft, ShieldCheck, CheckCircle2, Award, Landmark, MapPin } from 'lucide-react';

interface FarmAgencyPageProps {
  onBackToHome: () => void;
}

export const FarmAgencyPage: React.FC<FarmAgencyPageProps> = ({ onBackToHome }) => {
  const { settings } = useApp();

  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const waText = `Olá! Gostaria de consultar informações sobre o Agenciamento de Lavouras e Propriedades Rurais com a ${settings.company_name}.`;
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="py-10 bg-agro-cream min-h-screen text-agro-graphite animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP BACK */}
        <div className="text-left">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-agro-leaf hover:text-agro-dark bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Página Inicial</span>
          </button>
        </div>

        {/* HERO CARD */}
        <div className="bg-gradient-to-br from-agro-dark via-agro-green to-[#07190F] rounded-3xl p-8 sm:p-12 text-white text-left relative overflow-hidden shadow-2xl border border-agro-leaf/40">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-agro-leaf/40 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-agro-accent" />
                <span>Serviço Premium de Negociação Agrícola</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {settings.farm_agency_title || "Agenciamento de Lavouras e Propriedades Rurais"}
              </h1>

              <p className="text-base text-gray-200 leading-relaxed">
                {settings.farm_agency_description || "Intermediamos a compra e venda de lavouras e propriedades rurais com discrição, análise técnica e alcance em todo o Brasil."}
              </p>

              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar com o Corretor Responsável</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/20 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Lavoura e Agronegócio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* SERVICE DIFFERENTIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-agro-cream text-agro-leaf flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-agro-dark">Sigilo e Confidencialidade</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tratamos os dados da sua lavoura ou propriedade rural com total confidencialidade técnica e comercial.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-agro-cream text-agro-leaf flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-agro-dark">Valuation e Análise de Solo</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Avaliamos o potencial produtivo da lavoura, topografia, irrigação e infraestrutura existente.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-agro-cream text-agro-leaf flex items-center justify-center font-bold">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-agro-dark">Assessoria Jurídica Rural</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Verificação completa de certidões, georreferenciamento, CAR e regularidade documental da propriedade.
            </p>
          </div>

        </div>

        {/* CONTACT BOX */}
        <div className="bg-white rounded-3xl p-8 border border-agro-leaf/20 shadow-lg text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase text-agro-leaf">Agende uma Consulta</span>
            <h3 className="text-xl font-extrabold text-agro-dark">Quer vender ou agenciar sua lavoura?</h3>
            <p className="text-xs text-gray-600">Nossa equipe realiza o atendimento pessoal e presencial.</p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-sm px-8 py-4 rounded-xl shadow transition-colors shrink-0 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Falar no WhatsApp ({settings.phone})</span>
          </a>
        </div>

      </div>
    </div>
  );
};
