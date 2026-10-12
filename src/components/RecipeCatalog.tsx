import React, { useState, useMemo } from 'react';
import { Search, Heart, Sparkles, SlidersHorizontal, Info, Flame, Droplets } from 'lucide-react';
import { RECIPES } from '../data/shotsData';
import { ShotRecipe } from '../types/shot';
import { RecipeCard } from './RecipeCard';

interface RecipeCatalogProps {
  onSelectRecipe: (recipe: ShotRecipe) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onOpenGuide: () => void;
}

export const RecipeCatalog: React.FC<RecipeCatalogProps> = ({
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  onOpenGuide
}) => {
  const [filter, setFilter] = useState<'all' | 'citrus' | 'spiced' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // Filter tab
      if (filter === 'citrus' && recipe.category !== 'citrus') return false;
      if (filter === 'spiced' && recipe.category !== 'spiced') return false;
      if (filter === 'favorites' && !favorites.includes(recipe.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = recipe.name.toLowerCase().includes(query);
        const matchesIngredients = recipe.rawIngredientsText.toLowerCase().includes(query);
        const matchesHighlight = recipe.highlight.toLowerCase().includes(query);
        const matchesNotes = recipe.flavorNotes.some((n) => n.toLowerCase().includes(query));
        return matchesName || matchesIngredients || matchesHighlight || matchesNotes;
      }

      return true;
    });
  }, [filter, searchQuery, favorites]);

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Hero Banner Editorial Puro CSS */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 p-6 md:p-8 text-white border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Guia Culinário & Hidratação
            </span>
            <span className="text-xs text-stone-400 font-mono">14 Receitas Express</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Shot Matinal Turbo
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg">
            Receitas simples, ingredientes acessíveis e preparo em até 30 segundos. Escolha pelo sabor e hidratação — sem obrigatoriedade de jejum e sem promessas milagrosas.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-amber-400" />
              <span>7 Cítricas & Frescas</span>
            </div>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>7 Aromáticas & Especiadas</span>
            </div>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Até 30s de preparo</span>
          </div>
        </div>
      </div>

      {/* No fasting notice banner */}
      <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/70 flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs text-amber-950 leading-relaxed">
            <strong>Sem obrigação de jejum:</strong> Tome com o café ou refeição se preferir. Se cítricos ou vinagre causarem desconforto, água pura já é suficiente.
          </p>
        </div>
        <button
          onClick={onOpenGuide}
          className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline whitespace-nowrap shrink-0 cursor-pointer"
        >
          Ler guia
        </button>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por ingrediente (gengibre, cúrcuma, cacau, hortelã...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-white rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-700"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Filter Tabs (Interactive Segmented Control Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 ${
              filter === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Todas (14)
          </button>

          <button
            onClick={() => setFilter('citrus')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 ${
              filter === 'citrus'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Bloco 1: Cítricas (7)
          </button>

          <button
            onClick={() => setFilter('spiced')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 ${
              filter === 'spiced'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Bloco 2: Aromáticas (7)
          </button>

          <button
            onClick={() => setFilter('favorites')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              filter === 'favorites'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${filter === 'favorites' ? 'fill-white' : ''}`} />
            <span>Favoritas ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Category description helpers */}
      {filter === 'citrus' && (
        <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600">
          <strong>Bloco 1:</strong> Combinações frescas e frutadas. "Leve" descreve o perfil do sabor — não significa que elimine retenção ou seja diurético.
        </div>
      )}
      {filter === 'spiced' && (
        <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600">
          <strong>Bloco 2:</strong> Especiarias aromáticas com personalidade. A proposta é variedade culinária, sem a falsa promessa de queimar gordura.
        </div>
      )}

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectRecipe}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <p className="text-sm font-semibold text-stone-800">Nenhuma receita encontrada</p>
          <p className="text-xs text-stone-500 mt-1">
            {filter === 'favorites'
              ? 'Você ainda não marcou nenhuma receita como favorita.'
              : 'Tente buscar com outro termo ou limpe os filtros.'}
          </p>
          <button
            onClick={() => {
              setFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-stone-100 text-stone-800 text-xs font-semibold rounded-xl hover:bg-stone-200 transition-colors"
          >
            Mostrar todas as 14 receitas
          </button>
        </div>
      )}
    </div>
  );
};
