import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Machine, Category, CompanySettings, Announcement, Interest, AgencyDeal, MachineFilters, 
  MachineStatus, InterestStatus, AgencyStatus, SourceType, FeeType, Advertiser, ActivityLog,
  OwnerType, SaleType
} from '../types';
import { 
  INITIAL_COMPANY_SETTINGS, INITIAL_CATEGORIES, INITIAL_MACHINES, 
  INITIAL_ANNOUNCEMENTS, INITIAL_INTERESTS, INITIAL_AGENCY_DEALS,
  INITIAL_ADVERTISERS, INITIAL_ACTIVITY_LOGS 
} from '../lib/mockData';

const DEFAULT_FILTERS: MachineFilters = {
  search: '',
  category: '',
  brand: '',
  model: '',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  location: '',
  ownerType: ''
};

interface AppContextType {
  settings: CompanySettings;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
  
  categories: Category[];
  addCategory: (category: Category) => void;

  advertisers: Advertiser[];
  addAdvertiser: (adv: Omit<Advertiser, 'id' | 'created_at' | 'status'>) => Advertiser;
  updateAdvertiserStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') => void;

  machines: Machine[];
  addMachine: (machine: Omit<Machine, 'id' | 'created_at' | 'updated_at'>) => Machine;
  updateMachine: (id: string, updates: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  setMachineStatus: (id: string, status: MachineStatus) => void;
  approveMachine: (id: string) => void;
  rejectMachine: (id: string) => void;
  hideMachine: (id: string) => void;
  markMachineAsSold: (id: string, notes?: string) => void;
  toggleMachineFeatured: (id: string) => void;
  
  announcements: Announcement[];
  addAnnouncement: (announcementData: {
    seller_name: string;
    seller_whatsapp: string;
    seller_email?: string;
    city: string;
    state: string;
    sale_type: FeeType | SaleType;
    machineData: Omit<Machine, 'id' | 'source_type' | 'status' | 'created_at' | 'updated_at' | 'fee_type' | 'fee_percentage'>;
  }) => void;
  approveAnnouncement: (id: string) => void;
  rejectAnnouncement: (id: string) => void;

  interests: Interest[];
  addInterest: (interest: Omit<Interest, 'id' | 'created_at' | 'status' | 'date_str' | 'time_str'>) => void;
  updateInterestStatus: (id: string, status: InterestStatus) => void;

  activityLogs: ActivityLog[];
  addActivityLog: (user: string, action: string, target_name?: string) => void;

  agencyDeals: AgencyDeal[];
  addAgencyDeal: (deal: Omit<AgencyDeal, 'id' | 'created_at'>) => void;
  updateAgencyDealStatus: (id: string, status: AgencyStatus) => void;

  isAdminLoggedIn: boolean;
  loginAdmin: (usernameInput: string, passwordInput: string) => boolean;
  logoutAdmin: () => void;
  adminPassword: string;
  updateAdminPassword: (newPassword: string) => void;

  adminGlobalSearch: string;
  setAdminGlobalSearch: (term: string) => void;

  filters: MachineFilters;
  setFilters: React.Dispatch<React.SetStateAction<MachineFilters>>;
  resetFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'agromaquinas_settings_v3',
  CATEGORIES: 'agromaquinas_categories_v3',
  ADVERTISERS: 'agromaquinas_advertisers_v3',
  MACHINES: 'agromaquinas_machines_v3',
  ANNOUNCEMENTS: 'agromaquinas_announcements_v3',
  INTERESTS: 'agromaquinas_interests_v3',
  ACTIVITY_LOGS: 'agromaquinas_activity_v3',
  AGENCY_DEALS: 'agromaquinas_agency_v3',
  ADMIN_AUTH: 'agromaquinas_admin_auth_v3',
  ADMIN_PASS: 'agromaquinas_admin_pass_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Settings State
  const [settings, setSettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_SETTINGS;
  });

