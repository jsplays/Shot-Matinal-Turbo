import React, { useState } from 'react';
import { Calendar, Dices, ChevronRight, CheckCircle2, Sparkles, Droplets } from 'lucide-react';
import { WEEKLY_SCHEDULE, RECIPES } from '../data/shotsData';
import { ShotRecipe } from '../types/shot';

interface WeeklyPlannerTabProps {
  onSelectRecipe: (recipe: ShotRecipe) => void;
  preparedTodayId: number | null;
  onMarkPrepared: (recipeId: number) => void;
}

export const WeeklyPlannerTab: React.FC<WeeklyPlannerTabProps> = ({
  onSelectRecipe,
  preparedTodayId,
  onMarkPrepared
}) => {
  // Current day in JavaScript: 0 is Sunday, 1 is Monday, etc.
  const todayIndex = new Date().getDay();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(todayIndex);
  const [randomShot, setRandomShot] = useState<ShotRecipe | null>(null);

  const currentDaySuggestion = WEEKLY_SCHEDULE.find((d) => d.dayIndex === todayIndex) || WEEKLY_SCHEDULE[0];
  const activeSelectedSuggestion = WEEKLY_SCHEDULE.find((d) => d.dayIndex === selectedDayIndex) || WEEKLY_SCHEDULE[0];
  const activeRecipe = RECIPES.find((r) => r.id === activeSelectedSuggestion.recipeId) || RECIPES[0];

  const handleRollDice = () => {
    const randomIndex = Math.floor(Math.random() * RECIPES.length);
    setRandomShot(RECIPES[randomIndex]);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Introduction Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-5 md:p-6 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Sugestão Inteligente para Hoje</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
            Qual receita escolher hoje?
          </h2>

          <p className="text-xs md:text-sm text-stone-300 leading-relaxed mb-4">
            Use a tabela como inspiração, não como prescrição. Você pode trocar os dias, repetir uma receita ou simplesmente tomar um copo de água fresca.
          </p>

          {/* Today's Highlight Box */}
          <div className="bg-stone-800/90 rounded-2xl p-4 border border-stone-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-stone-400 block font-medium">
                {currentDaySuggestion.dayName} (Hoje)
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {currentDaySuggestion.recipeName}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const rec = RECIPES.find((r) => r.id === currentDaySuggestion.recipeId);
                  if (rec) onSelectRecipe(rec);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Preparar Shot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Day-of-week Selector */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Calendário da Semana</h3>
            <p className="text-xs text-stone-500">Toque em qualquer dia para ver a sugestão</p>
          </div>
          <span className="text-xs font-mono text-stone-400">7 dias</span>
        </div>

        {/* 7-Day horizontal button strip */}
        <div className="grid grid-cols-7 gap-1.5 md:gap-2">
          {WEEKLY_SCHEDULE.map((item) => {
            const isToday = item.dayIndex === todayIndex;
            const isSelected = item.dayIndex === selectedDayIndex;
            return (
              <button
                key={item.dayIndex}
                onClick={() => setSelectedDayIndex(item.dayIndex)}
                className={`py-2.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/30'
                    : isToday
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 font-semibold'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-100'
                }`}
              >
                <span className="text-[11px] font-semibold">{item.dayShort}</span>
                {isToday && (
                  <span className={`text-[9px] mt-0.5 uppercase tracking-tighter ${isSelected ? 'text-amber-100' : 'text-amber-700'}`}>
                    Hoje
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Details Card */}
        <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>{activeSelectedSuggestion.dayName}</span>
              <span aria-hidden="true">·</span>
              <span>{activeRecipe.highlight}</span>
            </div>
            <h4 className="text-base font-bold text-stone-900">{activeRecipe.name}</h4>
            <p className="text-xs text-stone-600 mt-1 line-clamp-1">{activeRecipe.rawIngredientsText}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectRecipe(activeRecipe)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-1"
            >
              <span>Ver Detalhes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sorteador / Desejo do Dia */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
              <Dices className="w-4 h-4 text-stone-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Quer variar hoje?</h3>
              <p className="text-xs text-stone-500">Sorteie uma receita aleatória entre as 14 opções</p>
            </div>
          </div>

          <button
            onClick={handleRollDice}
            className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Dices className="w-3.5 h-3.5 text-stone-600" />
            <span>Sortear Shot</span>
          </button>
        </div>

        {randomShot && (
          <div className="mt-3 p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between gap-3 animate-fade-in">
            <div>
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                Shot Sorteado #{randomShot.number.toString().padStart(2, '0')}
              </span>
              <h4 className="text-sm font-bold text-stone-900 mt-0.5">{randomShot.name}</h4>
              <p className="text-xs text-stone-600 mt-0.5">{randomShot.highlight}</p>
            </div>

            <button
              onClick={() => onSelectRecipe(randomShot)}
              className="px-3 py-1.5 bg-amber-600 text-white font-medium text-xs rounded-lg hover:bg-amber-700 transition-colors shrink-0"
            >
              Ver Receita
            </button>
          </div>
        )}
      </div>

      {/* Reflexão Diária & Hábitos Sustentáveis */}
      <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 text-stone-700 flex items-start gap-3">
        <Droplets className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-semibold text-stone-900 block mb-1">
            Um hábito simples, sem promessas milagrosas
          </strong>
          Escolha uma receita pelo sabor, não pela promessa de “desinchar” ou acelerar o metabolismo. Uma rotina alimentar equilibrada, hidratação adequada e hábitos sustentáveis importam mais do que qualquer shot. E, se uma bebida causar desconforto, deixe de tomá-la: água pura e um café da manhã bem tolerado já são perfeitos.
        </div>
      </div>
    </div>
  );
};
