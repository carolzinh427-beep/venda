export type OwnerType = 'PLATFORM' | 'THIRD_PARTY';

export type MachineStatus = 'PENDING' | 'PUBLISHED' | 'NEGOTIATING' | 'SOLD' | 'REJECTED' | 'INACTIVE';

export type SaleType = 'GROUP_AD' | 'AGENCY'; // GROUP_AD = 1%, AGENCY = 2%

export type InterestStatus = 'NEW' | 'CONTACTED' | 'COMPLETED';

export type AgencyStatus = 'NEW' | 'PROMOTING' | 'INTERESTED' | 'NEGOTIATING' | 'SOLD' | 'CANCELLED';

export interface CompanySettings {
  company_name: string;
  whatsapp: string;
  instagram: string;
  email: string;
  phone: string;
  city_state: string;
  hero_title: string;
  hero_subtitle: string;
  farm_agency_title: string;
  farm_agency_description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
}

export interface Machine {
  id: string;
  created_by?: string;
  owner_type: OwnerType;
  name: string;
  brand: string;
  model: string;
  category_id: string;
  year: number;
  hours?: number | null;
  price?: number | null; // null = Consulte o valor
  location: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  status: MachineStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
  seller_name?: string;
  seller_whatsapp?: string;
}

export interface Announcement {
  id: string;
  seller_name: string;
  seller_whatsapp: string;
  seller_email?: string;
  city: string;
  state: string;
  machine_id: string;
  machine?: Machine;
  sale_type: SaleType;
  status: MachineStatus;
  created_at: string;
}

export interface Interest {
  id: string;
  machine_id: string;
  machine_name: string;
  name: string;
  whatsapp: string;
  email?: string;
  message?: string;
  status: InterestStatus;
  created_at: string;
}

export interface AgencyDeal {
  id: string;
  title: string;
  deal_type: 'MACHINE' | 'FARM';
  client_name: string;
  client_whatsapp: string;
  status: AgencyStatus;
  notes?: string;
  created_at: string;
}

export interface MachineFilters {
  search: string;
  category: string;
  brand: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  location: string;
  ownerType: string;
}
