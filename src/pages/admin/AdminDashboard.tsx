import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, Clock, ShieldCheck, UserCheck, CheckCircle2, Heart, 
  Handshake, Plus, ArrowRight, MessageCircle, AlertCircle 
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenAddModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab, onOpenAddModal }) => {
  const { machines, announcements, interests, agencyDeals, settings } = useApp();

  const totalPublished = machines.filter(m => m.status === 'PUBLISHED').length;
  const totalPending = announcements.filter(a => a.status === 'PENDING').length;
  const totalPlatform = machines.filter(m => m.owner_type === 'PLATFORM').length;
  const totalThirdParty = machines.filter(m => m.owner_type === 'THIRD_PARTY').length;
  const totalSold = machines.filter(m => m.status === 'SOLD').length;
  const newInterests = interests.filter(i => i.status === 'NEW');

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* TOP TITLE & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">Visão Geral</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-agro-dark">Dashboard Administrativo</h1>
          <p className="text-xs text-gray-500">Resumo comercial de máquinas, anúncios pendentes e potenciais compradores.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-xs px-4 py-3 rounded-xl shadow transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Máquina Própria</span>
          </button>
        </div>
      </div>

      {/* KPI RESUMO CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* PUBLISHED */}
        <div 
          onClick={() => onNavigateTab('maquinas')}
          className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold text-gray-500 block">Máquinas Publicadas</span>
            <span className="text-2xl sm:text-3xl font-black text-agro-dark">{totalPublished}</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">No catálogo público</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* PENDING */}
        <div 
          onClick={() => onNavigateTab('pendentes')}
          className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex items-center justify-between ${
            totalPending > 0 ? 'border-amber-400 bg-amber-50/20' : 'border-gray-200'
          }`}
        >
          <div>
            <span className="text-xs font-bold text-gray-500 block">Anúncios Pendentes</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600">{totalPending}</span>
            <span className="text-[10px] text-amber-700 font-bold block mt-1">Aguardando aprovação</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* NEW INTERESTS */}
        <div 
          onClick={() => onNavigateTab('interesses')}
          className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex items-center justify-between ${
            newInterests.length > 0 ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200'
          }`}
        >
          <div>
            <span className="text-xs font-bold text-gray-500 block">Novos Interessados</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600">{newInterests.length}</span>
            <span className="text-[10px] text-rose-700 font-bold block mt-1">Leads não contactados</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* PLATFORM VS THIRD PARTY */}
        <div 
          onClick={() => onNavigateTab('proprias')}
          className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-bold text-gray-500 block">Próprias / Terceiros</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-agro-dark">{totalPlatform}</span>
              <span className="text-xs font-bold text-gray-400">/ {totalThirdParty}</span>
            </div>
            <span className="text-[10px] text-gray-500 font-bold block mt-1">Modalidade em estoque</span>
          </div>
          <div className="p-3 rounded-xl bg-agro-cream text-agro-leaf">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* NOTIFICAÇÃO ADMINISTRATIVA: NOVOS INTERESSES */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-agro-dark">Notificações: Novos Interessados (Leads)</h2>
              <p className="text-xs text-gray-500">Pessoas que clicaram em "Tenho interesse" nas máquinas.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('interesses')}
            className="text-xs font-bold text-agro-leaf hover:underline flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {newInterests.length === 0 ? (
          <div className="py-6 text-center text-xs text-gray-500 font-medium">
            Nenhum novo interesse pendente de atendimento no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newInterests.slice(0, 4).map(item => {
              const cleanWa = item.whatsapp.replace(/\D/g, '');
              const waMessage = `Olá ${item.name}! Vi que você demonstrou interesse na máquina "${item.machine_name}" na plataforma ${settings.company_name}. Estou à disposição para passar todos os detalhes.`;
              const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;

              return (
                <div key={item.id} className="p-4 bg-agro-cream rounded-2xl border border-agro-leaf/20 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-agro-dark">{item.name}</span>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">Novo</span>
                    </div>

                    <p className="text-xs text-gray-600">
                      <strong>Máquina:</strong> {item.machine_name}
                    </p>

                    <p className="text-xs text-gray-600">
                      <strong>WhatsApp:</strong> {item.whatsapp}
                    </p>

                    {item.message && (
                      <p className="text-xs text-gray-500 italic mt-1 bg-white p-2 rounded-lg border border-gray-200">
                        "{item.message}"
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                      <span>Falar no WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
