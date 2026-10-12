import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, HeartHandshake, ChevronDown } from 'lucide-react';
import { COMFORT_PRINCIPLES, MYTHS_AND_FACTS } from '../data/shotsData';

export const GuideTab: React.FC = () => {
  const [openMythIndex, setOpenMythIndex] = useState<number | null>(0);

  const toggleMyth = (index: number) => {
    setOpenMythIndex(openMythIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Intro Hero Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 md:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Transparência Nutricional</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight mb-2">
          Entenda o que o shot pode — e não pode — fazer
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Tomar uma bebida pela manhã pode ser uma forma agradável de começar o dia hidratado. Mas não há comprovação de que limão, gengibre, canela ou vinagre, sozinhos, “desintoxiquem” o organismo, eliminem gordura ou acelerem o metabolismo de maneira relevante.
        </p>
      </div>

      {/* Mitos e Fatos Interativos */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-stone-700" />
          <h3 className="text-base font-bold text-stone-900">Mitos vs. Fatos da Ciência</h3>
        </div>

        <div className="space-y-2.5">
          {MYTHS_AND_FACTS.map((item, idx) => {
            const isOpen = openMythIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 overflow-hidden transition-all bg-stone-50/50"
              >
                <button
                  onClick={() => toggleMyth(idx)}
                  className="w-full p-3.5 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-stone-100/70 transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-rose-600 block mb-0.5">
                      MITO FREQUENTE
                    </span>
                    <span className="text-sm font-semibold text-stone-900 leading-snug">
                      "{item.myth}"
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 mt-1 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-stone-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-3.5 pt-0 bg-white border-t border-stone-100 text-xs md:text-sm text-stone-700 space-y-2">
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-emerald-700 block mb-0.5">
                        O QUE DIZ A EVIDÊNCIA
                      </span>
                      <p className="font-medium text-stone-900">{item.fact}</p>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{item.explanation}</p>
                    {item.citation && (
                      <span className="text-[11px] text-stone-400 block pt-1 border-t border-stone-50">
                        Fonte / Diretriz: {item.citation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Como aproveitar as receitas com conforto */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <HeartHandshake className="w-4 h-4 text-stone-700" />
          <h3 className="text-base font-bold text-stone-900">
            Como aproveitar as receitas com conforto
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          6 princípios práticos para evitar irritação gástrica e desfrutar das bebidas com tranquilidade
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMFORT_PRINCIPLES.map((principle, index) => (
            <div
              key={index}
              className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-100 flex flex-col justify-start"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-amber-700">
                  0{index + 1}.
                </span>
                <h4 className="text-xs font-bold text-stone-900">{principle.title}</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerta de Saúde Específico */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-stone-700 leading-relaxed">
          <strong className="font-semibold text-stone-900 block mb-1">
            Atenção para condições de saúde específicas:
          </strong>
          Quem tem refluxo gastroesofágico, gastrite, diabetes, doença renal, está grávida ou usa medicamentos regulares deve conversar com seu médico ou nutricionista antes de consumir ingredientes concentrados ou vinagre com frequência. O vinagre pode interagir com certos fármacos, incluindo insulina e alguns diuréticos.
        </div>
      </div>
    </div>
  );
};
