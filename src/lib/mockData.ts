import { Machine, Category, CompanySettings, Announcement, Interest, AgencyDeal, Advertiser, ActivityLog } from '../types';

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  company_name: 'AgroMáquinas Brasil',
  whatsapp: '5527998887777',
  instagram: 'agromaquinas.br',
  email: 'contato@agromaquinasbrasil.com.br',
  phone: '(27) 3371-9000',
  city_state: 'Linhares - ES',
  hero_title: 'Máquinas certas para quem vive do campo.',
  hero_subtitle: 'Encontre máquinas e implementos agrícolas à venda ou anuncie seu equipamento para alcançar compradores em todo o Brasil.',
  farm_agency_title: 'Agenciamento de Lavouras e Propriedades Rurais',
  farm_agency_description: 'Intermediamos a compra e venda de lavouras e propriedades rurais com discrição, valuation preciso, assessoria jurídica e compradores qualificados em todo o Brasil.',
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-tratores', name: 'Tratores', slug: 'tratores', iconName: 'Tractor' },
  { id: 'cat-colheitadeiras', name: 'Colheitadeiras', slug: 'colheitadeiras', iconName: 'Wheat' },
  { id: 'cat-plantadeiras', name: 'Plantadeiras', slug: 'plantadeiras', iconName: 'Sprout' },
  { id: 'cat-pulverizadores', name: 'Pulverizadores', slug: 'pulverizadores', iconName: 'Droplets' },
  { id: 'cat-implementos', name: 'Implementos', slug: 'implementos', iconName: 'Wrench' },
  { id: 'cat-carretas', name: 'Carretas', slug: 'carretas', iconName: 'Truck' },
  { id: 'cat-distribuidores', name: 'Distribuidores', slug: 'distribuidores', iconName: 'Sliders' },
  { id: 'cat-equipamentos', name: 'Equipamentos agrícolas', slug: 'equipamentos', iconName: 'Cog' },
  { id: 'cat-outros', name: 'Outros', slug: 'outros', iconName: 'MoreHorizontal' },
];

export const INITIAL_ADVERTISERS: Advertiser[] = [
  {
    id: 'adv-admin',
    name: 'Administração AgroMáquinas',
    whatsapp: '5527998887777',
    email: 'admin@agromaquinasbrasil.com.br',
    city: 'Linhares',
    state: 'ES',
    created_at: '2026-01-01T00:00:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'adv-1',
    name: 'Carlos Oliveira (Carlos Máquinas)',
    whatsapp: '5527999112233',
    email: 'carlos@carlosmaquinas.com.br',
    city: 'Linhares',
    state: 'ES',
    created_at: '2026-05-10T10:00:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'adv-2',
    name: 'Marcos Antônio Ribeiro',
    whatsapp: '5545997771122',
    email: 'marcos.ribeiro@fazenda.com.br',
    city: 'Cascavel',
    state: 'PR',
    created_at: '2026-06-15T14:20:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'adv-3',
    name: 'Fazenda Terra Verde (Sérgio)',
    whatsapp: '5566991234567',
    email: 'sergio@terraverde.com.br',
    city: 'Rondonópolis',
    state: 'MT',
    created_at: '2026-07-01T09:00:00Z',
    status: 'ACTIVE'
  }
];

