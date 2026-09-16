import React, { useState } from 'react';
import { Machine } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Send, Tractor, Phone, Mail, User, MessageSquare } from 'lucide-react';

interface InterestModalProps {
  machine: Machine;
  onClose: () => void;
}

export const InterestModal: React.FC<InterestModalProps> = ({ machine, onClose }) => {
  const { addInterest } = useApp();
  
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addInterest({
        machine_id: machine.id,
        machine_name: machine.name,
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        message: message.trim() || undefined,
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-agro-leaf/20 text-left">
        
        {/* MODAL HEADER */}
        <div className="bg-agro-dark text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-agro-leaf flex items-center justify-center text-agro-accent border border-emerald-500/30">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-agro-accent">
                Demonstrar Interesse
              </span>
              <h3 className="text-lg font-extrabold leading-tight">Fale com o Atendimento</h3>
            </div>
          </div>
        </div>

        {/* MACHINE CONTEXT BANNER */}
        <div className="bg-agro-cream px-6 py-3 border-b border-agro-leaf/10 flex items-center gap-3">
          <img 
            src={machine.images[0]} 
            alt={machine.name} 
            className="w-12 h-12 rounded-lg object-cover border border-gray-300"
          />
          <div className="text-xs">
            <span className="text-gray-500 font-bold block text-[10px] uppercase">
              Você está demonstrando interesse em:
            </span>
            <span className="font-extrabold text-agro-dark text-sm line-clamp-1">
              {machine.name}
            </span>
            <span className="text-gray-600 font-medium">
              {machine.brand} {machine.model} • {machine.location}
            </span>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-200">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-extrabold text-agro-dark">Recebemos seu interesse!</h4>
              
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                O responsável pela <strong className="text-agro-dark">{machine.name}</strong> entrará em contato via WhatsApp no número <span className="font-bold text-emerald-700">{whatsapp}</span> o mais breve possível.
              </p>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="bg-agro-leaf hover:bg-agro-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-md w-full"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* NAME */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Seu Nome Completo <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* WHATSAPP */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  WhatsApp com DDD <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ex: (27) 99999-8888"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  E-mail <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: joao@produtor.com.br"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mensagem ou Dúvida <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ex: Tenho interesse. Gostaria de saber detalhes sobre frete e pagamento..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-agro-leaf focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-agro-leaf to-emerald-700 hover:from-emerald-700 hover:to-agro-leaf text-white font-bold text-base py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Enviando...' : 'Enviar interesse'}</span>
              </button>

              <p className="text-[11px] text-gray-500 text-center">
                Seus dados serão tratados de forma confidencial e enviados ao responsável comercial.
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
