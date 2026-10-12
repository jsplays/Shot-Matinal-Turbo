import React from 'react';
import { Sparkles, Calendar, BookOpen, ShoppingBag, ShieldAlert } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isDisclaimerAccepted: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  isDisclaimerAccepted
}) => {
  const tabs = [
    { id: 'recipes', label: 'Receitas', icon: Sparkles },
    { id: 'planner', label: 'Meu Dia', icon: Calendar },
    { id: 'guide', label: 'Guia', icon: BookOpen },
    { id: 'shopping', label: 'Compras', icon: ShoppingBag },
    { id: 'notice', label: 'Aviso', icon: ShieldAlert, badge: !isDisclaimerAccepted }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Navegação móvel"
    >
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center transition-colors relative ${
                isActive ? 'text-amber-700 font-semibold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-700' : 'text-stone-500'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight leading-none ${isActive ? 'font-semibold text-amber-800' : 'text-stone-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
