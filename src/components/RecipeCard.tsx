import React from 'react';
import { Clock, Heart, ChevronRight, AlertTriangle } from 'lucide-react';
import { ShotRecipe } from '../types/shot';

interface RecipeCardProps {
  recipe: ShotRecipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (recipe: ShotRecipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(recipe)}
      className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
    >
      <div>
        {/* Top bar: Category and Favorite */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-mono font-bold text-amber-850 bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded-md text-[11px]">
              #{recipe.number.toString().padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-600">
              {recipe.category === 'citrus' ? 'Leve & Cítrico' : 'Aromático & Especiado'}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors text-stone-400 hover:text-rose-500 cursor-pointer"
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors mb-1.5 leading-snug">
          {recipe.name}
        </h3>

        {/* Highlight quote */}
        <p className="text-xs md:text-sm text-stone-600 mb-3 leading-relaxed">
          {recipe.highlight}
        </p>

        {/* Warning badge if recipe has caution */}
        {recipe.cautionNote && (
          <div className="mb-3 p-2 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2 text-xs text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span className="leading-tight">Uso opcional · Beber sempre bem diluído</span>
          </div>
        )}
      </div>

      {/* Footer Info: Clean unboxed metadata with subtle separators */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-stone-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span className="tabular-nums">até {recipe.prepTimeSeconds}s</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Acidez {recipe.acidityLevel}</span>
        </div>

        <span className="flex items-center gap-0.5 font-semibold text-amber-700 group-hover:translate-x-0.5 transition-transform">
          <span>Ver preparo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
