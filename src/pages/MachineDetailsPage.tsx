import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ImageGallery } from '../components/machines/ImageGallery';
import { InterestModal } from '../components/machines/InterestModal';
import { 
  MapPin, Calendar, Clock, Phone, Heart, ShieldCheck, UserCheck, 
  ArrowLeft, CheckCircle2, Share2, MessageCircle 
} from 'lucide-react';

interface MachineDetailsPageProps {
  machineId: string;
  onBack: () => void;
}

export const MachineDetailsPage: React.FC<MachineDetailsPageProps> = ({ machineId, onBack }) => {
  const { machines, settings } = useApp();
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const machine = machines.find(m => m.id === machineId);

  if (!machine) {
    return (
      <div className="py-20 text-center bg-agro-cream min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-agro-dark">Máquina não encontrada</h2>
        <p className="text-sm text-gray-500 mt-2">O anúncio procurado pode ter sido removido ou não está disponível.</p>
        <button
          onClick={onBack}
          className="mt-6 bg-agro-leaf text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
        >
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  const formatPrice = (val?: number | null) => {
    if (!val || val <= 0) return 'Consulte o valor';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const isPlatformOwned = machine.owner_type === 'PLATFORM';
  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const waText = `Olá! Tenho interesse na máquina ${machine.name} (Ref: ${machine.model}, Ano ${machine.year}). Gostaria de receber mais informações e detalhes.`;
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(waText)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: machine.name,
        text: `Confira este anúncio: ${machine.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 bg-agro-cream min-h-screen text-agro-graphite animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BACK BUTTON & SHARE */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-agro-leaf hover:text-agro-dark bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Catálogo</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4 text-agro-leaf" />
            <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>

        {/* MAIN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* LEFT 7 COLS: GALLERY & SPECIFICATIONS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* GALLERY */}
            <ImageGallery images={machine.images} machineName={machine.name} />

            {/* DESCRIPTION BOX */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
              <h2 className="text-lg font-extrabold text-agro-dark border-l-4 border-agro-leaf pl-3 mb-4">
                Descrição da Máquina
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-normal">
                {machine.description}
              </p>
            </div>

            {/* SPECIFICATIONS TABLE */}
            {machine.specifications && Object.keys(machine.specifications).length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
                <h2 className="text-lg font-extrabold text-agro-dark border-l-4 border-agro-accent pl-3 mb-4">
                  Especificações Técnicas
                </h2>
                
                <div className="divide-y divide-gray-100">
                  {Object.entries(machine.specifications).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-gray-600">{key}</span>
                      <span className="font-semibold text-agro-dark">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 5 COLS: PRICE, SUMMARY & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-6 sticky top-24">
              
              {/* OWNER & STATUS BADGES */}
              <div className="flex items-center justify-between">
                {isPlatformOwned ? (
                  <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Anunciada pela Plataforma</span>
                  </span>
                ) : (
                  <span className="bg-slate-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg border border-amber-700/50 flex items-center gap-1.5 shadow-sm">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Anúncio de Vendedor Terceiro</span>
                  </span>
                )}

                <span className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg ${
                  machine.status === 'SOLD' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {machine.status === 'SOLD' ? 'Vendido' : 'Disponível'}
                </span>
              </div>

              {/* MACHINE TITLE */}
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-agro-leaf block mb-1">
                  {machine.brand} • {machine.model}
                </span>
                <h1 className="text-2xl font-extrabold text-agro-dark leading-tight">
                  {machine.name}
                </h1>
              </div>

              {/* QUICK METRICS GRID */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-agro-cream rounded-2xl text-xs text-gray-700 font-semibold border border-agro-leaf/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-agro-leaf shrink-0" />
                  <span>Ano: <strong>{machine.year}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-agro-leaf shrink-0" />
                  <span>Horas: <strong>{machine.hours ? `${machine.hours.toLocaleString('pt-BR')} h` : 'N/I'}</strong></span>
                </div>
                <div className="flex items-center gap-2 col-span-2 text-gray-600 border-t border-gray-200/60 pt-2 mt-1">
                  <MapPin className="w-4 h-4 text-agro-leaf shrink-0" />
                  <span>Localização: <strong>{machine.location}</strong></span>
                </div>
              </div>

              {/* PRICE BOX */}
              <div className="p-4 bg-agro-dark text-white rounded-2xl border border-agro-leaf/40">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                  Valor Solicitado
                </span>
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  machine.price ? 'text-emerald-400' : 'text-amber-400 text-xl font-bold'
                }`}>
                  {formatPrice(machine.price)}
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                
                {/* PRIMARY CTA: TENHO INTERESSE */}
                <button
                  onClick={() => setInterestModalOpen(true)}
                  className="w-full bg-gradient-to-r from-agro-leaf to-emerald-700 hover:from-emerald-700 hover:to-agro-leaf text-white font-extrabold text-base py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Heart className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Tenho interesse</span>
                </button>

                {/* SECONDARY CTA: WHATSAPP */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-xl shadow transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Falar no WhatsApp</span>
                </a>

              </div>

              {/* TRUST FOOTNOTE */}
              <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-500 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Atendimento pessoal especializado pelo time da plataforma</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Intermediação segura de propostas e vistorias</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* INTEREST MODAL */}
      {interestModalOpen && (
        <InterestModal machine={machine} onClose={() => setInterestModalOpen(false)} />
      )}
    </div>
  );
};
