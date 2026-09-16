import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, CheckCircle2, Building, Phone, Instagram, Mail, MapPin, Sparkles } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [companyName, setCompanyName] = useState(settings.company_name);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [email, setEmail] = useState(settings.email);
  const [phone, setPhone] = useState(settings.phone);
  const [cityState, setCityState] = useState(settings.city_state);
  const [heroTitle, setHeroTitle] = useState(settings.hero_title);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.hero_subtitle);
  const [farmAgencyTitle, setFarmAgencyTitle] = useState(settings.farm_agency_title);
  const [farmAgencyDescription, setFarmAgencyDescription] = useState(settings.farm_agency_description);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      company_name: companyName,
      whatsapp,
      instagram,
      email,
      phone,
      city_state: cityState,
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      farm_agency_title: farmAgencyTitle,
      farm_agency_description: farmAgencyDescription,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left max-w-4xl">
      
      {/* HEADER */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">Parâmetros Centrais</span>
        <h1 className="text-2xl font-extrabold text-agro-dark">Configurações Globais da Empresa</h1>
        <p className="text-xs text-gray-500">Altere o nome da empresa, dados de WhatsApp, redes sociais e textos principais sem alterar o código.</p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Configurações atualizadas com sucesso! Os novos valores já estão visíveis no site público.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        
        {/* SECTION 1: IDENTITY */}
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold uppercase text-gray-500 border-l-2 border-agro-leaf pl-2">
            1. Identidade & Nome Comercial (company_name)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nome da Empresa (company_name) *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-agro-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cidade / Estado Sede</label>
              <input
                type="text"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CONTACT & SOCIAL */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-extrabold uppercase text-gray-500 border-l-2 border-agro-leaf pl-2">
            2. Canais de Atendimento Centralizados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Número do WhatsApp (com código de país) *</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="5527999887777"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Telefone Exibição público</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(27) 3371-9000"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Instagram Handle</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="agromaquinas.br"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">E-mail Comercial</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: HERO TEXTS */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-extrabold uppercase text-gray-500 border-l-2 border-agro-leaf pl-2">
            3. Textos do Hero Principal (Página Inicial)
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Título do Hero</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-agro-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subtítulo do Hero</label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: FARM AGENCY TEXTS */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-extrabold uppercase text-gray-500 border-l-2 border-agro-leaf pl-2">
            4. Textos da Seção de Agenciamento de Lavouras
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Título do Serviço de Lavouras</label>
              <input
                type="text"
                value={farmAgencyTitle}
                onChange={(e) => setFarmAgencyTitle(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-agro-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Descrição do Serviço de Lavouras</label>
              <textarea
                rows={3}
                value={farmAgencyDescription}
                onChange={(e) => setFarmAgencyDescription(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            className="bg-agro-leaf hover:bg-agro-dark text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Configurações Centrais</span>
          </button>
        </div>

      </form>

    </div>
  );
};
