'use client';


import { useState } from 'react';
import { cards } from '@sot/shared';
import { useAppCtx } from '@/components/AppProvider';
import { CardFlip } from '@/components/CardFlip';
import { EmptyState } from '@/components/EmptyState';
import { BottomNav } from '@/components/BottomNav';

export default function FavoritesPage(): React.ReactNode {
  const ctx = useAppCtx();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const favoriteCards = cards.filter((c) => ctx.data.favorites.includes(c.id));

  if (selectedId !== null) {
    const card = cards.find((c) => c.id === selectedId)!;
    return (
      <>
        <main className="flex-1 flex flex-col items-center">
          <button
            onClick={() => setSelectedId(null)}
            className="self-start px-6 pt-4 text-xs text-muted tracking-[0.15em] uppercase hover:text-foreground"
          >
            ← 返回列表
          </button>
          <div className="flex-1 flex items-center justify-center">
            <CardFlip
              card={card}
              isFavorite
              onToggleFavorite={ctx.toggleFavorite}
            />
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col">
        {favoriteCards.length === 0 ? (
          <EmptyState
            icon="☆"
            title="还没有收藏卡牌"
            description="在浏览或抽取时点击星标，把触动你的卡牌收藏到这里"
          />
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <p className="text-[11px] text-muted mb-3 tracking-wider">{favoriteCards.length} 张收藏</p>
            <div className="space-y-2">
              {favoriteCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedId(card.id)}
                  className="w-full flex items-center bg-white p-4 border border-foreground/5 text-left hover:border-accent/30 transition-colors"
                >
                  <span className="text-[11px] text-muted tracking-wider mr-3">#{card.id}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base font-semibold text-foreground mb-1">{card.title}</h3>
                    <p className="text-[13px] text-muted truncate">{card.situation}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); ctx.toggleFavorite(card.id); }}
                    className="p-2 text-accent text-lg"
                    aria-label="取消收藏"
                  >
                    ★
                  </button>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}
