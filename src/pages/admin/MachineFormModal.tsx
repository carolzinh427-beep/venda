import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Machine, OwnerType, MachineStatus } from '../../types';
import { X, Save, Upload, Plus, Trash2, ShieldCheck, UserCheck } from 'lucide-react';

interface MachineFormModalProps {
  initialMachine?: Machine | null;
  defaultOwnerType?: OwnerType;
  onClose: () => void;
}

export const MachineFormModal: React.FC<MachineFormModalProps> = ({ 
  initialMachine, 
  defaultOwnerType = 'PLATFORM', 
  onClose 
}) => {
  const { categories, addMachine, updateMachine } = useApp();

  const [ownerType, setOwnerType] = useState<OwnerType>(initialMachine?.owner_type || defaultOwnerType);
  const [status, setStatus] = useState<MachineStatus>(initialMachine?.status || 'PUBLISHED');
  const [name, setName] = useState(initialMachine?.name || '');
  const [brand, setBrand] = useState(initialMachine?.brand || '');
  const [model, setModel] = useState(initialMachine?.model || '');
  const [categoryId, setCategoryId] = useState(initialMachine?.category_id || 'cat-tratores');
  const [year, setYear] = useState<number>(initialMachine?.year || new Date().getFullYear());
  const [hours, setHours] = useState<string>(initialMachine?.hours ? initialMachine.hours.toString() : '');
  const [price, setPrice] = useState<string>(initialMachine?.price ? initialMachine.price.toString() : '');
  const [location, setLocation] = useState(initialMachine?.location || '');
  const [description, setDescription] = useState(initialMachine?.description || '');
  const [featured, setFeatured] = useState<boolean>(initialMachine?.featured || false);
  const [sellerName, setSellerName] = useState(initialMachine?.seller_name || '');
  const [sellerWhatsapp, setSellerWhatsapp] = useState(initialMachine?.seller_whatsapp || '');

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

    const machineData = {
      owner_type: ownerType,
      name,
      brand,
      model,
      category_id: categoryId,
      year: Number(year),
      hours: parsedHours,
      price: parsedPrice,
      location: location || 'Linhares / ES',
      description,
      specifications: formattedSpecs,
      images: finalImages,
      status,
      featured,
      seller_name: sellerName || undefined,
      seller_whatsapp: sellerWhatsapp || undefined,
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
              {ownerType === 'PLATFORM' ? <ShieldCheck className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold">
                {initialMachine ? 'Editar Máquina' : 'Cadastrar Máquina no Estoque'}
              </h2>
              <span className="text-xs text-gray-300">
                {ownerType === 'PLATFORM' ? 'Máquina Própria da Plataforma' : 'Máquina de Terceiro Agenciada'}
              </span>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* OWNER TYPE & STATUS SELECTORS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-agro-cream rounded-2xl border border-agro-leaf/20">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Origem do Cadastro</label>
              <select
                value={ownerType}
                onChange={(e: any) => setOwnerType(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                <option value="PLATFORM">Máquina Própria (PLATFORM)</option>
                <option value="THIRD_PARTY">Anúncio de Terceiro (THIRD_PARTY)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status de Exibição</label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800"
              >
                <option value="PUBLISHED">Publicado (Visível)</option>
                <option value="PENDING">Pendente (Moderação)</option>
                <option value="NEGOTIATING">Em Negociação</option>
                <option value="SOLD">Vendido</option>
                <option value="REJECTED">Rejeitado</option>
                <option value="INACTIVE">Inativo (Oculto)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-agro-dark">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-agro-leaf rounded focus:ring-agro-leaf"
                />
                <span>Destacar na Home</span>
              </label>
            </div>
          </div>

          {/* MAIN INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome da Máquina *</label>
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Preço em R$ (vazio = Consulte)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 345000"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Localização *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Linhares / ES"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          {/* SELLER DATA IF THIRD PARTY */}
          {ownerType === 'THIRD_PARTY' && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">Nome do Vendedor Terceiro</label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">WhatsApp do Vendedor Terceiro</label>
                <input
                  type="tel"
                  value={sellerWhatsapp}
                  onChange={(e) => setSellerWhatsapp(e.target.value)}
                  placeholder="Ex: (27) 99888-7777"
                  className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Descrição Detalhada *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o histórico do equipamento..."
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm"
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
              <span>Salvar Máquina</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
