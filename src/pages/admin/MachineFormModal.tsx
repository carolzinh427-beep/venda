import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Machine, SourceType, OwnerType, MachineStatus, FeeType } from '../../types';
import { X, Save, Upload, Plus, Trash2, ShieldCheck, UserCheck } from 'lucide-react';

interface MachineFormModalProps {
  initialMachine?: Machine | null;
  defaultOwnerType?: string;
  onClose: () => void;
}

export const MachineFormModal: React.FC<MachineFormModalProps> = ({ 
  initialMachine, 
  defaultOwnerType = 'admin', 
  onClose 
}) => {
  const { categories, addMachine, updateMachine } = useApp();

  const [sourceType, setSourceType] = useState<SourceType>(
    initialMachine?.source_type || (defaultOwnerType === 'THIRD_PARTY' ? 'advertiser' : 'admin')
  );
  const [feeType, setFeeType] = useState<FeeType>(initialMachine?.fee_type || 'GROUP');
  const [feePercentage, setFeePercentage] = useState<number>(initialMachine?.fee_percentage || 1);
  const [status, setStatus] = useState<MachineStatus>(initialMachine?.status || 'APPROVED');
  
  const [name, setName] = useState(initialMachine?.name || '');
  const [brand, setBrand] = useState(initialMachine?.brand || '');
  const [model, setModel] = useState(initialMachine?.model || '');
  const [categoryId, setCategoryId] = useState(initialMachine?.category_id || 'cat-tratores');
  const [year, setYear] = useState<number>(initialMachine?.year || new Date().getFullYear());
  const [hours, setHours] = useState<string>(initialMachine?.hours ? initialMachine.hours.toString() : '');
  const [price, setPrice] = useState<string>(initialMachine?.price ? initialMachine.price.toString() : '');
  const [city, setCity] = useState(initialMachine?.city || 'Linhares');
  const [state, setState] = useState(initialMachine?.state || 'ES');
  const [location, setLocation] = useState(initialMachine?.location || 'Linhares / ES');
  const [description, setDescription] = useState(initialMachine?.description || '');
  const [featured, setFeatured] = useState<boolean>(initialMachine?.featured || false);
  const [advertiserName, setAdvertiserName] = useState(initialMachine?.advertiser_name || initialMachine?.seller_name || '');
  const [advertiserWhatsapp, setAdvertiserWhatsapp] = useState(initialMachine?.advertiser_whatsapp || initialMachine?.seller_whatsapp || '');

  // Specifications
  const initialSpecs = initialMachine?.specifications 
    ? Object.entries(initialMachine.specifications).map(([key, val]) => ({ key, val }))
    : [
        { key: 'Potência', val: '' },
        { key: 'Transmissão', val: '' },
        { key: 'Cabine', val: '' }
      ];
  const [specs, setSpecs] = useState<{ key: string; val: string }[]>(initialSpecs);

  // Images
  const [images, setImages] = useState<string[]>(initialMachine?.images || []);
  const [newUrl, setNewUrl] = useState('');

  const handleAddImage = () => {
    if (newUrl.trim()) {
      setImages(prev => [...prev, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    setSpecs(prev => [...prev, { key: '', val: '' }]);
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand || !model) return;

    const formattedSpecs: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key.trim() && s.val.trim()) {
        formattedSpecs[s.key.trim()] = s.val.trim();
      }
    });

    const parsedPrice = price ? parseFloat(price) : null;
    const parsedHours = hours ? parseInt(hours, 10) : null;
    const finalImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80'];

    const ownerTypeValue: OwnerType = sourceType === 'admin' ? 'PLATFORM' : 'THIRD_PARTY';

    const machineData = {
      source_type: sourceType,
      owner_type: ownerTypeValue,
      fee_type: feeType,
      fee_percentage: feeType === 'AGENCY' ? 2 : 1,
      name,
      brand,
      model,
      category_id: categoryId,
      year: Number(year),
      hours: parsedHours,
      price: parsedPrice,
      city: city || 'Linhares',
      state: state || 'ES',
      location: location || `${city}/${state}`,
      description,
      specifications: formattedSpecs,
      images: finalImages,
      status,
      featured,
      advertiser_name: advertiserName || undefined,
      advertiser_whatsapp: advertiserWhatsapp || undefined,
      seller_name: advertiserName || undefined,
      seller_whatsapp: advertiserWhatsapp || undefined,
    };

    if (initialMachine) {
      updateMachine(initialMachine.id, machineData);
    } else {
      addMachine(machineData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-agro-leaf/30 text-left flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="bg-agro-dark text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-agro-leaf text-agro-accent">
              {sourceType === 'admin' ? <ShieldCheck className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold">
                {initialMachine ? 'Editar Anúncio / Máquina' : 'Cadastrar Máquina no Estoque'}
              </h2>
              <span className="text-xs text-gray-300">
                {sourceType === 'admin' ? 'Máquina Própria (source_type = admin)' : 'Máquina de Terceiro (source_type = advertiser)'}
              </span>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* OWNER TYPE, FEE & STATUS SELECTORS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-agro-cream rounded-2xl border border-agro-leaf/20">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Origem (source_type)</label>
              <select
                value={sourceType}
                onChange={(e: any) => setSourceType(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                <option value="admin">Administrador (admin)</option>
                <option value="advertiser">Anunciante Terceiro (advertiser)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Modalidade & Taxa</label>
              <select
                value={feeType}
                onChange={(e: any) => setFeeType(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                <option value="GROUP">Anúncio Grupo (1%)</option>
                <option value="AGENCY">Agenciamento (2%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status de Moderação</label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                <option value="APPROVED">APPROVED (Aprovado)</option>
                <option value="PENDING">PENDING (Pendente)</option>
                <option value="SOLD">SOLD (Vendido)</option>
                <option value="HIDDEN">HIDDEN (Oculto)</option>
                <option value="REJECTED">REJECTED (Rejeitado)</option>
              </select>
            </div>
          </div>

          {/* MAIN INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome / Título da Máquina *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Trator John Deere 6110J 4x4 Cabinado"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Categoria *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
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
                placeholder="Ex: John Deere"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Modelo *</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ex: 6110J"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ano *</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Horas de Uso</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Ex: 2450"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Preço R$ (vazio = Consulte)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 345000"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cidade *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Linhares"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Estado (UF) *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Ex: ES"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          {/* ADVERTISER DETAILS */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1">Nome do Anunciante</label>
              <input
                type="text"
                value={advertiserName}
                onChange={(e) => setAdvertiserName(e.target.value)}
                placeholder="Ex: Carlos Oliveira"
                className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1">WhatsApp do Anunciante</label>
              <input
                type="tel"
                value={advertiserWhatsapp}
                onChange={(e) => setAdvertiserWhatsapp(e.target.value)}
                placeholder="Ex: (27) 99888-7777"
                className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-medium"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Descrição Completa *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o histórico do equipamento..."
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
            />
          </div>

          {/* IMAGES */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700">Imagens da Máquina</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Insira URL da imagem..."
                className="flex-1 p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-agro-leaf text-white text-xs font-bold px-3 rounded-lg"
              >
                Adicionar URL
              </button>

              <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 pt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative h-20 rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-md"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SPECIFICATIONS LIST */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gray-700">Especificações Técnicas (Tabela)</label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-xs font-bold text-agro-leaf flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Linha</span>
              </button>
            </div>

            <div className="space-y-2">
              {specs.map((s, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Nome da Especificação (Ex: Potência)"
                    value={s.key}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[idx].key = e.target.value;
                      setSpecs(newSpecs);
                    }}
                    className="w-1/2 p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Valor (Ex: 110 CV)"
                    value={s.val}
                    onChange={(e) => {
                      const newSpecs = [...specs];
                      newSpecs[idx].val = e.target.value;
                      setSpecs(newSpecs);
                    }}
                    className="w-1/2 p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="p-1 text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 font-bold text-xs px-5 py-3 rounded-xl"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-agro-leaf hover:bg-agro-dark text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Anúncio / Máquina</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
