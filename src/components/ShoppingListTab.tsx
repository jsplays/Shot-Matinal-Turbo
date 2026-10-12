import React, { useState, useEffect } from 'react';
import { Check, Copy, RotateCcw, Sparkles, ShoppingCart, CheckSquare } from 'lucide-react';
import { SHOPPING_LIST } from '../data/shotsData';

export const ShoppingListTab: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('shot_shopping_checked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shot_shopping_checked', JSON.stringify(checkedItems));
    } catch {
      // ignore
    }
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const clearAll = () => {
    setCheckedItems({});
  };

  const selectAll = () => {
    const all: Record<string, boolean> = {};
    SHOPPING_LIST.forEach((item) => {
      all[item.id] = true;
    });
    setCheckedItems(all);
  };

  const handleCopy = () => {
    const pendingItems = SHOPPING_LIST.filter((i) => !checkedItems[i.id]);
    const itemsText = pendingItems.length > 0
      ? pendingItems.map((i) => `☐ ${i.name} (${i.suggestedQty})`).join('\n')
      : SHOPPING_LIST.map((i) => `☑ ${i.name} (${i.suggestedQty})`).join('\n');

    const text = `🛒 Lista de Compras — Shot Matinal Turbo\n\n${itemsText}\n\n*Dica econômica:* Congele porções de polpas e use as mesmas frutas para várias receitas!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = SHOPPING_LIST.length;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header and Progress */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Lista de Compras da Semana</h2>
            <p className="text-xs text-stone-500">
              Sugestões práticas para preparar algumas receitas sem desperdício
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold tabular-nums text-stone-900">
              {completedCount}/{totalCount}
            </span>
            <span className="text-[10px] text-stone-400 block">no carrinho</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="bg-amber-600 h-full transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 min-h-[44px] px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar para WhatsApp</span>
              </>
            )}
          </button>

          <button
            onClick={selectAll}
            className="min-h-[44px] px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Marcar Todos</span>
          </button>

          <button
            onClick={clearAll}
            className="min-h-[44px] px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">
        {SHOPPING_LIST.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 md:p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                isChecked ? 'bg-stone-50/70 text-stone-400' : 'hover:bg-stone-50 text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent div
                  className="w-5 h-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500 pointer-events-none"
                />
                <span className={`text-sm font-medium ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                  {item.name}
                </span>
              </div>

              <span className={`text-xs font-mono font-medium ${isChecked ? 'text-stone-400' : 'text-stone-600'}`}>
                {item.suggestedQty}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dica Econômica Callout */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-amber-950 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-semibold block mb-0.5">Dica econômica para a semana:</strong>
          Use as mesmas frutas em mais de uma receita (ex.: limão e laranja combinam com vários preparos), congele porções de polpa de frutas e prefira gengibre fresco ou especiarias que você já tenha em sua despensa. Não é necessário comprar tudo de uma vez.
        </div>
      </div>
    </div>
  );
};
