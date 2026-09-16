export type SourceType = 'admin' | 'advertiser';
export type OwnerType = 'PLATFORM' | 'THIRD_PARTY' | 'admin' | 'advertiser';

export type MachineStatus = 'PENDING' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'SOLD' | 'HIDDEN' | 'NEGOTIATING' | 'INACTIVE';

export type FeeType = 'GROUP' | 'AGENCY' | 'GROUP_AD';
export type SaleType = 'GROUP_AD' | 'AGENCY' | 'GROUP';

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

export interface Advertiser {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  city?: string;
  state?: string;
  created_at: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Machine {
  id: string;
  source_type: SourceType; // 'admin' | 'advertiser'
  owner_type?: OwnerType; // 'PLATFORM' | 'THIRD_PARTY'
  fee_type: FeeType; // 'GROUP' | 'AGENCY'
  fee_percentage: number; // 1 | 2
  name: string;
  brand: string;
  model: string;
  category_id: string;
  year: number;
  hours?: number | null;
  price?: number | null; // null = Consulte o valor
  city: string;
  state: string;
  location: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  status: MachineStatus;
  featured: boolean;
  advertiser_id?: string;
  advertiser_name?: string;
  advertiser_whatsapp?: string;
  seller_name?: string;
  seller_whatsapp?: string;
  sold_at?: string;
  sold_time?: string;
  sold_notes?: string;
  created_at: string;
  updated_at: string;
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
  sale_type: FeeType;
  status: MachineStatus;
  created_at: string;
}

export interface Interest {
  id: string;
  machine_id: string;
  machine_name: string;
  advertiser_name?: string;
  advertiser_id?: string;
  name: string;
  whatsapp: string;
  email?: string;
  message?: string;
  status: InterestStatus;
  created_at: string;
  date_str: string;
  time_str: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target_name?: string;
  created_at: string;
  date_str: string;
  time_str: string;
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
