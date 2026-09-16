import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tractor, Phone, Mail, MapPin, Instagram, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings } = useApp();

  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Olá! Vim pelo site da ' + settings.company_name)}`;
  const instaUrl = `https://instagram.com/${settings.instagram.replace('@', '')}`;

  return (
    <footer className="bg-agro-dark text-white border-t border-agro-leaf/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* COL 1: BRAND INFO */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-agro-leaf flex items-center justify-center text-agro-accent border border-agro-leaf/50">
                <Tractor className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                {settings.company_name}
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Plataforma especializadissima na comercialização, intermediação e agenciamento de tratores, colheitadeiras, plantadeiras, pulverizadores e lavouras em todo o Brasil.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Plataforma Segura e Auditada</span>
            </div>
          </div>

          {/* COL 2: QUICK LINKS */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-agro-accent pl-2.5">
              Navegação Rápida
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-agro-accent transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/maquinas')} className="hover:text-agro-accent transition-colors">
                  Ver Todas as Máquinas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/anunciar')} className="hover:text-agro-accent transition-colors font-medium text-amber-400">
                  Quero Anunciar Meu Equipamento
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/agenciamento-lavouras')} className="hover:text-agro-accent transition-colors">
                  Agenciamento de Lavouras
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: MODALIDADES */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-agro-accent pl-2.5">
              Modalidades de Venda
            </h3>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                <span className="font-bold text-white text-sm block">1% — Anúncio no Grupo</span>
                <span>Divulgação no nosso grupo de compradores com contatos diretos.</span>
              </div>
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                <span className="font-bold text-amber-400 text-sm block">2% — Agenciamento Completo</span>
                <span>Intermediação técnica e comercial realizada pela nossa equipe.</span>
              </div>
            </div>
          </div>

          {/* COL 4: CONTACT & SOCIAL */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-agro-accent pl-2.5">
              Atendimento Comercial
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white font-semibold text-emerald-300">
                  {settings.phone} / WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{settings.city_state}</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                <span>@{settings.instagram.replace('@', '')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {settings.company_name}. Todos os direitos reservados. Focado no Agronegócio Brasileiro.</p>
          <p className="text-gray-400 font-medium">Plataforma de Compra, Venda & Agenciamento Agrícola</p>
        </div>
      </div>
    </footer>
  );
};
