import React from 'react';
import { useApp } from '../../context/AppContext';
import { Machine } from '../../types';
import { AdminMachines } from './AdminMachines';

interface AdminMyMachinesProps {
  onOpenForm: (machine?: Machine) => void;
}

export const AdminMyMachines: React.FC<AdminMyMachinesProps> = ({ onOpenForm }) => {
  return (
    <div className="space-y-4 text-left">
      <div className="bg-emerald-900 text-white p-4 sm:p-6 rounded-2xl border border-emerald-700 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Estoque Próprio</span>
          <h2 className="text-xl font-extrabold">Minhas Máquinas (source_type = 'admin')</h2>
          <p className="text-xs text-gray-200 mt-1">Máquinas cadastradas diretamente pelo Administrador para comercialização própria.</p>
        </div>
      </div>

      <AdminMachines onOpenForm={onOpenForm} filterSourceType="admin" />
    </div>
  );
};
