import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Machine, OwnerType } from '../../types';
import { 
  Plus, Edit, Trash2, ShieldCheck, UserCheck, Star, 
  CheckCircle, RefreshCw, Eye, Search, AlertTriangle 
} from 'lucide-react';

interface AdminMachinesProps {
  onOpenForm: (machine?: Machine, defaultOwnerType?: OwnerType) => void;
  filterOwnerType?: 'ALL' | 'PLATFORM' | 'THIRD_PARTY';
}

export const AdminMachines: React.FC<AdminMachinesProps> = ({ onOpenForm, filterOwnerType = 'ALL' }) => {
  const { machines, setMachineStatus, deleteMachine, toggleMachineFeatured } = useApp();
  const [selectedOwnerFilter, setSelectedOwnerFilter] = useState<'ALL' | 'PLATFORM' | 'THIRD_PARTY'>(filterOwnerType);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMachines = machines.filter(m => {
    if (selectedOwnerFilter !== 'ALL' && m.owner_type !== selectedOwnerFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchesName = m.name.toLowerCase().includes(q);
      const matchesBrand = m.brand.toLowerCase().includes(q);
      const matchesModel = m.model.toLowerCase().includes(q);
      if (!matchesName && !matchesBrand && !matchesModel) return false;
    }
    return true;
  });

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">Gerenciamento do Estoque</span>
          <h1 className="text-2xl font-extrabold text-agro-dark">Catálogo de Máquinas</h1>
          <p className="text-xs text-gray-500">Adicione, edite, destaque e altere status das máquinas próprias e de terceiros.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenForm(undefined, 'PLATFORM')}
            className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-xs px-4 py-3 rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Máquina Própria</span>
          </button>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* TABS */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setSelectedOwnerFilter('ALL')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              selectedOwnerFilter === 'ALL' ? 'bg-white text-agro-dark shadow' : 'text-gray-600'
            }`}
          >
            Todas ({machines.length})
          </button>
          
          <button
            onClick={() => setSelectedOwnerFilter('PLATFORM')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              selectedOwnerFilter === 'PLATFORM' ? 'bg-agro-leaf text-white shadow' : 'text-gray-600'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Próprias ({machines.filter(m => m.owner_type === 'PLATFORM').length})</span>
          </button>

          <button
            onClick={() => setSelectedOwnerFilter('THIRD_PARTY')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              selectedOwnerFilter === 'THIRD_PARTY' ? 'bg-amber-600 text-white shadow' : 'text-gray-600'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Terceiros ({machines.filter(m => m.owner_type === 'THIRD_PARTY').length})</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por nome, marca..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
          />
        </div>

      </div>

      {/* TABLE / GRID */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-agro-cream text-gray-700 font-extrabold uppercase border-b border-gray-200">
              <tr>
                <th className="p-4">Máquina</th>
                <th className="p-4">Origem</th>
                <th className="p-4">Ano / Horas</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Destaque</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredMachines.map(machine => (
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
                        <span className="text-[11px] text-gray-500">
                          {machine.brand} {machine.model} • {machine.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ORIGIN */}
                  <td className="p-4 whitespace-nowrap">
                    {machine.owner_type === 'PLATFORM' ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1 w-fit">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Própria</span>
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-amber-300 flex items-center gap-1 w-fit">
                        <UserCheck className="w-3 h-3" />
                        <span>Terceiro</span>
                      </span>
                    )}
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
                  </td>

                  {/* STATUS */}
                  <td className="p-4 whitespace-nowrap">
                    <select
                      value={machine.status}
                      onChange={(e: any) => setMachineStatus(machine.id, e.target.value)}
                      className={`text-[11px] font-extrabold px-2 py-1 rounded-lg border bg-white focus:outline-none ${
                        machine.status === 'PUBLISHED' ? 'text-emerald-700 border-emerald-300' :
                        machine.status === 'SOLD' ? 'text-rose-700 border-rose-300' :
                        machine.status === 'PENDING' ? 'text-amber-700 border-amber-300' : 'text-gray-700 border-gray-300'
                      }`}
                    >
                      <option value="PUBLISHED">Publicado</option>
                      <option value="PENDING">Pendente</option>
                      <option value="NEGOTIATING">Em Negociação</option>
                      <option value="SOLD">Vendido</option>
                      <option value="REJECTED">Rejeitado</option>
                      <option value="INACTIVE">Inativo</option>
                    </select>
                  </td>

                  {/* FEATURED */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleMachineFeatured(machine.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        machine.featured 
                          ? 'bg-amber-100 text-amber-600 border-amber-300' 
                          : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}
                      title={machine.featured ? 'Remover destaque' : 'Destacar na Home'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenForm(machine)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                        title="Editar máquina"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Tem certeza que deseja excluir "${machine.name}"?`)) {
                            deleteMachine(machine.id);
                          }
                        }}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                        title="Excluir máquina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
