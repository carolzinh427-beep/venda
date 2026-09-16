import React from 'react';
import { Target, Users, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WhyListSectionProps {
  onNavigateAnnounce: () => void;
}

export const WhyListSection: React.FC<WhyListSectionProps> = ({ onNavigateAnnounce }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-agro-dark to-[#08170F] text-white relative overflow-hidden border-t border-agro-leaf/30">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-agro-leaf/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-agro-accent bg-agro-accent/10 border border-agro-accent/30 px-3.5 py-1 rounded-full">
            Alcanço em Todo o Brasil
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
            Coloque sua máquina na frente de quem procura
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Alcance produtores rurais, prestadores de serviço e investidores do agronegócio ativamente interessados na compra de tratores e implementos.
          </p>
        </div>

        {/* BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-agro-leaf/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-agro-leaf/40 text-emerald-400 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-2">Divulgação especializada</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Foco exclusivo no mercado agrícola, sem poluição de anúncios irrelevantes.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-agro-leaf/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-agro-leaf/40 text-emerald-400 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-2">Público do agronegócio</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Rede formada por compradores qualificados com poder de decisão imediato.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-agro-leaf/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-agro-leaf/40 text-emerald-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-2">Processo simples</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Formulário intuitivo de envio com suporte a múltiplas fotos e especificações.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-agro-leaf/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-agro-leaf/40 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-2">Acompanhamento de contatos</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Acompanhamos as propostas e garantimos a intermediação transparente da negociação.
            </p>
          </div>

        </div>

        {/* MODALITIES COMPARISON CARDS */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* OPTION 1: GROUP AD */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:bg-white/10 transition-all relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-3 py-1 rounded-full">
                  Opção 01
                </span>
                <span className="text-2xl font-black text-emerald-400">1%</span>
              </div>

              <h3 className="text-xl font-extrabold mb-2 text-white">Anúncio no Grupo</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Você anuncia sua máquina no grupo e recebe os contatos dos interessados. Taxa de 1% sobre a máquina vendida.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-200 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Publicação no catálogo oficial e grupos de compradores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Recebimento direto dos contatos de compradores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Taxa de 1% paga após a conclusão da venda</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onNavigateAnnounce}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Quero anunciar no grupo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* OPTION 2: FULL AGENCY */}
          <div className="bg-gradient-to-br from-agro-green/80 to-agro-dark border-2 border-agro-accent/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            
            <div className="absolute -top-3 right-6 bg-agro-accent text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">
              Recomendado
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-950/80 border border-amber-700/50 px-3 py-1 rounded-full">
                  Opção 02
                </span>
                <span className="text-2xl font-black text-amber-400">2%</span>
              </div>

              <h3 className="text-xl font-extrabold mb-2 text-white">Venda por Agenciamento</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Se preferir, podemos realizar a venda e intermediar a negociação da sua máquina. Taxa de 2% sobre a máquina vendida.
              </p>

              <ul className="space-y-2.5 text-xs text-gray-200 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Intermediação comercial completa com especialistas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Filtragem técnica de propostas e atendimento</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Taxa de 2% paga exclusivamente na conclusão</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onNavigateAnnounce}
              className="w-full bg-gradient-to-r from-agro-accent to-amber-600 hover:from-amber-600 hover:to-agro-accent text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Quero que vocês vendam</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
