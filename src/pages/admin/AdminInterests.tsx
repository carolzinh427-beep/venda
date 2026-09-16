import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InterestStatus } from '../../types';
import { Heart, MessageCircle, Phone, Calendar, Clock, Filter, Search, UserCheck } from 'lucide-react';

export const AdminInterests: React.FC = () => {
  const { interests, machines, advertisers, updateInterestStatus, settings, adminGlobalSearch } = useApp();
  
  const [filterMachine, setFilterMachine] = useState<string>('');
  const [filterAdvertiser, setFilterAdvertiser] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredInterests = interests.filter(item => {
    // Status filter
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;

    // Machine filter
    if (filterMachine && item.machine_id !== filterMachine) return false;

    // Advertiser filter
    if (filterAdvertiser) {
      const advName = (item.advertiser_name || '').toLowerCase();
      if (!advName.includes(filterAdvertiser.toLowerCase()) && item.advertiser_id !== filterAdvertiser) return false;
    }

    // Global admin search or local search
    if (adminGlobalSearch) {
      const q = adminGlobalSearch.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(q);
      const machineMatch = item.machine_name.toLowerCase().includes(q);
      const advMatch = (item.advertiser_name || '').toLowerCase().includes(q);
      const waMatch = item.whatsapp.includes(q);
      if (!nameMatch && !machineMatch && !advMatch && !waMatch) return false;
    }

    return true;
  });

  const getStatusBadge = (status: InterestStatus) => {
    switch (status) {
      case 'NEW':
        return <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-rose-300">Novo Lead</span>;
      case 'CONTACTED':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-amber-300">Em Contato</span>;
      case 'COMPLETED':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-emerald-300">Concluído</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Compradores Qualificados</span>
          <h1 className="text-2xl font-extrabold text-agro-dark">Controle de Interessados</h1>
          <p className="text-xs text-gray-500">Registro de todas as pessoas que clicaram em "Tenho interesse" nas máquinas.</p>
        </div>

        {/* STATUS QUICK TABS */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs font-bold shadow-sm">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'ALL' ? 'bg-agro-dark text-white' : 'text-gray-600'
            }`}
          >
            Todos ({interests.length})
          </button>
          
          <button
            onClick={() => setFilterStatus('NEW')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'NEW' ? 'bg-rose-600 text-white' : 'text-gray-600'
            }`}
          >
            Novos ({interests.filter(i => i.status === 'NEW').length})
          </button>

          <button
            onClick={() => setFilterStatus('CONTACTED')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'CONTACTED' ? 'bg-amber-600 text-white' : 'text-gray-600'
            }`}
          >
            Em Contato ({interests.filter(i => i.status === 'CONTACTED').length})
          </button>
        </div>
      </div>

      {/* FILTERS BY MACHINE AND ADVERTISER */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Filtrar por Máquina</label>
          <select
            value={filterMachine}
            onChange={(e) => setFilterMachine(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
          >
            <option value="">Todas as Máquinas</option>
            {machines.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Filtrar por Anunciante Responsável</label>
          <select
            value={filterAdvertiser}
            onChange={(e) => setFilterAdvertiser(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
          >
            <option value="">Todos os Anunciantes</option>
            {advertisers.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* INTEREST CARDS GRID */}
      {filteredInterests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 shadow-sm my-6 space-y-3">
          <Heart className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="text-lg font-extrabold text-agro-dark">Nenhum interessado encontrado para os filtros selecionados</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInterests.map(item => {
            const cleanWa = item.whatsapp.replace(/\D/g, '');
            const waMessage = `Olá ${item.name}! Vi que você demonstrou interesse na máquina "${item.machine_name}" na plataforma ${settings.company_name}. Como posso te ajudar?`;
            const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    {getStatusBadge(item.status)}
                    <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date_str} às {item.time_str}
                    </span>
                  </div>

                  {/* EXACT FIELDS SPECIFIED IN PROMPT */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">INTERESSADO</span>
                      <span className="font-extrabold text-agro-dark text-base">{item.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">WHATSAPP</span>
                        <span className="font-bold text-emerald-700">{item.whatsapp}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">ANUNCIANTE</span>
                        <span className="font-bold text-gray-800">{item.advertiser_name || 'Administração'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">MÁQUINA</span>
                      <span className="font-extrabold text-agro-dark">{item.machine_name}</span>
                    </div>

                    {item.message && (
                      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-700 italic border border-gray-200 text-xs">
                        "{item.message}"
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>WhatsApp do Interessado</span>
                  </a>

                  {item.status === 'NEW' && (
                    <button
                      onClick={() => updateInterestStatus(item.id, 'CONTACTED')}
                      className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs py-2.5 rounded-xl border border-amber-300"
                    >
                      Marcar em Contato
                    </button>
                  )}

                  {item.status !== 'COMPLETED' && (
                    <button
                      onClick={() => updateInterestStatus(item.id, 'COMPLETED')}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-xl"
                    >
                      Concluir
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
