import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SaleType } from '../types';
import { 
  PlusCircle, Upload, CheckCircle2, ShieldCheck, X, Image as ImageIcon, 
  ArrowRight, DollarSign, User, Phone, Mail, MapPin, Tractor, AlertCircle 
} from 'lucide-react';

interface AnnouncePageProps {
  onBackToHome: () => void;
}

export const AnnouncePage: React.FC<AnnouncePageProps> = ({ onBackToHome }) => {
  const { categories, addAnnouncement } = useApp();

  const [saleType, setSaleType] = useState<SaleType>('GROUP_AD');
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');

  // Form Fields
  const [sellerName, setSellerName] = useState('');
  const [sellerWhatsapp, setSellerWhatsapp] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('ES');

  const [machineName, setMachineName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [categoryId, setCategoryId] = useState('cat-tratores');
  const [year, setYear] = useState(new Date().getFullYear());
  const [hours, setHours] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  // Custom specifications list
  const [specsList, setSpecsList] = useState<{ key: string; val: string }[]>([
    { key: 'Potência', val: '' },
    { key: 'Cabine', val: '' },
  ]);

  // Images state
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImageUrls(prev => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImageUrls(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSpecRow = () => {
    setSpecsList(prev => [...prev, { key: '', val: '' }]);
  };

  const handleRemoveSpecRow = (idx: number) => {
    setSpecsList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName || !sellerWhatsapp || !machineName || !brand || !model) return;

    // Convert specs array to object
    const specifications: Record<string, string> = {};
    specsList.forEach(s => {
      if (s.key.trim() && s.val.trim()) {
        specifications[s.key.trim()] = s.val.trim();
      }
    });

    const parsedPrice = price ? parseFloat(price.replace(/\D/g, '')) : null;
    const parsedHours = hours ? parseInt(hours, 10) : null;

    const defaultSampleImage = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80';
    const finalImages = imageUrls.length > 0 ? imageUrls : [defaultSampleImage];

    addAnnouncement({
      seller_name: sellerName,
      seller_whatsapp: sellerWhatsapp,
      seller_email: sellerEmail || undefined,
      city: city || 'Linhares',
      state: state || 'ES',
      sale_type: saleType,
      machineData: {
        name: machineName,
        brand,
        model,
        category_id: categoryId,
        year: Number(year),
        hours: parsedHours,
        price: parsedPrice,
        location: location || `${city}/${state}`,
        description,
        specifications,
        images: finalImages,
        featured: false
      }
    });

    setStep('success');
  };

  return (
    <div className="py-10 bg-agro-cream min-h-screen animate-fade-in text-agro-graphite">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SUCCESS STATE */}
        {step === 'success' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-agro-leaf/20 max-w-2xl mx-auto space-y-6 my-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-200">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-widest text-agro-leaf bg-agro-leaf/10 px-3 py-1 rounded-full">
              Anúncio Enviado com Sucesso
            </span>

            <h1 className="text-3xl font-extrabold text-agro-dark">Seu anúncio foi recebido!</h1>

            <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
              Obrigado por cadastrar sua máquina na nossa rede. Todo anúncio passa por uma verificação no painel administrativo com status <strong className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">PENDENTE</strong> antes de ser publicado no catálogo público.
            </p>

            <div className="p-4 bg-agro-cream rounded-2xl text-xs text-left space-y-2 border border-agro-leaf/10">
              <div className="flex justify-between">
                <span className="font-bold text-gray-500">Máquina:</span>
                <span className="font-bold text-agro-dark">{machineName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-500">Modalidade Escolhida:</span>
                <span className="font-bold text-emerald-700">
                  {saleType === 'GROUP_AD' ? 'Anúncio no Grupo (Taxa de 1%)' : 'Venda por Agenciamento (Taxa de 2%)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-500">Contato:</span>
                <span className="font-semibold text-gray-800">{sellerWhatsapp}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onBackToHome}
                className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-colors w-full"
              >
                Voltar para a Página Inicial
              </button>
            </div>
          </div>
        )}

        {/* INTRO STEP */}
        {step === 'intro' && (
          <div className="space-y-10">
            
            {/* HEADER HERO BANNER */}
            <div className="bg-gradient-to-r from-agro-dark via-agro-green to-agro-dark text-white rounded-3xl p-8 sm:p-12 text-left relative overflow-hidden shadow-2xl border border-agro-leaf/30">
              <div className="max-w-2xl relative z-10 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-agro-accent bg-agro-accent/15 px-3 py-1 rounded-full border border-agro-accent/30">
                  Rede de Compradores Agrícolas
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Venda sua máquina através da nossa rede
                </h1>

                <p className="text-base text-gray-200 leading-relaxed font-normal">
                  Você pode anunciar sua máquina no nosso grupo e alcançar pessoas interessadas em máquinas e implementos agrícolas em todo o Brasil.
                </p>
              </div>
            </div>

            {/* MODALITY SELECTION CARDS */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-agro-dark text-left border-l-4 border-agro-leaf pl-3">
                Escolha a modalidade de venda desejada
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                
                {/* OPTION 1 CARD */}
                <div 
                  onClick={() => setSaleType('GROUP_AD')}
                  className={`cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all shadow-md relative flex flex-col justify-between ${
                    saleType === 'GROUP_AD' 
                      ? 'border-emerald-600 ring-4 ring-emerald-500/10 bg-emerald-50/20' 
                      : 'border-gray-200 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        Opção 1 — Anúncio no Grupo
                      </span>
                      <span className="text-3xl font-black text-emerald-700">1%</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-agro-dark mb-2">Anúncio no Grupo</h3>
                    
                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      Você anuncia sua máquina no grupo e recebe os contatos dos interessados. Taxa de 1% sobre a máquina vendida.
                    </p>

                    <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-700 space-y-1.5 border border-gray-200">
                      <p className="font-bold text-agro-dark">✓ Seu anúncio publicado na rede</p>
                      <p className="font-bold text-agro-dark">✓ Você atende os compradores diretamente</p>
                      <p className="font-bold text-agro-dark">✓ Taxa de 1% devida na venda</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSaleType('GROUP_AD');
                      setStep('form');
                    }}
                    className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow"
                  >
                    <span>Quero anunciar no grupo (1%)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* OPTION 2 CARD */}
                <div 
                  onClick={() => setSaleType('AGENCY')}
                  className={`cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all shadow-md relative flex flex-col justify-between ${
                    saleType === 'AGENCY' 
                      ? 'border-amber-500 ring-4 ring-amber-500/10 bg-amber-50/20' 
                      : 'border-gray-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                        Opção 2 — Venda por Agenciamento
                      </span>
                      <span className="text-3xl font-black text-amber-600">2%</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-agro-dark mb-2">Venda por Agenciamento</h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      Se preferir, podemos realizar a venda e intermediar a negociação da sua máquina. Taxa de 2% sobre a máquina vendida.
                    </p>

                    <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-700 space-y-1.5 border border-gray-200">
                      <p className="font-bold text-agro-dark">✓ Nós filtramos e atendemos os compradores</p>
                      <p className="font-bold text-agro-dark">✓ Intermediação comercial especializada</p>
                      <p className="font-bold text-agro-dark">✓ Taxa de 2% devida na venda</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSaleType('AGENCY');
                      setStep('form');
                    }}
                    className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow"
                  >
                    <span>Quero que vocês vendam (2%)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* FORM STEP */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-agro-leaf/20 text-left space-y-8">
            
            {/* FORM HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-agro-leaf">
                  Cadastro de Anúncio
                </span>
                <h2 className="text-2xl font-extrabold text-agro-dark mt-1">Preencha os dados da máquina</h2>
              </div>

              {/* MODALITY SELECTOR RADIO */}
              <div className="bg-agro-cream p-1.5 rounded-xl border border-agro-leaf/20 flex items-center gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSaleType('GROUP_AD')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    saleType === 'GROUP_AD' ? 'bg-emerald-700 text-white shadow' : 'text-gray-600'
                  }`}
                >
                  Anúncio no Grupo (1%)
                </button>
                <button
                  type="button"
                  onClick={() => setSaleType('AGENCY')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    saleType === 'AGENCY' ? 'bg-amber-600 text-white shadow' : 'text-gray-600'
                  }`}
                >
                  Agenciamento (2%)
                </button>
              </div>
            </div>

            {/* SECTION 1: SELLER DATA */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 border-l-2 border-agro-leaf pl-2">
                1. Dados do Vendedor
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo Silveira"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp com DDD *</label>
                  <input
                    type="tel"
                    required
                    value={sellerWhatsapp}
                    onChange={(e) => setSellerWhatsapp(e.target.value)}
                    placeholder="Ex: (27) 99888-7777"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">E-mail (opcional)</label>
                  <input
                    type="email"
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                    placeholder="Ex: carlos@fazenda.com.br"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Cidade da Máquina *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Linhares"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Estado (UF) *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  >
                    {['ES', 'MG', 'BA', 'GO', 'MT', 'MS', 'PR', 'RS', 'SC', 'SP', 'TO', 'MA', 'PI', 'PA'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: MACHINE DATA */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 border-l-2 border-agro-leaf pl-2">
                2. Dados da Máquina
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nome / Título do Anúncio *</label>
                  <input
                    type="text"
                    required
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    placeholder="Ex: Trator John Deere 6110J 4x4 Cabinado"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Categoria *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Marca *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Ex: John Deere, Massey Ferguson, Stara"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Modelo *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Ex: 6110J, MF 9695, Uniport 3030"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ano de Fabricação *</label>
                  <input
                    type="number"
                    required
                    min={1970}
                    max={2027}
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value, 10))}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Horas de Uso (se houver)</label>
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="Ex: 2450"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Preço Desejado (R$)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ex: 345000 (deixe em branco p/ Consulte)"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Localização para Exibição *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ex: Linhares / ES"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Descrição Completa do Equipamento *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o estado de conservação, revisões efetuadas, pneus, cabine, opcionais e detalhes de uso..."
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* SECTION 3: IMAGES UPLOAD & PREVIEW */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 border-l-2 border-agro-leaf pl-2">
                  3. Fotos da Máquina
                </h3>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded">
                  {imageUrls.length} {imageUrls.length === 1 ? 'foto adicionada' : 'fotos adicionadas'}
                </span>
              </div>

              <div className="p-4 bg-agro-cream rounded-2xl border border-agro-leaf/20 space-y-4">
                <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-agro-leaf" />
                  <span>Adicione fotos de diferentes ângulos para apresentar melhor sua máquina.</span>
                </p>

                {/* UPLOADER CONTROLS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* LOCAL FILE INPUT */}
                  <label className="cursor-pointer bg-white border-2 border-dashed border-agro-leaf/40 hover:border-agro-leaf p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all">
                    <Upload className="w-6 h-6 text-agro-leaf mb-1" />
                    <span className="text-xs font-bold text-agro-dark">Upload de Fotos do Aparelho</span>
                    <span className="text-[10px] text-gray-500">Selecione uma ou mais imagens</span>
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  {/* URL INPUT */}
                  <div className="bg-white border border-gray-300 p-3 rounded-xl flex flex-col justify-between">
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Ou cole o link de uma imagem (URL)</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="bg-agro-leaf text-white font-bold text-xs px-3 rounded-lg"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>

                {/* PREVIEW GRID */}
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative group h-24 rounded-xl overflow-hidden border border-gray-300 bg-gray-100">
                        <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-md opacity-90 hover:opacity-100"
                          title="Remover foto"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('intro')}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 underline"
              >
                ← Voltar para Escolha de Modalidade
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-agro-accent to-amber-600 hover:from-amber-600 hover:to-agro-accent text-white font-extrabold text-base px-10 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Enviar Anúncio para Aprovação</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
