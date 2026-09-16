import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FaqSection: React.FC = () => {
  const { settings } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como faço para anunciar minha máquina?',
      a: 'Clique no botão "Quero Anunciar" no cabeçalho ou menu. Você será direcionado ao formulário onde preencherá seus dados de contato, especificações da máquina, valor desejado, fotos e a modalidade de venda pretendida.'
    },
    {
      q: 'Quanto custa anunciar?',
      a: 'Você não paga nada para cadastrar sua máquina na plataforma. A taxa somente é devida no momento em que a máquina for efetivamente vendida (1% para anúncio no grupo ou 2% para agenciamento completo).'
    },
    {
      q: 'Qual a diferença entre as taxas de 1% e 2%?',
      a: 'Na opção de 1% (Anúncio no Grupo), sua máquina é divulgada na rede e você recebe os contatos diretos dos interessados para negociar. Na opção de 2% (Venda por Agenciamento), nossa equipe cuida de todo o processo de negociação, atendimento e intermediação.'
    },
    {
      q: 'Quem escolhe a modalidade de venda?',
      a: 'O próprio proprietário do equipamento escolhe a modalidade que melhor atende suas necessidades no momento do preenchimento do formulário de anúncio.'
    },
    {
      q: 'Meu anúncio entra no site imediatamente?',
      a: 'Não. Todo anúncio enviado por terceiros passa por uma etapa de análise no painel administrativo com status PENDENTE antes de ser publicado.'
    },
    {
      q: 'Por que meu anúncio precisa ser aprovado?',
      a: 'A aprovação prévia garante a segurança do comprador, a consistência das fotos e informações cadastradas e a qualidade de todo o catálogo da plataforma.'
    },
    {
      q: 'Como recebo os contatos dos interessados?',
      a: 'Se você optou pela modalidade de anúncio no grupo (1%), os dados dos interessados são repassados a você. Caso tenha optado pelo agenciamento (2%), nossa equipe comercial faz a ponte direta com os compradores.'
    },
    {
      q: 'Posso retirar minha máquina depois?',
      a: 'Sim. Caso venda por fora ou opte por retirar do catálogo, basta entrar em contato para alterarmos o status para vendido ou inativo.'
    },
    {
      q: 'Vocês vendem máquinas próprias?',
      a: 'Sim. A plataforma possui estoque próprio de máquinas (`PRÓPRIA`), além de gerenciar e agenciar anúncios de terceiros (`TERCEIRO`).'
    },
    {
      q: 'Vocês atendem quais regiões?',
      a: 'Atendemos compradores e vendedores em todo o território nacional. Entre em contato para consultar as condições específicas para sua região.'
    }
  ];

  const cleanWhatsApp = settings.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre a plataforma.')}`;

  return (
    <section id="faq" className="py-16 bg-agro-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-agro-leaf/10 text-agro-leaf font-bold text-xs px-3 py-1 rounded-full uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl font-extrabold text-agro-dark tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Respostas claras para as dúvidas mais comuns de compradores e anunciantes.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-base text-agro-dark hover:text-agro-leaf transition-colors"
                >
                  <span className="flex-1 leading-snug">{item.q}</span>
                  <div className={`p-1.5 rounded-lg transition-transform ${isOpen ? 'rotate-180 bg-agro-leaf text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fade-in">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM HELP CTA */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-agro-leaf/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-extrabold text-agro-dark text-base">Ficou com alguma dúvida específica?</h4>
            <p className="text-xs text-gray-500">Nossa equipe comercial está à disposição no WhatsApp.</p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center gap-2 shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consultar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
