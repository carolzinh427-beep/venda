import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InterestStatus } from '../../types';
import { Heart, MessageCircle, CheckCircle, Clock, Search, Filter, ShieldCheck, UserCheck } from 'lucide-react';

export const AdminInterests: React.FC = () => {
  const { interests, machines, updateInterestStatus, settings } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | InterestStatus>('ALL');

  const filteredInterests = interests.filter(i => {
    if (filterStatus !== 'ALL' && i.status !== filterStatus) return false;
    return true;
  });

  const getStatusBadge = (status: InterestStatus) => {
    switch (status) {
      case 'NEW':
        return <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-rose-300">Novo</span>;
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
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Leads Comercial</span>
          <h1 className="text-2xl font-extrabold text-agro-dark">Interesses Registrados</h1>
          <p className="text-xs text-gray-500">Acompanhe e inicie conversa no WhatsApp com os clientes que demonstraram interesse nas máquinas.</p>
        </div>

        {/* STATUS FILTER TABS */}
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

          <button
            onClick={() => setFilterStatus('COMPLETED')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'COMPLETED' ? 'bg-emerald-700 text-white' : 'text-gray-600'
            }`}
          >
            Concluídos ({interests.filter(i => i.status === 'COMPLETED').length})
          </button>
        </div>
      </div>

      {/* LIST OF INTEREST LEADS */}
      {filteredInterests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 shadow-sm my-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-agro-dark">Nenhum interesse registrado no filtro</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInterests.map(item => {
            const machine = machines.find(m => m.id === item.machine_id);
            const cleanWa = item.whatsapp.replace(/\D/g, '');
            const waMessage = `Olá ${item.name}! Vi que você demonstrou interesse no anúncio "${item.machine_name}" na plataforma ${settings.company_name}. Como posso ajudar com fotos, ficha técnica ou proposta?`;
            const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* TOP BADGES */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    {getStatusBadge(item.status)}
                    <span className="text-[11px] text-gray-400 font-semibold">
                      {new Date(item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* BUYER INFO */}
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-agro-dark">{item.name}</h3>
                    <p className="text-xs text-gray-700 font-medium">
                      <strong>WhatsApp:</strong> <span className="font-bold text-emerald-700">{item.whatsapp}</span>
                    </p>
                    {item.email && (
                      <p className="text-xs text-gray-600">
                        <strong>E-mail:</strong> {item.email}
                      </p>
                    )}
                  </div>

                  {/* MACHINE CONTEXT */}
                  <div className="mt-3 p-3 bg-agro-cream rounded-2xl border border-agro-leaf/20 space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Máquina Desejada</span>
                    <span className="text-xs font-extrabold text-agro-dark block leading-snug">
                      {item.machine_name}
                    </span>
                    {machine && (
                      <div className="flex items-center gap-2 pt-1 text-[11px]">
                        {machine.owner_type === 'PLATFORM' ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Própria
                          </span>
                        ) : (
                          <span className="text-amber-800 font-bold flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Vendedor Terceiro
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* MESSAGE IF ANY */}
                  {item.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl text-xs text-gray-700 italic border border-gray-200">
                      "{item.message}"
                    </div>
                  )}
                </div>

                {/* ACTIONS BAR */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2">
                  
                  {/* WHATSAPP ACTION BUTTON */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  {/* STATUS SELECTOR BUTTONS */}
                  {item.status === 'NEW' && (
                    <button
                      onClick={() => updateInterestStatus(item.id, 'CONTACTED')}
                      className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs py-2.5 rounded-xl border border-amber-300 transition-colors"
                    >
                      Marcar em Contato
                    </button>
                  )}

                  {item.status !== 'COMPLETED' && (
                    <button
                      onClick={() => updateInterestStatus(item.id, 'COMPLETED')}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-xl transition-colors"
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
