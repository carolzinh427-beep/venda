import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, CheckCircle2, Lock, Key, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, updateAdminPassword } = useApp();

  // Password fields
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMessage, setPassMessage] = useState<string | null>(null);

  // Settings fields
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

  const [settingsSuccess, setSettingsSuccess] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 4) {
      setPassMessage('A senha deve conter no mínimo 4 caracteres.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassMessage('As senhas não coincidem.');
      return;
    }

    updateAdminPassword(newPass);
    setNewPass('');
    setConfirmPass('');
    setPassMessage('Senha alterada com sucesso!');
    setTimeout(() => setPassMessage(null), 4000);
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
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

    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left max-w-4xl">
      
      {/* HEADER */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-agro-leaf">Parâmetros Centrais</span>
        <h1 className="text-2xl font-extrabold text-agro-dark">Configurações Administrativas</h1>
        <p className="text-xs text-gray-500">Altere a senha de acesso ao painel e as informações centrais da empresa.</p>
      </div>

      {/* 1. CHANGE ADMIN PASSWORD BOX */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Key className="w-5 h-5 text-amber-600" />
          <h2 className="text-base font-extrabold text-agro-dark">Segurança: Alterar Senha Administrativa</h2>
        </div>

        {passMessage && (
          <div className={`p-3 rounded-xl text-xs font-bold ${
            passMessage.includes('sucesso') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {passMessage}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nova Senha</label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Confirmar Nova Senha</label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Atualizar Senha Admin</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. GENERAL COMPANY SETTINGS FORM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <ShieldCheck className="w-5 h-5 text-agro-leaf" />
          <h2 className="text-base font-extrabold text-agro-dark">Informações da Empresa & Textos Públicos</h2>
        </div>

        {settingsSuccess && (
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Configurações salvas com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSettingsSubmit} className="space-y-6">
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
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp (com DDD e código de país) *</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Telefone Exibição</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Instagram Handle</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">E-mail Comercial</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Título Principal do Hero</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subtítulo do Hero</label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Título do Serviço de Lavouras</label>
              <input
                type="text"
                value={farmAgencyTitle}
                onChange={(e) => setFarmAgencyTitle(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Descrição do Serviço de Lavouras</label>
              <textarea
                rows={3}
                value={farmAgencyDescription}
                onChange={(e) => setFarmAgencyDescription(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              className="bg-agro-leaf hover:bg-agro-dark text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações Globais</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
