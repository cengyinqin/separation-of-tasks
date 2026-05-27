'use client';


import { useMemo, useState } from 'react';
import { cards, categories, getCardsByCategory } from '@sot/shared';
import { useAppCtx } from '@/components/AppProvider';
import { CardFlip } from '@/components/CardFlip';
import { BottomNav } from '@/components/BottomNav';

export default function BrowsePage(): React.ReactNode {
  const ctx = useAppCtx();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? cards : getCardsByCategory(activeCategory)),
    [activeCategory],
  );

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
              isFavorite={ctx.isFavorite(card.id)}
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
        {/* Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-foreground/10 bg-white">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-3 text-xs whitespace-nowrap ${
              activeCategory === 'all'
                ? 'text-accent font-semibold border-b-2 border-accent'
                : 'text-muted'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-3 text-xs whitespace-nowrap ${
                activeCategory === cat.key
                  ? 'text-accent font-semibold border-b-2 border-accent'
                  : 'text-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Card List */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="text-[11px] text-muted mb-3 tracking-wider">{filtered.length} 张卡牌</p>
          <div className="space-y-2">
            {filtered.map((card) => (
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
                <span className="ml-2" style={{ color: ctx.isFavorite(card.id) ? '#D4AF37' : '#9CA3AF' }}>
                  {ctx.isFavorite(card.id) ? '★' : '☆'}
                </span>
                <span className="text-xl text-muted ml-2">›</span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
