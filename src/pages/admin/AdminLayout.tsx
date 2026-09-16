import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tractor, LayoutDashboard, Layers, Clock, Heart, ShieldCheck, UserCheck, 
  Settings, LogOut, Menu, X, ExternalLink, Handshake 
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
  onNavigatePublic: (path: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  activeTab, 
  onTabChange, 
  children,
  onNavigatePublic
}) => {
  const { settings, logoutAdmin, announcements, interests } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = announcements.filter(a => a.status === 'PENDING').length;
  const newInterestsCount = interests.filter(i => i.status === 'NEW').length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'maquinas', label: 'Todas as Máquinas', icon: <Layers className="w-5 h-5" /> },
    { 
      id: 'pendentes', 
      label: 'Anúncios Pendentes', 
      icon: <Clock className="w-5 h-5" />,
      badge: pendingCount > 0 ? pendingCount : undefined,
      badgeColor: 'bg-amber-500 text-white'
    },
    { 
      id: 'interesses', 
      label: 'Interesses', 
      icon: <Heart className="w-5 h-5" />,
      badge: newInterestsCount > 0 ? newInterestsCount : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
    { id: 'proprias', label: 'Máquinas Próprias', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'terceiros', label: 'Máquinas de Terceiros', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'agenciamento', label: 'Agenciamento', icon: <Handshake className="w-5 h-5" /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleSelectTab = (id: string) => {
    onTabChange(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-agro-graphite">
      
      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-agro-dark text-white p-4 flex items-center justify-between border-b border-agro-leaf/30 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Tractor className="w-6 h-6 text-agro-accent" />
          <span className="font-extrabold text-base tracking-tight">{settings.company_name} Admin</span>
        </div>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {pendingCount} P
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-200 hover:text-white rounded-lg bg-white/10"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-agro-dark text-white flex flex-col justify-between p-4 transform transition-transform duration-200 ease-in-out border-r border-agro-leaf/20
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-agro-leaf flex items-center justify-center text-agro-accent border border-emerald-500/30">
              <Tractor className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-base text-white tracking-tight block leading-none">
                {settings.company_name}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Painel Admin
              </span>
            </div>
          </div>

          {/* MENU LIST */}
          <nav className="space-y-1 text-left">
            {menuItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-agro-leaf text-white shadow-md border border-emerald-500/40'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${item.badgeColor || 'bg-white/20 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* BOTTOM UTILITIES */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          
          {/* VIEW PUBLIC SITE */}
          <button
            onClick={() => onNavigatePublic('/')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <span>Ver Site Público</span>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </button>

          {/* LOGOUT */}
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair do Painel</span>
          </button>
        </div>

      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        ></div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};
