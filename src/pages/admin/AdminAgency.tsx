import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AgencyStatus } from '../../types';
import { Handshake, Plus, MessageCircle, FileText, CheckCircle2, Clock, X } from 'lucide-react';

export const AdminAgency: React.FC = () => {
  const { agencyDeals, addAgencyDeal, updateAgencyDealStatus } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dealType, setDealType] = useState<'MACHINE' | 'FARM'>('MACHINE');
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [notes, setNotes] = useState('');

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientName || !clientWhatsapp) return;

    addAgencyDeal({
      title,
      deal_type: dealType,
      client_name: clientName,
      client_whatsapp: clientWhatsapp,
      status: 'NEW',
      notes
    });

    setTitle('');
    setClientName('');
    setClientWhatsapp('');
    setNotes('');
    setModalOpen(false);
  };

  const getStatusLabel = (status: AgencyStatus) => {
    switch (status) {
      case 'NEW': return { text: 'Novo Agenciamento', class: 'bg-blue-100 text-blue-800' };
      case 'PROMOTING': return { text: 'Em Divulgação', class: 'bg-purple-100 text-purple-800' };
      case 'INTERESTED': return { text: 'Interessados', class: 'bg-amber-100 text-amber-800' };
      case 'NEGOTIATING': return { text: 'Em Negociação', class: 'bg-orange-100 text-orange-800' };
      case 'SOLD': return { text: 'Vendido', class: 'bg-emerald-100 text-emerald-800' };
      case 'CANCELLED': return { text: 'Cancelado', class: 'bg-rose-100 text-rose-800' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Intermediação e Valuation</span>
          <h1 className="text-2xl font-extrabold text-agro-dark">Acompanhamento de Agenciamento</h1>
          <p className="text-xs text-gray-500">Acompanhe o funil comercial de máquinas e lavouras agenciadas.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Agenciamento</span>
        </button>
      </div>

      {/* DEALS GRID */}
      {agencyDeals.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 shadow-sm space-y-3">
          <Handshake className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="text-lg font-extrabold text-agro-dark">Nenhum processo de agenciamento em andamento</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencyDeals.map(deal => {
            const st = getStatusLabel(deal.status);
            const cleanWa = deal.client_whatsapp.replace(/\D/g, '');
            const waUrl = `https://wa.me/${cleanWa}`;

            return (
              <div 
                key={deal.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${st.class}`}>
                      {st.text}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {deal.deal_type === 'FARM' ? 'Agenciamento de Lavoura' : 'Agenciamento de Máquina'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-agro-dark text-base">{deal.title}</h3>
                  
                  <div className="mt-2 text-xs space-y-1 text-gray-600">
                    <p><strong>Cliente:</strong> {deal.client_name}</p>
                    <p><strong>WhatsApp:</strong> <span className="font-bold text-emerald-700">{deal.client_whatsapp}</span></p>
                  </div>

                  {deal.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl text-xs text-gray-700 border border-gray-200">
                      <span className="font-bold block text-[10px] text-gray-400">Observações Comerciais:</span>
                      <p>{deal.notes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Alterar Status:</label>
                    <select
                      value={deal.status}
                      onChange={(e: any) => updateAgencyDealStatus(deal.id, e.target.value)}
                      className="flex-1 p-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold"
                    >
                      <option value="NEW">Novo Agenciamento</option>
                      <option value="PROMOTING">Em Divulgação</option>
                      <option value="INTERESTED">Interessados</option>
                      <option value="NEGOTIATING">Em Negociação</option>
                      <option value="SOLD">Vendido</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp do Cliente</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* CREATE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-agro-dark">Cadastrar Processo de Agenciamento</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Título do Negócio *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Agenciamento Fazenda 200 Hectares"
                  className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Tipo de Negócio</label>
                <select
                  value={dealType}
                  onChange={(e: any) => setDealType(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs"
                >
                  <option value="MACHINE">Máquina / Implemento</option>
                  <option value="FARM">Lavoura / Propriedade Rural</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Nome do Cliente *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Roberto Alvarenga"
                  className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">WhatsApp com DDD *</label>
                <input
                  type="tel"
                  required
                  value={clientWhatsapp}
                  onChange={(e) => setClientWhatsapp(e.target.value)}
                  placeholder="Ex: (27) 99888-7777"
                  className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Observações Inicial</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detalhes sobre localização, comissão acordada..."
                  className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-100 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Salvar Agenciamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
