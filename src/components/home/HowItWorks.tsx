import React, { useState } from 'react';
import { Search, FileText, Heart, PhoneCall, Upload, ShieldCheck, CheckCircle2, Users } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  const buyerSteps = [
    {
      step: 'PASSO 1',
      title: 'Encontre uma máquina',
      desc: 'Utilize nossa busca rápida e filtros avançados para localizar o equipamento ou implemento ideal.',
      icon: <Search className="w-6 h-6 text-agro-accent" />
    },
    {
      step: 'PASSO 2',
      title: 'Veja os detalhes',
      desc: 'Analise fotos em alta resolução, histórico de horas, ano, localização e especificações completas.',
      icon: <FileText className="w-6 h-6 text-agro-accent" />
    },
    {
      step: 'PASSO 3',
      title: 'Clique em Tenho interesse',
      desc: 'Preencha um formulário simples com seu nome e WhatsApp para ser atendido com prioridade.',
      icon: <Heart className="w-6 h-6 text-agro-accent" />
    },
    {
      step: 'PASSO 4',
      title: 'Entre em contato com o responsável',
      desc: 'Alinhe vistoria, proposta comercial e detalhes de frete diretamente com nosso representante.',
      icon: <PhoneCall className="w-6 h-6 text-agro-accent" />
    }
  ];

  const sellerSteps = [
    {
      step: 'PASSO 1',
      title: 'Envie sua máquina',
      desc: 'Preencha o cadastro com fotos, ano, horas e valor desejado. Escolha entre modalidade 1% ou 2%.',
      icon: <Upload className="w-6 h-6 text-amber-400" />
    },
    {
      step: 'PASSO 2',
      title: 'Analisamos o anúncio',
      desc: 'Nossa equipe faz a verificação técnica e de documentação para manter a segurança do catálogo.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />
    },
    {
      step: 'PASSO 3',
      title: 'Publicamos após aprovação',
      desc: 'Sua máquina entra no nosso catálogo oficial e é divulgada para a rede de compradores.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-400" />
    },
    {
      step: 'PASSO 4',
      title: 'Receba interessados',
      desc: 'Receba contatos qualificados ou deixe a negociação 100% por nossa conta (agenciamento).',
      icon: <Users className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <section id="como-funciona" className="py-16 bg-agro-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-agro-leaf bg-agro-leaf/10 px-3 py-1 rounded-full">
            Praticidade & Transparência
          </span>
          <h2 className="text-3xl font-extrabold text-agro-dark tracking-tight mt-3">
            Como funciona a plataforma
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Entenda o passo a passo simplificado para comprar ou vender máquinas agrícolas com segurança.
          </p>

          {/* TOGGLE TABS */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 mt-6 shadow-sm">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === 'buyer'
                  ? 'bg-agro-leaf text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quero Comprar Máquina
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === 'seller'
                  ? 'bg-agro-accent text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quero Vender / Anunciar
            </button>
          </div>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeTab === 'buyer' ? buyerSteps : sellerSteps).map((s, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-agro-card hover:shadow-agro-hover transition-all text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-agro-cream to-transparent rounded-bl-full pointer-events-none"></div>

              <div className="w-12 h-12 rounded-xl bg-agro-dark flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                {s.icon}
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-widest text-agro-leaf bg-agro-leaf/10 px-2.5 py-0.5 rounded">
                {s.step}
              </span>

              <h3 className="text-base font-extrabold text-agro-dark mt-2 mb-2">
                {s.title}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
