import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, Clock, DollarSign, EyeOff, Users, Heart, 
  Activity, Plus, ArrowRight, ShieldCheck, UserCheck 
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenAddModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab, onOpenAddModal }) => {
  const { machines, advertisers, interests, activityLogs, adminGlobalSearch } = useApp();

  const activeMachines = machines.filter(m => m.status === 'APPROVED');
  const pendingMachines = machines.filter(m => m.status === 'PENDING');
  const soldMachines = machines.filter(m => m.status === 'SOLD');
  const hiddenMachines = machines.filter(m => m.status === 'HIDDEN');
  const totalAdvertisers = advertisers.length;
  const totalInterests = interests.length;

  // Filter logs if admin global search is active
  const filteredLogs = activityLogs.filter(log => {
    if (!adminGlobalSearch) return true;
    const q = adminGlobalSearch.toLowerCase();
    return log.user.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || (log.target_name && log.target_name.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">Visão Geral do Sistema</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-agro-dark">Dashboard Administrativo</h1>
          <p className="text-xs text-gray-500">Métricas completas do catálogo, anunciantes, vendas e atividades recentes.</p>
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

      {/* DASHBOARD RESUMO CARDS (6 CARDS AS SPECIFIED) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* 1. MÁQUINAS ATIVAS */}
        <div 
          onClick={() => onNavigateTab('machines')}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500">Máquinas Ativas</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-agro-dark">{activeMachines.length}</span>
            <span className="text-[10px] text-emerald-600 font-bold block">No site público</span>
          </div>
        </div>

        {/* 2. MÁQUINAS PENDENTES */}
        <div 
          onClick={() => onNavigateTab('machines')}
          className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
            pendingMachines.length > 0 ? 'border-amber-400 bg-amber-50/20' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500">Aguardando Aprovação</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-amber-600">{pendingMachines.length}</span>
            <span className="text-[10px] text-amber-700 font-bold block">Pendente moderação</span>
          </div>
        </div>

        {/* 3. MÁQUINAS VENDIDAS */}
        <div 
          onClick={() => onNavigateTab('vendas')}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500">Máquinas Vendidas</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-agro-dark">{soldMachines.length}</span>
            <span className="text-[10px] text-purple-700 font-bold block">Histórico de vendas</span>
          </div>
        </div>

        {/* 4. MÁQUINAS OCULTAS */}
        <div 
          onClick={() => onNavigateTab('machines')}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500">Máquinas Ocultas</span>
            <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
              <EyeOff className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-gray-700">{hiddenMachines.length}</span>
            <span className="text-[10px] text-gray-500 font-bold block">Ocultas pelo admin</span>
          </div>
        </div>

        {/* 5. TOTAL DE ANUNCIANTES */}
        <div 
          onClick={() => onNavigateTab('advertisers')}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500">Total Anunciantes</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-agro-dark">{totalAdvertisers}</span>
            <span className="text-[10px] text-blue-700 font-bold block">Cadastrados no sistema</span>
          </div>
        </div>

        {/* 6. TOTAL DE INTERESSADOS */}
        <div 
          onClick={() => onNavigateTab('interests')}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500">Total Interessados</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-rose-600">{totalInterests}</span>
            <span className="text-[10px] text-rose-700 font-bold block">Formulários enviados</span>
          </div>
        </div>

      </div>

      {/* LISTA DE ATIVIDADES RECENTES */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-agro-cream text-agro-leaf">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-agro-dark">Atividades Recentes do Sistema</h2>
              <p className="text-xs text-gray-500">Histórico de ações de interessados, anunciantes e alterações administrativas.</p>
            </div>
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-500">
            Nenhuma atividade registrada no momento.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredLogs.slice(0, 10).map(log => (
              <div key={log.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-agro-leaf mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-extrabold text-agro-dark">{log.user}</span>{' '}
                    <span className="text-gray-700">{log.action}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 text-gray-400 font-semibold text-[11px]">
                  <span>{log.date_str} às {log.time_str}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
