import React, { useState } from 'react';
import { X, Clock, Heart, AlertTriangle, Droplets, Check, CheckCircle2, Share2 } from 'lucide-react';
import { ShotRecipe } from '../types/shot';
import { Timer30s } from './Timer30s';

interface RecipeDetailModalProps {
  recipe: ShotRecipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onMarkPrepared: (recipeId: number) => void;
  isPreparedToday: boolean;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  onMarkPrepared,
  isPreparedToday
}) => {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!recipe) return null;

  const handleShare = () => {
    const text = `Receita do Shot Matinal Turbo: ${recipe.name}\n\nIngredientes:\n${recipe.ingredients
      .map((i) => `• ${i.amount} de ${i.name}`)
      .join('\n')}\n\nPreparo (${recipe.prepTimeSeconds}s):\n${recipe.preparation}\n\nNota: ${recipe.highlight}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Helper to scale amounts roughly
  const scaleAmount = (amountStr: string, mult: number) => {
    if (mult === 1) return amountStr;
    // match numbers like 50 ml, 60 ml, 1 colher, ¼ colher, ½ colher, 2 folhas
    if (amountStr.includes('¼')) {
      if (mult === 2) return amountStr.replace('¼', '½');
      if (mult === 4) return amountStr.replace('¼', '1');
    }
    if (amountStr.includes('½')) {
      if (mult === 2) return amountStr.replace('½', '1');
      if (mult === 4) return amountStr.replace('½', '2');
    }
    const match = amountStr.match(/^(\d+)\s*(.*)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      const rest = match[2];
      return `${num * mult} ${rest}`.trim();
    }
    return `${amountStr} (${mult}x)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/60 backdrop-blur-sm p-0 sm:p-4">
      <div
        className="bg-white w-full max-w-xl max-h-[92vh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-title"
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-0.5">
              <span className="font-mono font-semibold text-stone-700">
                Shot #{recipe.number.toString().padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{recipe.categoryLabel}</span>
            </div>
            <h2 id="recipe-title" className="text-lg sm:text-xl font-bold text-stone-900">
              {recipe.name}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center transition-colors text-stone-400 hover:text-rose-500"
              aria-label="Favoritar"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-rose-500 text-rose-500 scale-105' : ''
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center transition-colors text-stone-500"
              title="Copiar receita para compartilhar"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-stone-100 flex items-center justify-center transition-colors text-stone-500"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-stone-800">
          {/* Share toast indicator */}
          {copiedShare && (
            <div className="p-2.5 bg-stone-900 text-white text-xs font-medium rounded-xl text-center flex items-center justify-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Texto da receita copiado para compartilhar!</span>
            </div>
          )}

          {/* Destaque */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Perfil de Sabor & Destaque
            </span>
            <p className="text-sm font-medium text-stone-800">{recipe.highlight}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-stone-600">
              {recipe.flavorNotes.map((note, idx) => (
                <span key={idx} className="text-stone-500">
                  #{note}
                </span>
              ))}
            </div>
          </div>

          {/* Portion Multiplier */}
          <div className="flex items-center justify-between py-2 border-y border-stone-100">
            <span className="text-xs font-medium text-stone-600">Rendimento:</span>
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              {[1, 2, 4].map((mult) => (
                <button
                  key={mult}
                  onClick={() => setMultiplier(mult)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    multiplier === mult
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {mult} {mult === 1 ? 'dose' : 'doses'}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Ingredientes Necessários
              </h4>
              <span className="text-xs text-stone-400">Ajuste de diluição livre</span>
            </div>

            <ul className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-stone-50/60 rounded-xl border border-stone-100 text-sm"
                >
                  <span className="font-medium text-stone-800">{ing.name}</span>
                  <span className="font-mono text-stone-600 text-xs font-medium">
                    {scaleAmount(ing.amount, multiplier)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation instructions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Modo de Preparo
              </h4>
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>até {recipe.prepTimeSeconds} segundos</span>
              </span>
            </div>

            <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200 text-sm leading-relaxed text-stone-800 font-medium">
              {recipe.preparation}
            </div>
          </div>

          {/* Interactive 30-second Timer */}
          <Timer30s initialSeconds={recipe.prepTimeSeconds} />

          {/* Dilution & Comfort Tip */}
          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-start gap-2.5">
            <Droplets className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-950">
              <strong className="font-semibold block mb-0.5">Dica de Conforto e Diluição:</strong>
              {recipe.dilutionTip}
            </div>
          </div>

          {/* Caution Note if present (especially recipe 14 vinegar) */}
          {recipe.cautionNote && (
            <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-rose-950">
                <strong className="font-semibold block mb-0.5">Nota importante de segurança:</strong>
                {recipe.cautionNote}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center gap-3">
          <button
            onClick={() => onMarkPrepared(recipe.id)}
            className={`flex-1 h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              isPreparedToday
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isPreparedToday ? 'Shot Registrado Hoje!' : 'Marcar como Tomado Hoje'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
