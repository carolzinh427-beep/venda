import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Machine } from '../../types';
import { DollarSign, ShieldCheck, UserCheck, Calendar, Clock, FileText, Search, Tag } from 'lucide-react';

export const AdminVendas: React.FC = () => {
  const { machines, adminGlobalSearch } = useApp();

  const soldMachines = machines.filter(m => {
    if (m.status !== 'SOLD') return false;
    if (adminGlobalSearch) {
      const q = adminGlobalSearch.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchBrand = m.brand.toLowerCase().includes(q);
      const matchAdv = (m.advertiser_name || '').toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchAdv) return false;
    }
    return true;
  });

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const calculateFee = (price?: number | null, pct: number = 1) => {
    if (!price || price <= 0) return 'Sob consulta';
    const feeVal = (price * pct) / 100;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(feeVal);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Histórico de Conclusão</span>
        <h1 className="text-2xl font-extrabold text-agro-dark">Controle de Máquinas Vendidas</h1>
        <p className="text-xs text-gray-500">Histórico de máquinas comercializadas, cálculo administrativo de comissão e registro de datas.</p>
      </div>

      {soldMachines.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 shadow-sm space-y-3">
          <DollarSign className="w-10 h-10 text-purple-600 mx-auto" />
          <h3 className="text-lg font-extrabold text-agro-dark">Nenhuma máquina marcada como vendida até o momento</h3>
        </div>
      ) : (
        <div className="space-y-6">
          {soldMachines.map(machine => {
            const feePct = machine.fee_percentage || (machine.fee_type === 'AGENCY' ? 2 : 1);
            const feeValFormatted = calculateFee(machine.price, feePct);

            return (
              <div 
                key={machine.id}
                className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-sm space-y-4 hover:shadow-md transition-all"
              >
                
                {/* TOP BAR */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                      VENDIDA
                    </span>
                    {machine.source_type === 'admin' ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Máquina Própria (Admin)
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> Anunciante Terceiro
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 font-semibold flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>Vendido em: <strong>{machine.sold_at || new Date(machine.updated_at).toLocaleDateString('pt-BR')}</strong></span>
                    {machine.sold_time && <span>às {machine.sold_time}</span>}
                  </div>
                </div>

                {/* MACHINE CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  <div className="md:col-span-3 h-36 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={machine.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="md:col-span-9 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-agro-leaf uppercase">{machine.brand} • {machine.model}</span>
                      <h3 className="text-lg font-extrabold text-agro-dark">{machine.name}</h3>
                      <p className="text-xs text-gray-500">
                        <strong>Anunciante Responsável:</strong> {machine.advertiser_name || 'Administração'} ({machine.advertiser_whatsapp || 'Atendimento Central'})
                      </p>
                    </div>

                    {/* FEE CALCULATION BOX (REQUISITO 10: TAXA DE VENDA) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-purple-800 uppercase block">Preço de Venda</span>
                        <span className="font-extrabold text-agro-dark text-base">{formatPrice(machine.price)}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-purple-800 uppercase block">Modalidade & Percentual</span>
                        <span className="font-bold text-purple-900 text-sm">
                          {machine.fee_type === 'AGENCY' ? 'Agenciamento (2%)' : 'Anúncio Grupo (1%)'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-purple-800 uppercase block">Valor da Taxa Calculada</span>
                        <span className="font-black text-purple-700 text-base">{feeValFormatted}</span>
                      </div>
                    </div>

                    {machine.sold_notes && (
                      <p className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                        <strong>Observações da venda:</strong> "{machine.sold_notes}"
                      </p>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
