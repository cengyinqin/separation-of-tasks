'use client';

import { useState, useCallback } from 'react';
import type { Card } from '@sot/shared';

interface Props {
  card: Card;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function CardFlip({ card, isFavorite, onToggleFavorite }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col items-center py-4">
      {/* Card */}
      <div
        className="card perspective-1000 w-[300px] h-[400px] cursor-pointer select-none"
        onClick={handleFlip}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); } }}
        tabIndex={0}
        role="button"
        aria-label={flipped ? '点击翻回正面' : '点击翻转查看答案'}
      >
        <div
          className={`card-inner ${flipped ? 'flipped' : ''}`}
          style={{ transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          {/* Front */}
          <div
            className="card-face bg-white border border-foreground/5"
            style={{
              boxShadow: flipped
                ? 'none'
                : '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <span className="absolute top-4 left-4 text-[11px] text-gray-400 tracking-[0.15em]">
              NO. {card.id}
            </span>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 text-center px-2">
              {card.title}
            </h2>
            <p className="text-[15px] text-muted leading-relaxed text-center px-4">
              {card.situation}
            </p>
            <span className="absolute bottom-6 text-[10px] text-muted uppercase tracking-[0.2em] animate-pulse-slow">
              点击翻转
            </span>
          </div>

          {/* Back */}
          <div
            className="card-face card-back bg-background border border-foreground"
            style={{
              boxShadow: flipped
                ? '0 8px 30px rgba(0,0,0,0.08)'
                : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <span className="text-xs text-accent uppercase tracking-[0.3em] mb-4">核心解法</span>
            <p className="text-base text-foreground leading-relaxed text-left w-full px-2">
              {card.solution}
            </p>
            {card.action && (
              <div className="mt-5 w-full border-l-2 border-accent pl-3 text-left">
                <span className="text-[11px] text-accent tracking-[0.2em]">今日行动</span>
                <p className="text-sm text-muted leading-relaxed mt-1">{card.action}</p>
              </div>
            )}
            <span className="absolute bottom-6 text-[10px] text-muted uppercase tracking-[0.2em]">
              点击翻回
            </span>
          </div>
        </div>
      </div>

      {/* Favorite button */}
      <button
        className="mt-4 p-2 text-2xl transition-all duration-200 hover:scale-110 active:scale-90 focus:outline-none"
        style={{ color: isFavorite ? '#D4AF37' : '#9CA3AF' }}
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(card.id); }}
        aria-label={isFavorite ? '取消收藏' : '收藏'}
      >
        <span className={isFavorite ? 'animate-pulse-slow' : ''}>
          {isFavorite ? '★' : '☆'}
        </span>
      </button>
    </div>
  );
}
