import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Advertiser, Machine } from '../../types';
import { Users, Phone, Mail, MapPin, Calendar, Layers, CheckCircle2, DollarSign, X, Eye } from 'lucide-react';

export const AdminAdvertisers: React.FC = () => {
  const { advertisers, machines, updateAdvertiserStatus } = useApp();
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<Advertiser | null>(null);

  const getAdvertiserStats = (advId: string) => {
    const advMachines = machines.filter(m => m.advertiser_id === advId || m.seller_name?.includes(advId));
    const total = advMachines.length;
    const active = advMachines.filter(m => m.status === 'APPROVED').length;
    const sold = advMachines.filter(m => m.status === 'SOLD').length;
    return { advMachines, total, active, sold };
  };

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Base de Vendedores</span>
        <h1 className="text-2xl font-extrabold text-agro-dark">Controle de Anunciantes</h1>
        <p className="text-xs text-gray-500">Visualize todos os anunciantes cadastrados e o estoque individual de cada um.</p>
      </div>

      {/* ADVERTISERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertisers.map(adv => {
          const stats = getAdvertiserStats(adv.id);
          const cleanWa = adv.whatsapp.replace(/\D/g, '');
          const waUrl = `https://wa.me/${cleanWa}`;

          return (
            <div 
              key={adv.id}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-400">ID: {adv.id}</span>
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    adv.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {adv.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <h3 className="font-extrabold text-agro-dark text-base">{adv.name}</h3>

                <div className="mt-2 text-xs space-y-1 text-gray-600">
                  <p className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {adv.whatsapp}
                    </a>
                  </p>
                  {adv.email && (
                    <p className="flex items-center gap-1.5 text-gray-500">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{adv.email}</span>
                    </p>
                  )}
                  {adv.city && (
                    <p className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{adv.city}/{adv.state}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-1.5 text-gray-400 text-[11px] pt-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Cadastrado em {new Date(adv.created_at).toLocaleDateString('pt-BR')}</span>
                  </p>
                </div>

                {/* STATS BADGES */}
                <div className="mt-4 grid grid-cols-3 gap-2 p-3 bg-agro-cream rounded-2xl text-center text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Total</span>
                    <span className="font-black text-agro-dark text-base">{stats.total}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">Ativas</span>
                    <span className="font-black text-emerald-700 text-base">{stats.active}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase block">Vendidas</span>
                    <span className="font-black text-purple-700 text-base">{stats.sold}</span>
                  </div>
                </div>
              </div>

              {/* ACTION: VIEW MACHINES */}
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedAdvertiser(adv)}
                  className="w-full bg-agro-dark hover:bg-agro-green text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver todas as máquinas ({stats.total})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ADVERTISER MACHINES MODAL */}
      {selectedAdvertiser && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-4 text-left shadow-2xl max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-agro-leaf">Estoque do Anunciante</span>
                <h3 className="font-extrabold text-xl text-agro-dark">{selectedAdvertiser.name}</h3>
                <p className="text-xs text-gray-500">WhatsApp: {selectedAdvertiser.whatsapp}</p>
              </div>
              <button 
                onClick={() => setSelectedAdvertiser(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {getAdvertiserStats(selectedAdvertiser.id).advMachines.length === 0 ? (
                <p className="text-xs text-gray-500 py-6 text-center">Nenhuma máquina cadastrada para este anunciante.</p>
              ) : (
                getAdvertiserStats(selectedAdvertiser.id).advMachines.map(m => (
                  <div key={m.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={m.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover border border-gray-300" />
                      <div>
                        <h4 className="font-bold text-sm text-agro-dark leading-tight">{m.name}</h4>
                        <span className="text-xs text-gray-500">{m.brand} {m.model} • Ano {m.year}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-sm block text-agro-dark">{formatPrice(m.price)}</span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        m.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                        m.status === 'SOLD' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
