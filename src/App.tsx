import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { MachineDetailsPage } from './pages/MachineDetailsPage';
import { AnnouncePage } from './pages/AnnouncePage';
import { FarmAgencyPage } from './pages/FarmAgencyPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMachines } from './pages/admin/AdminMachines';
import { AdminAdvertisers } from './pages/admin/AdminAdvertisers';
import { AdminInterests } from './pages/admin/AdminInterests';
import { AdminVendas } from './pages/admin/AdminVendas';
import { AdminMyMachines } from './pages/admin/AdminMyMachines';
import { AdminSettings } from './pages/admin/AdminSettings';
import { MachineFormModal } from './pages/admin/MachineFormModal';
import { Machine, OwnerType } from './types';

export const App: React.FC = () => {
  const { isAdminLoggedIn } = useApp();

  // State Routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  
  // Map sub-routes to admin tab
  const getAdminTabFromPath = (path: string): string => {
    if (path.includes('/admin/machines')) return 'machines';
    if (path.includes('/admin/advertisers')) return 'advertisers';
    if (path.includes('/admin/interests')) return 'interests';
    if (path.includes('/admin/vendas')) return 'vendas';
    if (path.includes('/admin/my-machines')) return 'my-machines';
    if (path.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const [adminTab, setAdminTab] = useState<string>(() => getAdminTabFromPath(currentPath));

  // Admin Machine Modal state
  const [adminFormModalOpen, setAdminFormModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [editingOwnerType, setEditingOwnerType] = useState<OwnerType>('PLATFORM');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname || '/';
      setCurrentPath(p);
      if (p.startsWith('/admin')) {
        setAdminTab(getAdminTabFromPath(p));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle route protection & redirects for /admin, /admin/login, and /admin/dashboard
  useEffect(() => {
    if (currentPath.startsWith('/admin')) {
      if (!isAdminLoggedIn) {
        if (currentPath !== '/admin/login') {
          window.history.replaceState({}, '', '/admin/login');
          setCurrentPath('/admin/login');
        }
      } else {
        if (currentPath === '/admin' || currentPath === '/admin/' || currentPath === '/admin/login') {
          window.history.replaceState({}, '', '/admin/dashboard');
          setCurrentPath('/admin/dashboard');
          setAdminTab('dashboard');
        }
      }
    }
  }, [currentPath, isAdminLoggedIn]);

  const navigateTo = (path: string, machineId?: string) => {
    setCurrentPath(path);
    if (machineId) {
      setSelectedMachineId(machineId);
    }
    if (path.startsWith('/admin')) {
      setAdminTab(getAdminTabFromPath(path));
    }
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminTabChange = (tabId: string) => {
    setAdminTab(tabId);
    let targetPath = '/admin/dashboard';
    if (tabId === 'machines') targetPath = '/admin/machines';
    if (tabId === 'advertisers') targetPath = '/admin/advertisers';
    if (tabId === 'interests') targetPath = '/admin/interests';
    if (tabId === 'vendas') targetPath = '/admin/vendas';
    if (tabId === 'my-machines') targetPath = '/admin/my-machines';
    if (tabId === 'settings') targetPath = '/admin/settings';
    
    window.history.pushState({}, '', targetPath);
    setCurrentPath(targetPath);
  };

  const handleOpenAddModal = (machine?: Machine, defaultOwnerType: OwnerType = 'PLATFORM') => {
    setEditingMachine(machine || null);
    setEditingOwnerType(defaultOwnerType);
    setAdminFormModalOpen(true);
  };

  // CHECK IF ADMIN ROUTE
  const isAdminRoute = currentPath.startsWith('/admin');

  // RENDER ADMIN PANEL
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      return <AdminLoginPage onSuccess={() => navigateTo('/admin/dashboard')} />;
    }

    return (
      <AdminLayout 
        activeTab={adminTab} 
        onTabChange={handleAdminTabChange} 
        onNavigatePublic={navigateTo}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard 
            onNavigateTab={handleAdminTabChange} 
            onOpenAddModal={() => handleOpenAddModal(undefined, 'PLATFORM')} 
          />
        )}

        {adminTab === 'machines' && (
          <AdminMachines 
            onOpenForm={(machine) => handleOpenAddModal(machine, machine?.owner_type || 'PLATFORM')} 
            initialStatusFilter="ALL"
          />
        )}

        {adminTab === 'advertisers' && (
          <AdminAdvertisers />
        )}

        {adminTab === 'interests' && (
          <AdminInterests />
        )}

        {adminTab === 'vendas' && (
          <AdminVendas />
        )}

        {adminTab === 'my-machines' && (
          <AdminMyMachines 
            onOpenForm={(machine) => handleOpenAddModal(machine, 'PLATFORM')} 
          />
        )}

        {adminTab === 'settings' && (
          <AdminSettings />
        )}

        {/* ADMIN MACHINE FORM MODAL */}
        {adminFormModalOpen && (
          <MachineFormModal
            initialMachine={editingMachine}
            defaultOwnerType={editingOwnerType}
            onClose={() => setAdminFormModalOpen(false)}
          />
        )}
      </AdminLayout>
    );
  }

  // RENDER PUBLIC WEBSITE
  return (
    <div className="min-h-screen flex flex-col justify-between bg-agro-cream text-agro-graphite">
      {/* PUBLIC HEADER */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage 
            onNavigate={navigateTo} 
            onSelectMachine={(id) => navigateTo(`/maquinas/${id}`, id)} 
          />
        )}

        {currentPath === '/maquinas' && (
          <CatalogPage 
            onSelectMachine={(id) => navigateTo(`/maquinas/${id}`, id)} 
          />
        )}

        {currentPath.startsWith('/maquinas/') && (
          <MachineDetailsPage 
            machineId={selectedMachineId || currentPath.split('/maquinas/')[1]} 
            onBack={() => navigateTo('/maquinas')} 
          />
        )}

        {currentPath === '/anunciar' && (
          <AnnouncePage onBackToHome={() => navigateTo('/')} />
        )}

        {currentPath === '/agenciamento-lavouras' && (
          <FarmAgencyPage onBackToHome={() => navigateTo('/')} />
        )}
      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

      {/* PUBLIC FOOTER */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};
