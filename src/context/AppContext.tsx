import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Machine, Category, CompanySettings, Announcement, Interest, AgencyDeal, MachineFilters, 
  MachineStatus, InterestStatus, AgencyStatus, OwnerType, SaleType 
} from '../types';
import { 
  INITIAL_COMPANY_SETTINGS, INITIAL_CATEGORIES, INITIAL_MACHINES, 
  INITIAL_ANNOUNCEMENTS, INITIAL_INTERESTS, INITIAL_AGENCY_DEALS 
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
  machines: Machine[];
  addMachine: (machine: Omit<Machine, 'id' | 'created_at' | 'updated_at'>) => Machine;
  updateMachine: (id: string, updates: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  setMachineStatus: (id: string, status: MachineStatus) => void;
  toggleMachineFeatured: (id: string) => void;
  
  announcements: Announcement[];
  addAnnouncement: (announcementData: {
    seller_name: string;
    seller_whatsapp: string;
    seller_email?: string;
    city: string;
    state: string;
    sale_type: SaleType;
    machineData: Omit<Machine, 'id' | 'owner_type' | 'status' | 'created_at' | 'updated_at'>;
  }) => void;
  approveAnnouncement: (id: string) => void;
  rejectAnnouncement: (id: string) => void;

  interests: Interest[];
  addInterest: (interest: Omit<Interest, 'id' | 'created_at' | 'status'>) => void;
  updateInterestStatus: (id: string, status: InterestStatus) => void;

  agencyDeals: AgencyDeal[];
  addAgencyDeal: (deal: Omit<AgencyDeal, 'id' | 'created_at'>) => void;
  updateAgencyDealStatus: (id: string, status: AgencyStatus) => void;

  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  filters: MachineFilters;
  setFilters: React.Dispatch<React.SetStateAction<MachineFilters>>;
  resetFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'agromaquinas_settings_v1',
  CATEGORIES: 'agromaquinas_categories_v1',
  MACHINES: 'agromaquinas_machines_v1',
  ANNOUNCEMENTS: 'agromaquinas_announcements_v1',
  INTERESTS: 'agromaquinas_interests_v1',
  AGENCY_DEALS: 'agromaquinas_agency_v1',
  ADMIN_AUTH: 'agromaquinas_admin_auth_v1',
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

  // 3. Machines State
  const [machines, setMachines] = useState<Machine[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MACHINES);
    return saved ? JSON.parse(saved) : INITIAL_MACHINES;
  });

  // 4. Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // 5. Interests State
  const [interests, setInterests] = useState<Interest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERESTS);
    return saved ? JSON.parse(saved) : INITIAL_INTERESTS;
  });

  // 6. Agency Deals State
  const [agencyDeals, setAgencyDeals] = useState<AgencyDeal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AGENCY_DEALS);
    return saved ? JSON.parse(saved) : INITIAL_AGENCY_DEALS;
  });

  // 7. Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // 8. Filters State
  const [filters, setFilters] = useState<MachineFilters>(DEFAULT_FILTERS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

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
    localStorage.setItem(STORAGE_KEYS.AGENCY_DEALS, JSON.stringify(agencyDeals));
  }, [agencyDeals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Actions
  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const addMachine = (machineData: Omit<Machine, 'id' | 'created_at' | 'updated_at'>): Machine => {
    const newMachine: Machine = {
      ...machineData,
      id: 'm-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setMachines(prev => [newMachine, ...prev]);
    return newMachine;
  };

  const updateMachine = (id: string, updates: Partial<Machine>) => {
    setMachines(prev => prev.map(m => m.id === id ? { ...m, ...updates, updated_at: new Date().toISOString() } : m));
  };

  const deleteMachine = (id: string) => {
    setMachines(prev => prev.filter(m => m.id !== id));
    setAnnouncements(prev => prev.filter(a => a.machine_id !== id));
    setInterests(prev => prev.filter(i => i.machine_id !== id));
  };

  const setMachineStatus = (id: string, status: MachineStatus) => {
    updateMachine(id, { status });
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
    sale_type: SaleType;
    machineData: Omit<Machine, 'id' | 'owner_type' | 'status' | 'created_at' | 'updated_at'>;
  }) => {
    // First add the machine in PENDING status as THIRD_PARTY
    const newMachine = addMachine({
      ...data.machineData,
      owner_type: 'THIRD_PARTY',
      status: 'PENDING',
      seller_name: data.seller_name,
      seller_whatsapp: data.seller_whatsapp
    });

    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      seller_name: data.seller_name,
      seller_whatsapp: data.seller_whatsapp,
      seller_email: data.seller_email,
      city: data.city,
      state: data.state,
      machine_id: newMachine.id,
      machine: newMachine,
      sale_type: data.sale_type,
      status: 'PENDING',
      created_at: new Date().toISOString()
    };

    setAnnouncements(prev => [newAnn, ...prev]);

    // Create an agency deal automatically if sale_type is AGENCY
    if (data.sale_type === 'AGENCY') {
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

  const approveAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === id) {
        setMachineStatus(a.machine_id, 'PUBLISHED');
        return { ...a, status: 'PUBLISHED' };
      }
      return a;
    }));
  };

  const rejectAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => {
      if (a.id === id) {
        setMachineStatus(a.machine_id, 'REJECTED');
        return { ...a, status: 'REJECTED' };
      }
      return a;
    }));
  };

  const addInterest = (interestData: Omit<Interest, 'id' | 'created_at' | 'status'>) => {
    const newInterest: Interest = {
      ...interestData,
      id: 'int-' + Date.now(),
      status: 'NEW',
      created_at: new Date().toISOString()
    };
    setInterests(prev => [newInterest, ...prev]);
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

  const loginAdmin = (password: string) => {
    // Admin password check (accepts "admin123" or "agro2026" or "admin")
    if (password === 'admin123' || password === 'agro2026' || password === 'admin') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
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
      machines,
      addMachine,
      updateMachine,
      deleteMachine,
      setMachineStatus,
      toggleMachineFeatured,
      announcements,
      addAnnouncement,
      approveAnnouncement,
      rejectAnnouncement,
      interests,
      addInterest,
      updateInterestStatus,
      agencyDeals,
      addAgencyDeal,
      updateAgencyDealStatus,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
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
