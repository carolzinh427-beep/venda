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
import { AdminPending } from './pages/admin/AdminPending';
import { AdminInterests } from './pages/admin/AdminInterests';
import { AdminAgency } from './pages/admin/AdminAgency';
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
  
  // Admin active tab
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  
  // Admin Machine Modal state
  const [adminFormModalOpen, setAdminFormModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [editingOwnerType, setEditingOwnerType] = useState<OwnerType>('PLATFORM');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, machineId?: string) => {
    setCurrentPath(path);
    if (machineId) {
      setSelectedMachineId(machineId);
    }
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      return <AdminLoginPage onSuccess={() => navigateTo('/admin')} />;
    }

    return (
      <AdminLayout 
        activeTab={adminTab} 
        onTabChange={setAdminTab} 
        onNavigatePublic={navigateTo}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard 
            onNavigateTab={setAdminTab} 
            onOpenAddModal={() => handleOpenAddModal(undefined, 'PLATFORM')} 
          />
        )}

        {adminTab === 'maquinas' && (
          <AdminMachines 
            onOpenForm={(machine, ownerType) => handleOpenAddModal(machine, ownerType)} 
            filterOwnerType="ALL"
          />
        )}

        {adminTab === 'proprias' && (
          <AdminMachines 
            onOpenForm={(machine, ownerType) => handleOpenAddModal(machine, ownerType)} 
            filterOwnerType="PLATFORM"
          />
        )}

        {adminTab === 'terceiros' && (
          <AdminMachines 
            onOpenForm={(machine, ownerType) => handleOpenAddModal(machine, ownerType)} 
            filterOwnerType="THIRD_PARTY"
          />
        )}

        {adminTab === 'pendentes' && (
          <AdminPending 
            onOpenEditModal={(machine) => handleOpenAddModal(machine, machine.owner_type)} 
          />
        )}

        {adminTab === 'interesses' && (
          <AdminInterests />
        )}

        {adminTab === 'agenciamento' && (
          <AdminAgency />
        )}

        {adminTab === 'configuracoes' && (
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
