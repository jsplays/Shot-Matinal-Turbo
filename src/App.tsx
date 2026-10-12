import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { RecipeCatalog } from './components/RecipeCatalog';
import { WeeklyPlannerTab } from './components/WeeklyPlannerTab';
import { GuideTab } from './components/GuideTab';
import { ShoppingListTab } from './components/ShoppingListTab';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { RECIPES } from './data/shotsData';
import { ShotRecipe } from './types/shot';
import { ShieldAlert, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState<ShotRecipe | null>(null);
  // Pop-up do Aviso Importante aparece imediatamente ao entrar no site
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(() => {
    try {
      return localStorage.getItem('shot_disclaimer_accepted') === 'true';
    } catch {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('shot_favorites');
      return saved ? JSON.parse(saved) : [1, 3, 11]; // default friendly favorites
    } catch {
      return [1, 3, 11];
    }
  });

  // Track today's shot
  const [preparedTodayId, setPreparedTodayId] = useState<number | null>(() => {
    try {
      const todayKey = `shot_prepared_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      return saved ? parseInt(saved, 10) : null;
    } catch {
      return null;
    }
  });

  // Check disclaimer acceptance on mount
  useEffect(() => {
    const accepted = localStorage.getItem('shot_disclaimer_accepted') === 'true';
    setIsDisclaimerAccepted(accepted);
  }, [isDisclaimerOpen]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('shot_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkPrepared = (recipeId: number) => {
    const todayKey = `shot_prepared_${new Date().toISOString().slice(0, 10)}`;
    localStorage.setItem(todayKey, recipeId.toString());
    setPreparedTodayId(recipeId);
    showToast('Shot registrado no seu dia com sucesso!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        isDisclaimerAccepted={isDisclaimerAccepted}
      />

      {/* Persistent safety notice banner if not yet accepted */}
      {!isDisclaimerAccepted && (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              Material informativo culinário sem promessa de milagres. Leia o aviso legal.
            </span>
          </div>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="font-bold underline text-amber-800 hover:text-amber-950 whitespace-nowrap ml-2 cursor-pointer"
          >
            Revisar Aviso
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-5 pb-16 md:pb-12">
        {activeTab === 'recipes' && (
          <RecipeCatalog
            onSelectRecipe={setSelectedRecipe}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenGuide={() => setActiveTab('guide')}
          />
        )}

        {activeTab === 'planner' && (
          <WeeklyPlannerTab
            onSelectRecipe={setSelectedRecipe}
            preparedTodayId={preparedTodayId}
            onMarkPrepared={handleMarkPrepared}
          />
        )}

        {activeTab === 'guide' && <GuideTab />}

        {activeTab === 'shopping' && <ShoppingListTab />}

        {activeTab === 'notice' && (
          <div className="space-y-4 max-w-2xl mx-auto pb-20 md:pb-8">
            <div className="bg-white rounded-3xl p-6 border border-stone-200">
              <h2 className="text-xl font-bold text-stone-900 mb-2">Aviso Importante</h2>
              <p className="text-xs text-stone-500 mb-4">
                Transparência e segurança são prioridades deste projeto.
              </p>
              <button
                onClick={() => setIsDisclaimerOpen(true)}
                className="w-full h-11 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Abrir Termo Completo & Confirmar Leitura
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs sm:text-sm font-medium py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Recipe Detail Modal / Bottom Sheet */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
        onToggleFavorite={toggleFavorite}
        onMarkPrepared={handleMarkPrepared}
        isPreparedToday={selectedRecipe ? preparedTodayId === selectedRecipe.id : false}
      />

      {/* Mandatory / Informational Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        isMandatoryInitial={false}
      />

      {/* Mobile Fixed Bottom Navigation (Thumb Zone) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'notice') {
            setIsDisclaimerOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        isDisclaimerAccepted={isDisclaimerAccepted}
      />
    </div>
  );
}
