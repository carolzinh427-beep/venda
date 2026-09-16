import { Machine, Category, CompanySettings, Announcement, Interest, AgencyDeal } from '../types';

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
  { id: 'cat-distribuidores', name: 'Distribuidores', slug: 'distribuidores', iconName: 'ScatterPlot' },
  { id: 'cat-equipamentos', name: 'Equipamentos agrícolas', slug: 'equipamentos', iconName: 'Cog' },
  { id: 'cat-outros', name: 'Outros', slug: 'outros', iconName: 'MoreHorizontal' },
];

export const INITIAL_MACHINES: Machine[] = [
  {
    id: 'm-1',
    owner_type: 'PLATFORM',
    name: 'Trator John Deere 6110J 4x4 Cabinado',
    brand: 'John Deere',
    model: '6110J',
    category_id: 'cat-tratores',
    year: 2021,
    hours: 2450,
    price: 345000,
    location: 'Linhares / ES',
    description: 'Trator John Deere 6110J em excelente estado de conservação. Único dono, todas as revisões feitas em concessionária autorizada. Cabine original com ar condicionado, transmissão PowerQuad 16x16, piloto automático pronto. Pneus radiais com 80% de vida útil.',
    specifications: {
      'Potência do Motor': '110 CV',
      'Transmissão': 'PowerQuad 16x16',
      'Tração': '4x4 Auxiliar',
      'Horas de Uso': '2.450 hrs',
      'Cabine': 'Original com Ar-Condicionado',
      'Piloto Automático': 'Preparado (Autotrac Ready)',
      'Estado dos Pneus': '80% de vida útil',
      'Combustível': 'Diesel'
    },
    images: [
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589876076263-9785265da362?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PUBLISHED',
    featured: true,
    created_at: '2026-08-10T10:00:00Z',
    updated_at: '2026-08-10T10:00:00Z'
  },
  {
    id: 'm-2',
    owner_type: 'PLATFORM',
    name: 'Colheitadeira Massey Ferguson MF 9695 Duals',
    brand: 'Massey Ferguson',
    model: 'MF 9695',
    category_id: 'cat-colheitadeiras',
    year: 2020,
    hours: 1890,
    price: 1150000,
    location: 'Rio Verde / GO',
    description: 'Colheitadeira Massey Ferguson MF 9695 classe 6 de rotor. Acompanha plataforma de soja draper de 30 pés. MÁQUINA DE REVISÃO EM DIA. Sistema de trilha axial, picador de palha reforçado e monitor de produtividade de precisão.',
    specifications: {
      'Motor': 'AGCO Power 350 CV',
      'Sistema de Colheita': 'Rotor Axial Single',
      'Horas de Rotor': '1.420 hrs',
      'Horas de Motor': '1.890 hrs',
      'Plataforma': 'Draper 30 Pés',
      'Tanque de Grãos': '10.570 Litros',
      'Transmissão': 'Hidrostática 3 velocidades'
    },
    images: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530267981608-bc7e0294e098?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PUBLISHED',
    featured: true,
    created_at: '2026-08-15T14:30:00Z',
    updated_at: '2026-08-15T14:30:00Z'
  },
  {
    id: 'm-3',
    owner_type: 'THIRD_PARTY',
    name: 'Plantadeira Stara Cinderela 15 Linhas Pneumática',
    brand: 'Stara',
    model: 'Cinderela 15',
    category_id: 'cat-plantadeiras',
    year: 2022,
    hours: null,
    price: 280000,
    location: 'Cascavel / PR',
    description: 'Plantadeira Stara Cinderela de 15 linhas com espaçamento de 45cm. Dosadores pneumáticos de semente Precision Planting VSet2, caixa central de sementes, desligamento linha a linha e monitor Topper 5500. Equipamento em ótimo estado de pintura e estrutura.',
    specifications: {
      'Número de Linhas': '15 linhas',
      'Espaçamento': '45 cm',
      'Dosador de Semente': 'Pneumático Precision Planting',
      'Desligamento de Linha': 'Sim (Linha a Linha)',
      'Monitor': 'Topper 5500',
      'Reservatório': 'Caixa Central'
    },
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PUBLISHED',
    featured: true,
    created_at: '2026-09-01T09:15:00Z',
    updated_at: '2026-09-01T09:15:00Z',
    seller_name: 'Marcos Antônio Ribeiro',
    seller_whatsapp: '5545997771122'
  },
  {
    id: 'm-4',
    owner_type: 'PLATFORM',
    name: 'Pulverizador Autopropelido Jacto Uniport 3030',
    brand: 'Jacto',
    model: 'Uniport 3030',
    category_id: 'cat-pulverizadores',
    year: 2019,
    hours: 3200,
    price: null, // Consulte o valor
    location: 'Patos de Minas / MG',
    description: 'Pulverizador Autopropelido Jacto Uniport 3030 com barra de 36 metros. Sistema de corte bico a bico, controle de altura automático de barras (Otis), motor Cummins 243 CV. Transmissão hidrostática 4x4 inteligente. Entre em contato para consultar o valor e condições.',
    specifications: {
      'Reservatório': '3.000 Litros',
      'Tamanho de Barra': '36 Metros',
      'Corte de Seção': 'Bico a Bico (PWM)',
      'Motor': 'Cummins 243 CV',
      'Transmissão': 'Hidrostática 4x4',
      'Sensor de Barras': 'Sim (5 Sensores)'
    },
    images: [
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PUBLISHED',
    featured: false,
    created_at: '2026-09-05T11:20:00Z',
    updated_at: '2026-09-05T11:20:00Z'
  },
  {
    id: 'm-5',
    owner_type: 'THIRD_PARTY',
    name: 'Trator New Holland T7.240 Premium 4x4',
    brand: 'New Holland',
    model: 'T7.240',
    category_id: 'cat-tratores',
    year: 2022,
    hours: 1550,
    price: 495000,
    location: 'Rondonópolis / MT',
    description: 'Trator New Holland T7.240 em excelente conservação. Potência nominal de 197 CV e máxima de 234 CV. Transmissão AutoCommand CVT, rodado duplo traseiro, suspense dianteira ativa, cabine Horizon de alto conforto. Pronto para operação imediata.',
    specifications: {
      'Potência Nominal': '197 CV',
      'Potência Máxima': '234 CV',
      'Transmissão': 'AutoCommand CVT',
      'Rodado': 'Duplo Traseiro (Radial)',
      'Horas de Uso': '1.550 hrs',
      'Suspensão Dianteira': 'Ativa Terraglide'
    },
    images: [
      'https://images.unsplash.com/photo-1589876076263-9785265da362?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PUBLISHED',
    featured: true,
    created_at: '2026-09-08T16:00:00Z',
    updated_at: '2026-09-08T16:00:00Z',
    seller_name: 'Fazenda Terra Verde (Carlos)',
    seller_whatsapp: '5566991234567'
  },
  {
    id: 'm-6',
    owner_type: 'PLATFORM',
    name: 'Carreta Agrícola Graneleira Jan Bulk 14000',
    brand: 'Jan',
    model: 'Bulk 14000',
    category_id: 'cat-carretas',
    year: 2023,
    hours: null,
    price: 98000,
    location: 'Linhares / ES',
    description: 'Carreta Graneleira Jan Bulk 14.000 litros seminova. Tubo de descarga de 400mm com alta vazão de escoamento. Lona fácil retrátil, pneus de alta flutuação. Sem nenhum empeno ou avaria em chassi.',
    specifications: {
      'Capacidade': '14.000 Litros / 11 Toneladas',
      'Diâmetro do Tubo': '400 mm',
      'Tempo de Descarga': 'Aproximadamente 2 minutos',
      'Rodado': 'Tandem com Pneus Flutuação',
      'Lona': 'Sistema Lona Fácil'
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PUBLISHED',
    featured: false,
    created_at: '2026-09-10T10:45:00Z',
    updated_at: '2026-09-10T10:45:00Z'
  },
  {
    id: 'm-7',
    owner_type: 'THIRD_PARTY',
    name: 'Distribuidor de Adubo Valtra Agco Hércules 10000',
    brand: 'Stara / Valtra',
    model: 'Hércules 10000',
    category_id: 'cat-distribuidores',
    year: 2021,
    hours: null,
    price: 135000,
    location: 'Chapeco / SC',
    description: 'Distribuidor de adubo e calcário a lanço Hércules 10.000. Esteira de borracha, discos de distribuição inox de 36 metros de largura de trabalho. Desligamento de seções e taxa variável.',
    specifications: {
      'Capacidade de Carga': '10.000 Kg',
      'Faixa de Distribuição': 'Até 36 metros',
      'Esteira': 'Borracha com auto-centralização',
      'Taxa Variável': 'Compatível com ISO-BUS'
    },
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'SOLD', // Exemplo de máquina vendida
    featured: false,
    created_at: '2026-08-01T08:00:00Z',
    updated_at: '2026-09-12T15:00:00Z',
    seller_name: 'Roberto Silveira',
    seller_whatsapp: '5549999887766'
  },
  {
    id: 'm-8',
    owner_type: 'THIRD_PARTY',
    name: 'Trator Case IH Farmall 100 Cabinado 4x4',
    brand: 'Case IH',
    model: 'Farmall 100',
    category_id: 'cat-tratores',
    year: 2022,
    hours: 1200,
    price: 298000,
    location: 'Paso Fundo / RS',
    description: 'Trator Case IH Farmall 100 CV, único dono, seminovo. Utilizado apenas para pulverização e trabalhos leves. Cabine original com ar trincando de gelado. Anúncio enviado por parceiro terceiro.',
    specifications: {
      'Potência': '100 CV',
      'Horas': '1.200 hrs',
      'Câmbio': '12x12 Synchro Shuttle',
      'Tomada de Força': '540 / 1000 RPM'
    },
    images: [
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'PENDING', // PENDENTE DE APROVAÇÃO ADMIN
    featured: false,
    created_at: '2026-09-16T09:00:00Z',
    updated_at: '2026-09-16T09:00:00Z',
    seller_name: 'Luciano Mendes',
    seller_whatsapp: '5554988776655'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    seller_name: 'Luciano Mendes',
    seller_whatsapp: '5554988776655',
    seller_email: 'luciano.mendes@agrimendes.com.br',
    city: 'Passo Fundo',
    state: 'RS',
    machine_id: 'm-8',
    sale_type: 'GROUP_AD', // 1%
    status: 'PENDING',
    created_at: '2026-09-16T09:00:00Z'
  },
  {
    id: 'ann-2',
    seller_name: 'Marcos Antônio Ribeiro',
    seller_whatsapp: '5545997771122',
    seller_email: 'marcos.ribeiro@fazenda.com.br',
    city: 'Cascavel',
    state: 'PR',
    machine_id: 'm-3',
    sale_type: 'AGENCY', // 2%
    status: 'PUBLISHED',
    created_at: '2026-09-01T09:15:00Z'
  }
];

export const INITIAL_INTERESTS: Interest[] = [
  {
    id: 'int-1',
    machine_id: 'm-1',
    machine_name: 'Trator John Deere 6110J 4x4 Cabinado',
    name: 'João Silva',
    whatsapp: '5527999881122',
    email: 'joao.silva@produtorrural.com.br',
    message: 'Olá, gostaria de saber se aceita trator de menor valor na troca e como funciona o frete para São Mateus-ES.',
    status: 'NEW',
    created_at: '2026-09-16T08:30:00Z'
  },
  {
    id: 'int-2',
    machine_id: 'm-2',
    machine_name: 'Colheitadeira Massey Ferguson MF 9695 Duals',
    name: 'Sérgio Barbosa',
    whatsapp: '5564996543210',
    email: 'sergio@fazendasul.com.br',
    message: 'Tenho interesse imediato na colheitadeira MF 9695. Gostaria de agendar uma vistoria mecânica nesta semana.',
    status: 'CONTACTED',
    created_at: '2026-09-14T15:20:00Z'
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
  },
  {
    id: 'deal-2',
    title: 'Agenciamento Fazenda 450 Hectares em Linhares',
    deal_type: 'FARM',
    client_name: 'Dr. Fernando Alvarenga',
    client_whatsapp: '5527999112233',
    status: 'PROMOTING',
    notes: 'Propriedade com cultivo de café conilon e mamão. Documentação 100% regularizada.',
    created_at: '2026-09-02T10:00:00Z'
  }
];
