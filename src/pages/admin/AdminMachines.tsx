import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Machine, MachineStatus, SourceType } from '../../types';
import { 
  CheckCircle2, XCircle, Edit, EyeOff, DollarSign, Plus, 
  ShieldCheck, UserCheck, Filter, Search, Phone, Calendar 
} from 'lucide-react';

interface AdminMachinesProps {
  onOpenForm: (machine?: Machine) => void;
  initialStatusFilter?: string;
  filterSourceType?: 'ALL' | 'admin' | 'advertiser';
}

export const AdminMachines: React.FC<AdminMachinesProps> = ({ 
  onOpenForm, 
  initialStatusFilter = 'ALL',
  filterSourceType = 'ALL' 
}) => {
  const { 
    machines, categories, advertisers, approveMachine, 
    rejectMachine, hideMachine, markMachineAsSold, adminGlobalSearch 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [sourceFilter, setSourceFilter] = useState<'ALL' | 'admin' | 'advertiser'>(filterSourceType);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [advertiserFilter, setAdvertiserFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [localSearch, setLocalSearch] = useState<string>('');

  const filteredMachines = useMemo(() => {
    return machines.filter(m => {
      // Status filter
      if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;

      // Source filter
      if (sourceFilter !== 'ALL' && m.source_type !== sourceFilter) return false;

      // Category filter
      if (categoryFilter && m.category_id !== categoryFilter) return false;

      // Advertiser filter
      if (advertiserFilter && m.advertiser_id !== advertiserFilter) return false;

      // Location filter
      if (locationFilter) {
        const loc = (m.location || `${m.city}/${m.state}`).toLowerCase();
        if (!loc.includes(locationFilter.toLowerCase())) return false;
      }

      // Search term (local or global admin search)
      const q = (localSearch || adminGlobalSearch).toLowerCase();
      if (q) {
        const nameMatch = m.name.toLowerCase().includes(q);
        const brandMatch = m.brand.toLowerCase().includes(q);
        const modelMatch = m.model.toLowerCase().includes(q);
        const advMatch = (m.advertiser_name || '').toLowerCase().includes(q);
        const cityMatch = (m.city || '').toLowerCase().includes(q);
        const phoneMatch = (m.advertiser_whatsapp || '').includes(q);
        if (!nameMatch && !brandMatch && !modelMatch && !advMatch && !cityMatch && !phoneMatch) return false;
      }

      return true;
    });
  }, [machines, statusFilter, sourceFilter, categoryFilter, advertiserFilter, locationFilter, localSearch, adminGlobalSearch]);

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusBadge = (status: MachineStatus) => {
    switch (status) {
      case 'APPROVED':
      case 'PUBLISHED':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-emerald-300">Aprovado (Ativo)</span>;
      case 'PENDING':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-amber-300">Pendente</span>;
      case 'REJECTED':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-rose-300">Rejeitado</span>;
      case 'SOLD':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-purple-300">Vendido</span>;
      case 'HIDDEN':
      case 'INACTIVE':
        return <span className="bg-gray-100 text-gray-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-gray-300">Oculto</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">Catálogo Geral</span>
          <h1 className="text-2xl font-extrabold text-agro-dark">Controle Total de Máquinas</h1>
          <p className="text-xs text-gray-500">Visualize todas as máquinas cadastradas, altere status e efetue moderação.</p>
        </div>

        <button
          onClick={() => onOpenForm()}
          className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-xs px-4 py-3 rounded-xl shadow transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Cadastrar Máquina</span>
        </button>
      </div>

      {/* ADVANCED FILTERS PANEL */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          
          {/* STATUS */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
            >
              <option value="ALL">Todos os Status ({machines.length})</option>
              <option value="APPROVED">Aprovados / Ativos ({machines.filter(m => m.status === 'APPROVED' || m.status === 'PUBLISHED').length})</option>
              <option value="PENDING">Pendentes ({machines.filter(m => m.status === 'PENDING').length})</option>
              <option value="SOLD">Vendidas ({machines.filter(m => m.status === 'SOLD').length})</option>
              <option value="HIDDEN">Ocultas ({machines.filter(m => m.status === 'HIDDEN').length})</option>
              <option value="REJECTED">Rejeitadas ({machines.filter(m => m.status === 'REJECTED').length})</option>
            </select>
          </div>

          {/* SOURCE */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Origem</label>
            <select
              value={sourceFilter}
              onChange={(e: any) => setSourceFilter(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
            >
              <option value="ALL">Todas as Origens</option>
              <option value="admin">Minhas Máquinas (Admin)</option>
              <option value="advertiser">Terceiros (Anunciante)</option>
            </select>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Categoria</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
            >
              <option value="">Todas as Categorias</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* ADVERTISER */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Anunciante</label>
            <select
              value={advertiserFilter}
              onChange={(e) => setAdvertiserFilter(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
            >
              <option value="">Todos os Anunciantes</option>
              {advertisers.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Cidade / Estado</label>
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Ex: Linhares, PR, GO"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
            />
          </div>

          {/* LOCAL SEARCH */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Busca Textual</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Nome, marca..."
                className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs"
              />
            </div>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-agro-cream text-gray-700 font-extrabold uppercase border-b border-gray-200">
              <tr>
                <th className="p-4">Máquina</th>
                <th className="p-4">Marca / Modelo</th>
                <th className="p-4">Ano / Horas</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Cidade / UF</th>
                <th className="p-4">Anunciante Responsável</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Ações Administrativas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredMachines.map(machine => {
                const categoryObj = categories.find(c => c.id === machine.category_id);

                return (
                  <tr key={machine.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* MACHINE */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={machine.images[0]} 
                          alt="" 
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0" 
                        />
                        <div>
                          <span className="font-extrabold text-agro-dark text-sm block leading-tight">
                            {machine.name}
                          </span>
                          <span className="text-[10px] text-agro-leaf font-bold uppercase">
                            {categoryObj?.name || 'Geral'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* BRAND / MODEL */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900 block">{machine.brand}</span>
                      <span className="text-gray-500 text-[11px]">{machine.model}</span>
                    </td>

                    {/* YEAR / HOURS */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="block font-bold text-gray-800">{machine.year}</span>
                      <span className="text-gray-500 text-[11px]">{machine.hours ? `${machine.hours.toLocaleString('pt-BR')} hrs` : 'N/I'}</span>
                    </td>

                    {/* PRICE */}
                    <td className="p-4 whitespace-nowrap">
                      <span className={`font-bold ${machine.price ? 'text-agro-dark' : 'text-amber-600'}`}>
                        {formatPrice(machine.price)}
                      </span>
                      <span className="block text-[10px] text-gray-400 font-bold">
                        Taxa: {machine.fee_percentage}% ({machine.fee_type === 'AGENCY' ? 'Agência' : 'Grupo'})
                      </span>
                    </td>

                    {/* CITY / STATE */}
                    <td className="p-4 whitespace-nowrap font-medium text-gray-700">
                      {machine.city ? `${machine.city} / ${machine.state}` : machine.location}
                    </td>

                    {/* ANUNCIANTE RESPONSÁVEL */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="font-bold text-agro-dark block">
                          {machine.advertiser_name || machine.seller_name || 'Administração'}
                        </span>
                        {(machine.advertiser_whatsapp || machine.seller_whatsapp) && (
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            {machine.advertiser_whatsapp || machine.seller_whatsapp}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 block">
                          Cadastrado em {new Date(machine.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="p-4 whitespace-nowrap">
                      {getStatusBadge(machine.status)}
                    </td>

                    {/* AÇÕES: APROVAR, REJEITAR, EDITAR, OCULTAR, MARCAR COMO VENDIDA */}
                    <td className="p-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        
                        {/* EDIT */}
                        <button
                          onClick={() => onOpenForm(machine)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
                          title="Editar anúncio"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* APPROVE */}
                        {machine.status !== 'APPROVED' && machine.status !== 'PUBLISHED' && (
                          <button
                            onClick={() => approveMachine(machine.id)}
                            className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg"
                            title="Aprovar anúncio"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* REJECT */}
                        {machine.status !== 'REJECTED' && (
                          <button
                            onClick={() => rejectMachine(machine.id)}
                            className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg"
                            title="Rejeitar anúncio"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* HIDE */}
                        {machine.status !== 'HIDDEN' && (
                          <button
                            onClick={() => hideMachine(machine.id)}
                            className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
                            title="Ocultar do site público"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        )}

                        {/* MARK AS SOLD */}
                        {machine.status !== 'SOLD' && (
                          <button
                            onClick={() => {
                              const notes = prompt(`Marcar "${machine.name}" como VENDIDA. Insira observações (opcional):`);
                              if (notes !== null) {
                                markMachineAsSold(machine.id, notes);
                              }
                            }}
                            className="p-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg"
                            title="Marcar como vendida"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
