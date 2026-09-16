import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Tractor, User, Key, ShieldCheck } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess }) => {
  const { loginAdmin, settings } = useApp();
  const [username, setUsername] = useState('maquinas');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(username, password);
    if (ok) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-agro-dark flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-gradient-to-b from-[#133E27] to-agro-dark rounded-3xl p-8 border border-agro-leaf/40 shadow-2xl space-y-6 text-left">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-agro-leaf flex items-center justify-center text-agro-accent border border-emerald-500/40 shadow-inner">
            <Tractor className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-xl text-white tracking-tight block">
              {settings.company_name}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50">
              Painel Administrativo
            </span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-extrabold text-white">Acesso Restrito ao Gestor</h1>
          <p className="text-xs text-gray-300 mt-1">
            Digite o usuário e senha de administrador para acessar o painel.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/80 border border-rose-700/60 rounded-xl text-xs text-rose-300 font-semibold text-center">
            Usuário ou senha incorretos. (Dica inicial: usuário <strong>maquinas</strong> e senha <strong>maquinas26</strong>).
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Usuário Administrativo</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: maquinas"
                className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-agro-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Senha de Acesso</label>
            <div className="relative">
              <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ex: maquinas26"
                className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-agro-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-agro-accent to-amber-600 hover:from-amber-600 hover:to-agro-accent text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>Entrar no Painel</span>
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autenticação segura via /admin/login</span>
          </div>
        </div>

      </div>
    </div>
  );
};