export const INITIAL_MACHINES: Machine[] = [
  {
    id: 'm-1',
    source_type: 'admin',
    fee_type: 'AGENCY',
    fee_percentage: 2,
    name: 'Trator John Deere 6110J 4x4 Cabinado',
    brand: 'John Deere',
    model: '6110J',
    category_id: 'cat-tratores',
    year: 2021,
    hours: 2450,
    price: 345000,
    city: 'Linhares',
    state: 'ES',
    location: 'Linhares / ES',
    description: 'Trator John Deere 6110J em excelente estado de conservação. Único dono, todas as revisões feitas em concessionária autorizada. Cabine original com ar condicionado, transmissão PowerQuad 16x16, piloto automático pronto.',
    specifications: {
      'Potência do Motor': '110 CV',
      'Transmissão': 'PowerQuad 16x16',
      'Tração': '4x4 Auxiliar',
      'Horas de Uso': '2.450 hrs',
      'Cabine': 'Original com Ar-Condicionado',
      'Piloto Automático': 'Preparado (Autotrac Ready)',
      'Estado dos Pneus': '80% de vida útil'
    },
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'APPROVED',
    featured: true,
    advertiser_id: 'adv-admin',
    advertiser_name: 'Administração AgroMáquinas',
    advertiser_whatsapp: '5527998887777',
    created_at: '2026-08-10T10:00:00Z',
    updated_at: '2026-08-10T10:00:00Z'
  },
  {
    id: 'm-2',
    source_type: 'advertiser',
    fee_type: 'AGENCY',
    fee_percentage: 2,
    name: 'Colheitadeira Massey Ferguson MF 9695 Duals',
    brand: 'Massey Ferguson',
    model: 'MF 9695',
    category_id: 'cat-colheitadeiras',
    year: 2020,
    hours: 1890,
    price: 1150000,
    city: 'Rio Verde',
    state: 'GO',
    location: 'Rio Verde / GO',
    description: 'Colheitadeira Massey Ferguson MF 9695 classe 6 de rotor. Acompanha plataforma de soja draper de 30 pés. MÁQUINA DE REVISÃO EM DIA. Sistema de trilha axial, picador de palha reforçado.',
    specifications: {
      'Motor': 'AGCO Power 350 CV',
      'Sistema de Colheita': 'Rotor Axial Single',
      'Horas de Rotor': '1.420 hrs',
      'Plataforma': 'Draper 30 Pés'
    },
    images: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'APPROVED',
    featured: true,
    advertiser_id: 'adv-1',
    advertiser_name: 'Carlos Oliveira (Carlos Máquinas)',
    advertiser_whatsapp: '5527999112233',
    created_at: '2026-08-15T14:30:00Z',
    updated_at: '2026-08-15T14:30:00Z'
  },
  {
    id: 'm-3',
    source_type: 'advertiser',
    fee_type: 'GROUP',
    fee_percentage: 1,
    name: 'Plantadeira Stara Cinderela 15 Linhas Pneumática',
    brand: 'Stara',
    model: 'Cinderela 15',
    category_id: 'cat-plantadeiras',
    year: 2022,
    hours: null,
    price: 280000,
    city: 'Cascavel',
    state: 'PR',
    location: 'Cascavel / PR',
    description: 'Plantadeira Stara Cinderela de 15 linhas com espaçamento de 45cm. Dosadores pneumáticos de semente Precision Planting VSet2, caixa central de sementes.',
    specifications: {
      'Número de Linhas': '15 linhas',
      'Espaçamento': '45 cm',
      'Dosador de Semente': 'Pneumático Precision'
    },
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'APPROVED',
    featured: true,
    advertiser_id: 'adv-2',
    advertiser_name: 'Marcos Antônio Ribeiro',
    advertiser_whatsapp: '5545997771122',
    created_at: '2026-09-01T09:15:00Z',
    updated_at: '2026-09-01T09:15:00Z'
  },
  {
    id: 'm-4',
    source_type: 'admin',
    fee_type: 'AGENCY',
    fee_percentage: 2,
    name: 'Pulverizador Autopropelido Jacto Uniport 3030',
    brand: 'Jacto',
    model: 'Uniport 3030',
    category_id: 'cat-pulverizadores',
    year: 2019,
    hours: 3200,
    price: null, // Consulte o valor
    city: 'Patos de Minas',
    state: 'MG',
    location: 'Patos de Minas / MG',
    description: 'Pulverizador Autopropelido Jacto Uniport 3030 com barra de 36 metros. Sistema de corte bico a bico, controle de altura automático de barras.',
    specifications: {
      'Reservatório': '3.000 Litros',
      'Tamanho de Barra': '36 Metros'
    },
    images: [
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'APPROVED',
    featured: false,
    advertiser_id: 'adv-admin',
    advertiser_name: 'Administração AgroMáquinas',
    advertiser_whatsapp: '5527998887777',
    created_at: '2026-09-05T11:20:00Z',
    updated_at: '2026-09-05T11:20:00Z'
  },
  {
    id: 'm-5',
    source_type: 'advertiser',
    fee_type: 'GROUP',
    fee_percentage: 1,
    name: 'Trator New Holland T7.240 Premium 4x4',
    brand: 'New Holland',
    model: 'T7.240',
    category_id: 'cat-tratores',
    year: 2022,
    hours: 1550,
    price: 495000,
    city: 'Rondonópolis',
    state: 'MT',
    location: 'Rondonópolis / MT',
    description: 'Trator New Holland T7.240 em excelente conservação. Transmissão AutoCommand CVT, rodado duplo traseiro.',
    specifications: {
      'Potência Nominal': '197 CV',
      'Transmissão': 'AutoCommand CVT'
    },
    images: [
      'https://images.unsplash.com/photo-1589876076263-9785265da362?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'APPROVED',
    featured: true,
    advertiser_id: 'adv-3',
    advertiser_name: 'Fazenda Terra Verde (Sérgio)',
    advertiser_whatsapp: '5566991234567',
    created_at: '2026-09-08T16:00:00Z',
    updated_at: '2026-09-08T16:00:00Z'
  },
  {
    id: 'm-6',
    source_type: 'advertiser',
    fee_type: 'GROUP',
    fee_percentage: 1,
    name: 'Distribuidor de Adubo Valtra Hércules 10000',
    brand: 'Stara / Valtra',
    model: 'Hércules 10000',
    category_id: 'cat-distribuidores',
    year: 2021,
    hours: null,
    price: 135000,
    city: 'Chapecó',
    state: 'SC',
    location: 'Chapecó / SC',
    description: 'Distribuidor de adubo e calcário a lanço Hércules 10.000. Esteira de borracha, discos de distribuição inox.',
    specifications: {
      'Capacidade de Carga': '10.000 Kg'
    },
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'SOLD', // MÁQUINA VENDIDA
    sold_at: '2026-09-12',
    sold_time: '14:30',
    sold_notes: 'Vendido via intermediação da plataforma para produtor de Santa Catarina.',
    featured: false,
    advertiser_id: 'adv-1',
    advertiser_name: 'Carlos Oliveira (Carlos Máquinas)',
    advertiser_whatsapp: '5527999112233',
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-09-12T14:30:00Z'
  },
  {
    id: 'm-7',
    source_type: 'advertiser',
    fee_type: 'GROUP',
    fee_percentage: 1,
    name: 'Trator Case IH Farmall 100 Cabinado 4x4',
    brand: 'Case IH',
    model: 'Farmall 100',
    category_id: 'cat-tratores',
    year: 2022,
    hours: 1200,
    price: 298000,
    city: 'Passo Fundo',
    state: 'RS',
    location: 'Passo Fundo / RS',
    description: 'Trator Case IH Farmall 100 CV, único dono, seminovo. Utilizado apenas para pulverização e trabalhos leves.',
    specifications: {
      'Potência': '100 CV',
      'Horas': '1.200 hrs'
    },
    images: [
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PENDING', // PENDENTE DE APROVAÇÃO
    featured: false,
    advertiser_id: 'adv-2',
    advertiser_name: 'Marcos Antônio Ribeiro',
    advertiser_whatsapp: '5545997771122',
    created_at: '2026-09-16T09:00:00Z',
    updated_at: '2026-09-16T09:00:00Z'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    seller_name: 'Marcos Antônio Ribeiro',
    seller_whatsapp: '5545997771122',
    seller_email: 'marcos.ribeiro@fazenda.com.br',
    city: 'Passo Fundo',
    state: 'RS',
    machine_id: 'm-7',
    sale_type: 'GROUP',
    status: 'PENDING',
    created_at: '2026-09-16T09:00:00Z'
  }
];

export const INITIAL_INTERESTS: Interest[] = [
  {
    id: 'int-1',
    machine_id: 'm-1',
    machine_name: 'Trator John Deere 6110J 4x4 Cabinado',
    advertiser_name: 'Administração AgroMáquinas',
    advertiser_id: 'adv-admin',
    name: 'João Silva',
    whatsapp: '5527999881122',
    email: 'joao.silva@produtorrural.com.br',
    message: 'Olá, gostaria de saber se aceita trator de menor valor na troca e como funciona o frete para São Mateus-ES.',
    status: 'NEW',
    created_at: '2026-09-16T08:30:00Z',
    date_str: '16/09/2026',
    time_str: '08:30'
  },
  {
    id: 'int-2',
    machine_id: 'm-2',
    machine_name: 'Colheitadeira Massey Ferguson MF 9695 Duals',
    advertiser_name: 'Carlos Oliveira (Carlos Máquinas)',
    advertiser_id: 'adv-1',
    name: 'Sérgio Barbosa',
    whatsapp: '5564996543210',
    email: 'sergio@fazendasul.com.br',
    message: 'Tenho interesse imediato na colheitadeira MF 9695. Gostaria de agendar uma vistoria mecânica nesta semana.',
    status: 'CONTACTED',
    created_at: '2026-09-14T15:20:00Z',
    date_str: '14/09/2026',
    time_str: '15:20'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    user: 'João Silva',
    action: 'demonstrou interesse no Trator John Deere 6110J',
    target_name: 'Trator John Deere 6110J',
    created_at: '2026-09-16T08:30:00Z',
    date_str: '16/09/2026',
    time_str: '08:30'
  },
  {
    id: 'act-2',
    user: 'Marcos Antônio Ribeiro',
    action: 'anunciou a máquina Trator Case IH Farmall 100',
    target_name: 'Trator Case IH Farmall 100',
    created_at: '2026-09-16T09:00:00Z',
    date_str: '16/09/2026',
    time_str: '09:00'
  },
  {
    id: 'act-3',
    user: 'Carlos Oliveira',
    action: 'marcou o Distribuidor Valtra Hércules como VENDIDA',
    target_name: 'Distribuidor Valtra Hércules',
    created_at: '2026-09-12T14:30:00Z',
    date_str: '12/09/2026',
    time_str: '14:30'
  }
];

export const INITIAL_AGENCY_DEALS: AgencyDeal[] = [
  {
    id: 'deal-1',
    title: 'Venda Intermediada - Colheitadeira MF 9695',
    deal_type: 'MACHINE',
    client_name: 'Sérgio Barbosa',
    client_whatsapp: '5564996543210',
    status: 'NEGOTIATING',
    notes: 'Cliente fez oferta de 1.100.000 à vista. Vendedor analisando.',
    created_at: '2026-09-14T16:00:00Z'
  }
];
