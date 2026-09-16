import React from 'react';
import { useApp } from '../../context/AppContext';
import { Machine } from '../../types';
import { CheckCircle2, XCircle, Edit, User, Phone, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';

interface AdminPendingProps {
  onOpenEditModal: (machine: Machine) => void;
}

export const AdminPending: React.FC<AdminPendingProps> = ({ onOpenEditModal }) => {
  const { announcements, machines, approveAnnouncement, rejectAnnouncement } = useApp();

  const pendingAnnouncements = announcements.filter(a => a.status === 'PENDING');

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* HEADER */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Moderação de Anúncios</span>
        <h1 className="text-2xl font-extrabold text-agro-dark">Anúncios Pendentes de Terceiros</h1>
        <p className="text-xs text-gray-500">Analise os anúncios submetidos por vendedores antes de autorizar a exibição no catálogo público.</p>
      </div>

      {pendingAnnouncements.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300 shadow-sm my-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-agro-dark">Nenhum anúncio pendente</h3>
          <p className="text-xs text-gray-500">Todos os anúncios enviados por terceiros já foram moderados.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingAnnouncements.map(ann => {
            const machine = machines.find(m => m.id === ann.machine_id) || ann.machine;

            return (
              <div 
                key={ann.id}
                className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-4 hover:shadow-lg transition-all"
              >
                
                {/* TOP BAR WITH VENDOR INFO & SALE TYPE */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 block">Vendedor Anunciante</span>
                      <span className="font-extrabold text-agro-dark text-sm">{ann.seller_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{ann.seller_whatsapp}</span>
                    </span>

                    <span className={`font-extrabold px-3 py-1 rounded-lg border ${
                      ann.sale_type === 'GROUP_AD' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}>
                      {ann.sale_type === 'GROUP_AD' ? 'Anúncio no Grupo (1%)' : 'Venda Agenciada (2%)'}
                    </span>
                  </div>
                </div>

                {/* MACHINE DETAILS */}
                {machine && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* THUMBNAIL */}
                    <div className="md:col-span-4 h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img 
                        src={machine.images[0] || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'} 
                        alt="" 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="md:col-span-8 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-agro-leaf uppercase">
                        <span>{machine.brand}</span>
                        <span>•</span>
                        <span>{machine.model}</span>
                        <span>•</span>
                        <span>Ano {machine.year}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-agro-dark">{machine.name}</h3>

                      <p className="text-xs text-gray-600 line-clamp-2">{machine.description}</p>

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="font-extrabold text-agro-dark text-base">
                          {formatPrice(machine.price)}
                        </span>

                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-agro-leaf" />
                          <span>{machine.location}</span>
                        </span>
                      </div>
                    </div>

                  </div>
                )}

                {/* ACTION BUTTONS: APPROVE / REJECT / EDIT */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                  
                  {machine && (
                    <button
                      onClick={() => onOpenEditModal(machine)}
                      className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Editar Antes de Aprovar</span>
                    </button>
                  )}

                  <button
                    onClick={() => rejectAnnouncement(ann.id)}
                    className="w-full sm:w-auto bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-rose-200"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Rejeitar Anúncio</span>
                  </button>

                  <button
                    onClick={() => approveAnnouncement(ann.id)}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aprovar e Publicar no Catálogo</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