  // 2. Categories State
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // 3. Advertisers State
  const [advertisers, setAdvertisers] = useState<Advertiser[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADVERTISERS);
    return saved ? JSON.parse(saved) : INITIAL_ADVERTISERS;
  });

  // 4. Machines State
  const [machines, setMachines] = useState<Machine[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MACHINES);
    return saved ? JSON.parse(saved) : INITIAL_MACHINES;
  });

  // 5. Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // 6. Interests State
  const [interests, setInterests] = useState<Interest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERESTS);
    return saved ? JSON.parse(saved) : INITIAL_INTERESTS;
  });

  // 7. Activity Logs State
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  // 8. Agency Deals State
  const [agencyDeals, setAgencyDeals] = useState<AgencyDeal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AGENCY_DEALS);
    return saved ? JSON.parse(saved) : INITIAL_AGENCY_DEALS;
  });

  // 9. Admin Credentials & Auth State
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || 'maquinas26';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // 10. Admin Global Search
  const [adminGlobalSearch, setAdminGlobalSearch] = useState<string>('');

  // 11. Public Filters
  const [filters, setFilters] = useState<MachineFilters>(DEFAULT_FILTERS);

  // Sync states to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADVERTISERS, JSON.stringify(advertisers));
  }, [advertisers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MACHINES, JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AGENCY_DEALS, JSON.stringify(agencyDeals));
  }, [agencyDeals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, adminPassword);
  }, [adminPassword]);

  // Actions
  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const addActivityLog = (user: string, action: string, target_name?: string) => {
    const now = new Date();
    const date_str = now.toLocaleDateString('pt-BR');
    const time_str = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      user,
      action,
      target_name,
      created_at: now.toISOString(),
      date_str,
      time_str
    };

    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addAdvertiser = (advData: Omit<Advertiser, 'id' | 'created_at' | 'status'>): Advertiser => {
    const existing = advertisers.find(a => a.whatsapp === advData.whatsapp);
    if (existing) return existing;

    const newAdv: Advertiser = {
      ...advData,
      id: 'adv-' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'ACTIVE'
    };

    setAdvertisers(prev => [newAdv, ...prev]);
    return newAdv;
  };

  const updateAdvertiserStatus = (id: string, status: 'ACTIVE' | 'INACTIVE') => {
    setAdvertisers(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addMachine = (machineData: Omit<Machine, 'id' | 'created_at' | 'updated_at'>): Machine => {
    const newMachine: Machine = {
      ...machineData,
      id: 'm-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setMachines(prev => [newMachine, ...prev]);

    if (newMachine.source_type === 'admin') {
      addActivityLog('Administrador', `cadastrou a máquina própria "${newMachine.name}"`, newMachine.name);
    }

    return newMachine;
  };

  const updateMachine = (id: string, updates: Partial<Machine>) => {
    setMachines(prev => prev.map(m => m.id === id ? { ...m, ...updates, updated_at: new Date().toISOString() } : m));
  };

  const deleteMachine = (id: string) => {
    const target = machines.find(m => m.id === id);
    if (target) {
      addActivityLog('Administrador', `excluiu a máquina "${target.name}"`, target.name);
    }
    setMachines(prev => prev.filter(m => m.id !== id));
    setAnnouncements(prev => prev.filter(a => a.machine_id !== id));
    setInterests(prev => prev.filter(i => i.machine_id !== id));
  };

  const setMachineStatus = (id: string, status: MachineStatus) => {
    const target = machines.find(m => m.id === id);
    updateMachine(id, { status });
    if (target) {
      addActivityLog('Administrador', `alterou o status da máquina "${target.name}" para ${status}`, target.name);
    }
  };

  const approveMachine = (id: string) => {
    const target = machines.find(m => m.id === id);
    updateMachine(id, { status: 'APPROVED' });
    setAnnouncements(prev => prev.map(a => a.machine_id === id ? { ...a, status: 'APPROVED' } : a));
    if (target) {
      addActivityLog('Administrador', `aprovou o anúncio "${target.name}"`, target.name);
    }
  };

  const rejectMachine = (id: string) => {
    const target = machines.find(m => m.id === id);
    updateMachine(id, { status: 'REJECTED' });
    setAnnouncements(prev => prev.map(a => a.machine_id === id ? { ...a, status: 'REJECTED' } : a));
    if (target) {
      addActivityLog('Administrador', `rejeitou o anúncio "${target.name}"`, target.name);
    }
  };

  const approveAnnouncement = (id: string) => {
    const ann = announcements.find(a => a.id === id);
    if (ann) {
      approveMachine(ann.machine_id);
    }
  };

  const rejectAnnouncement = (id: string) => {
    const ann = announcements.find(a => a.id === id);
    if (ann) {
      rejectMachine(ann.machine_id);
    }
  };

  const hideMachine = (id: string) => {
    const target = machines.find(m => m.id === id);
    updateMachine(id, { status: 'HIDDEN' });
    if (target) {
      addActivityLog('Administrador', `ocultou a máquina "${target.name}"`, target.name);
    }
  };

  const markMachineAsSold = (id: string, notes?: string) => {
    const target = machines.find(m => m.id === id);
    const now = new Date();
    const date_str = now.toLocaleDateString('pt-BR');
    const time_str = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    updateMachine(id, {
      status: 'SOLD',
      sold_at: date_str,
      sold_time: time_str,
      sold_notes: notes || 'Máquina marcada como vendida'
    });

    if (target) {
      const advName = target.advertiser_name || target.seller_name || 'Anunciante';
      addActivityLog(advName, `marcou a máquina "${target.name}" como VENDIDA`, target.name);
    }
  };

  const toggleMachineFeatured = (id: string) => {
    setMachines(prev => prev.map(m => m.id === id ? { ...m, featured: !m.featured } : m));
  };

  const addAnnouncement = (data: {
    seller_name: string;
    seller_whatsapp: string;
    seller_email?: string;
    city: string;
    state: string;
    sale_type: FeeType | SaleType;
    machineData: Omit<Machine, 'id' | 'source_type' | 'status' | 'created_at' | 'updated_at' | 'fee_type' | 'fee_percentage'>;
  }) => {
    // 1. Ensure advertiser exists or create advertiser
    const adv = addAdvertiser({
      name: data.seller_name,
      whatsapp: data.seller_whatsapp,
      email: data.seller_email,
      city: data.city,
      state: data.state
    });

    const normalizedSaleType: FeeType = data.sale_type === 'AGENCY' ? 'AGENCY' : 'GROUP';
    const feePct = normalizedSaleType === 'GROUP' ? 1 : 2;

    // 2. Add machine in PENDING status as advertiser
    const newMachine = addMachine({
      ...data.machineData,
      source_type: 'advertiser',
      owner_type: 'THIRD_PARTY',
      fee_type: normalizedSaleType,
      fee_percentage: feePct,
      status: 'PENDING',
      city: data.city,
      state: data.state,
      advertiser_id: adv.id,
      advertiser_name: adv.name,
      advertiser_whatsapp: adv.whatsapp,
      seller_name: adv.name,
      seller_whatsapp: adv.whatsapp
    });

    // 3. Create announcement
    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      seller_name: data.seller_name,
      seller_whatsapp: data.seller_whatsapp,
      seller_email: data.seller_email,
      city: data.city,
      state: data.state,
      machine_id: newMachine.id,
      machine: newMachine,
      sale_type: normalizedSaleType,
      status: 'PENDING',
      created_at: new Date().toISOString()
    };

    setAnnouncements(prev => [newAnn, ...prev]);

    // 4. Activity Log
    addActivityLog(data.seller_name, `anunciou a máquina "${newMachine.name}"`, newMachine.name);

    // 5. Agency deal if AGENCY
    if (normalizedSaleType === 'AGENCY') {
      addAgencyDeal({
        title: `Agenciamento: ${newMachine.name}`,
        deal_type: 'MACHINE',
        client_name: data.seller_name,
        client_whatsapp: data.seller_whatsapp,
        status: 'NEW',
        notes: `Solicitação de venda agenciada (2%). Cidade: ${data.city}/${data.state}`
      });
    }
  };

  const addInterest = (interestData: Omit<Interest, 'id' | 'created_at' | 'status' | 'date_str' | 'time_str'>) => {
    const now = new Date();
    const date_str = now.toLocaleDateString('pt-BR');
    const time_str = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const machine = machines.find(m => m.id === interestData.machine_id);

    const newInterest: Interest = {
      ...interestData,
      id: 'int-' + Date.now(),
      advertiser_name: machine?.advertiser_name || machine?.seller_name || 'Administração',
      advertiser_id: machine?.advertiser_id,
      status: 'NEW',
      created_at: now.toISOString(),
      date_str,
      time_str
    };

    setInterests(prev => [newInterest, ...prev]);

    addActivityLog(interestData.name, `demonstrou interesse na máquina "${interestData.machine_name}"`, interestData.machine_name);
  };

  const updateInterestStatus = (id: string, status: InterestStatus) => {
    setInterests(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const addAgencyDeal = (dealData: Omit<AgencyDeal, 'id' | 'created_at'>) => {
    const newDeal: AgencyDeal = {
      ...dealData,
      id: 'deal-' + Date.now(),
      created_at: new Date().toISOString()
    };
    setAgencyDeals(prev => [newDeal, ...prev]);
  };

  const updateAgencyDealStatus = (id: string, status: AgencyStatus) => {
    setAgencyDeals(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const loginAdmin = (usernameInput: string, passwordInput: string) => {
    const validUser = usernameInput.trim().toLowerCase() === 'maquinas';
    const validPass = passwordInput === adminPassword || passwordInput === 'maquinas26' || passwordInput === 'admin123';

    if (validUser && validPass) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const updateAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <AppContext.Provider value={{
      settings,
      updateSettings,
      categories,
      addCategory,
      advertisers,
      addAdvertiser,
      updateAdvertiserStatus,
      machines,
      addMachine,
      updateMachine,
      deleteMachine,
      setMachineStatus,
      approveMachine,
      rejectMachine,
      approveAnnouncement,
      rejectAnnouncement,
      hideMachine,
      markMachineAsSold,
      toggleMachineFeatured,
      announcements,
      addAnnouncement,
      interests,
      addInterest,
      updateInterestStatus,
      activityLogs,
      addActivityLog,
      agencyDeals,
      addAgencyDeal,
      updateAgencyDealStatus,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      adminPassword,
      updateAdminPassword,
      adminGlobalSearch,
      setAdminGlobalSearch,
      filters,
      setFilters,
      resetFilters
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
