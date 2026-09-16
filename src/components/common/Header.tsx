import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tractor, Menu, X, PlusCircle, PhoneCall, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento da ' + settings.company_name)}`;

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-agro-leaf/20 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-agro-leaf to-agro-dark flex items-center justify-center text-agro-accent border border-agro-leaf/40 shadow-inner group-hover:scale-105 transition-transform">
              <Tractor className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-none">
                  {settings.company_name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-agro-accent bg-agro-accent/15 px-1.5 py-0.5 rounded border border-agro-accent/30">
                  Agro
                </span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium tracking-wide">
                Compra, Venda e Agenciamento
              </p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNav('/')}
              className={`text-sm font-semibold transition-colors ${
                currentPath === '/' 
                  ? 'text-agro-accent border-b-2 border-agro-accent pb-0.5' 
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Início
            </button>

            <button
              onClick={() => handleNav('/maquinas')}
              className={`text-sm font-semibold transition-colors ${
                currentPath === '/maquinas' 
                  ? 'text-agro-accent border-b-2 border-agro-accent pb-0.5' 
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              Catálogo de Máquinas
            </button>

            <button
              onClick={() => handleNav('/agenciamento-lavouras')}
              className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                currentPath === '/agenciamento-lavouras' 
                  ? 'text-agro-accent border-b-2 border-agro-accent pb-0.5' 
                  : 'text-gray-200 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-agro-accent" />
              Lavouras
            </button>

            <a
              href="#como-funciona"
              onClick={(e) => {
                if (currentPath !== '/') {
                  e.preventDefault();
                  handleNav('/');
                  setTimeout(() => {
                    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-sm font-semibold text-gray-200 hover:text-white transition-colors"
            >
              Como Funciona
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                if (currentPath !== '/') {
                  e.preventDefault();
                  handleNav('/');
                  setTimeout(() => {
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-sm font-semibold text-gray-200 hover:text-white transition-colors"
            >
              Dúvidas
            </a>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 px-3.5 py-2.5 rounded-lg transition-colors border border-white/10"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{settings.phone || 'Atendimento'}</span>
            </a>

            <button
              onClick={() => handleNav('/anunciar')}
              className="flex items-center gap-2 bg-gradient-to-r from-agro-accent to-amber-600 hover:from-amber-600 hover:to-agro-accent text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-agro-glow transition-all transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Quero Anunciar</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => handleNav('/anunciar')}
              className="bg-agro-accent text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Anunciar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-200 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-agro-dark/98 border-b border-agro-leaf/30 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold ${
              currentPath === '/' ? 'bg-agro-green text-white font-bold' : 'text-gray-200 hover:bg-white/5'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => handleNav('/maquinas')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold ${
              currentPath === '/maquinas' ? 'bg-agro-green text-white font-bold' : 'text-gray-200 hover:bg-white/5'
            }`}
          >
            Catálogo de Máquinas
          </button>

          <button
            onClick={() => handleNav('/agenciamento-lavouras')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              currentPath === '/agenciamento-lavouras' ? 'bg-agro-green text-white font-bold' : 'text-gray-200 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-agro-accent" />
            Agenciamento de Lavouras
          </button>

          <button
            onClick={() => handleNav('/anunciar')}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold bg-gradient-to-r from-agro-accent to-amber-600 text-white flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Quero Anunciar Minha Máquina
          </button>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
            <span>Fale com o responsável:</span>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold underline flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {settings.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
