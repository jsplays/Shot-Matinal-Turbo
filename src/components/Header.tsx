import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenDisclaimer: () => void;
  isDisclaimerAccepted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenDisclaimer,
  isDisclaimerAccepted
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('recipes')}
          className="text-left group cursor-pointer"
        >
          <span className="text-base md:text-lg font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            Shot Matinal Turbo
          </span>
        </button>

        {/* Zone 2: Clean single-line navigation links (desktop/tablet) */}
        <nav className="hidden md:flex items-center gap-6 text-xs md:text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('recipes')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'recipes'
                ? 'border-amber-600 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            14 Receitas
          </button>
          <button
            onClick={() => onSelectTab('planner')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'planner'
                ? 'border-amber-600 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Plano Semanal
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'guide'
                ? 'border-amber-600 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Guia & Ciência
          </button>
          <button
            onClick={() => onSelectTab('shopping')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'shopping'
                ? 'border-amber-600 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Lista de Compras
          </button>
        </nav>

        {/* Zone 3: Primary Action (Disclaimer status button) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDisclaimer}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 border ${
              isDisclaimerAccepted
                ? 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
            }`}
            title="Aviso legal e termo educativo"
          >
            {isDisclaimerAccepted ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="hidden sm:inline">Aviso Legal</span>
            <span className="sm:hidden">Aviso</span>
          </button>
        </div>
      </div>
    </header>
  );
};
