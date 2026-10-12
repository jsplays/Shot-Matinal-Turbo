import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';

interface Timer30sProps {
  initialSeconds?: number;
  onFinish?: () => void;
}

export const Timer30s: React.FC<Timer30sProps> = ({ initialSeconds = 30, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      if (onFinish) onFinish();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onFinish]);

  const handleToggle = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialSeconds);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
    setIsFinished(false);
  };

  const progressPercent = ((initialSeconds - timeLeft) / initialSeconds) * 100;

  return (
    <div className="bg-stone-100 rounded-2xl p-4 border border-stone-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Cronômetro de Preparo</span>
          <p className="text-sm text-stone-700">Preparo expresso em até 30 segundos</p>
        </div>
        <div className="font-mono text-2xl font-bold tabular-nums text-stone-900">
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mb-3">
        <div
          className="bg-amber-600 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleToggle}
          className={`flex-1 h-11 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
            isFinished
              ? 'bg-emerald-700 text-white hover:bg-emerald-800'
              : isRunning
              ? 'bg-stone-800 text-white hover:bg-stone-700'
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          {isFinished ? (
            <>
              <Check className="w-4 h-4" />
              <span>Pronto para servir! Repetir?</span>
            </>
          ) : isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Iniciar 30s de Preparo</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          title="Reiniciar"
          className="w-11 h-11 rounded-xl bg-stone-200 text-stone-700 hover:bg-stone-300 flex items-center justify-center transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
