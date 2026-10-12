import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../data/shotsData';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMandatoryInitial?: boolean;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  isMandatoryInitial = false
}) => {
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem('shot_disclaimer_accepted') === 'true';
    setHasAgreed(agreed);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (hasAgreed) {
      localStorage.setItem('shot_disclaimer_accepted', 'true');
      onClose();
    }
  };

  const handleCheckboxToggle = () => {
    const newState = !hasAgreed;
    setHasAgreed(newState);
    if (!newState) {
      localStorage.removeItem('shot_disclaimer_accepted');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div
        className="bg-white w-full max-w-xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-amber-200/80 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
      >
        {/* Header com estilo POP */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
              POP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                  Leitura Obrigatória
                </span>
                <span className="text-xs text-stone-500 font-medium">Uso Culinário</span>
              </div>
              <h2 id="disclaimer-title" className="text-base sm:text-lg font-extrabold text-stone-900 leading-tight mt-0.5">
                AVISO IMPORTANTE
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-amber-100/70 text-stone-500 flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable text content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs md:text-sm text-stone-700 leading-relaxed max-h-[55vh]">
          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/60 text-amber-900 font-medium">
            Este material é <strong>educativo e culinário</strong>. Bebidas matinais não substituem acompanhamento médico ou nutricional nem tratam doenças.
          </div>

          <div className="whitespace-pre-line space-y-3 font-normal text-stone-600">
            {DISCLAIMER_TEXT}
          </div>
        </div>

        {/* Checkbox and action footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex flex-col gap-3">
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={handleCheckboxToggle}
              className="mt-0.5 w-5 h-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500 transition cursor-pointer shrink-0"
            />
            <span className="text-xs text-stone-800 font-medium leading-normal group-hover:text-stone-900">
              Eu li e compreendi este aviso. Reconheço que este é um produto educativo, que não substitui orientação profissional e que não há garantia de resultados.
            </span>
          </label>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleConfirm}
              disabled={!hasAgreed}
              className={`w-full h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                hasAgreed
                  ? 'bg-amber-600 text-white hover:bg-amber-700 active:scale-[0.99] cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Concordar e Entrar no Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
