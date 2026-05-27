'use client';


import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useAppCtx } from '@/components/AppProvider';
import { CardFlip } from '@/components/CardFlip';
import { EmptyState } from '@/components/EmptyState';
import { Toast } from '@/components/Toast';
import { BottomNav } from '@/components/BottomNav';

export default function DrawPage(): React.ReactNode {
  const ctx = useAppCtx();
  const [showToast, setShowToast] = useState(false);
  const [realized, setRealized] = useState(false);

  const handlePractice = useCallback(() => {
    ctx.recordPractice();
    setRealized(true);
    setShowToast(true);
  }, [ctx.recordPractice]);

  const handleDrawAgain = useCallback(() => {
    setRealized(false);
    ctx.drawCard();
  }, [ctx.drawCard]);

  if (!ctx.currentCard) {
    return (
      <>
        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <EmptyState
            icon="◎"
            title="点击抽取一张卡牌"
            description="让课题分离的智慧在随机中与你相遇"
          />
          <button
            onClick={ctx.drawCard}
            className="mx-14 w-[calc(100%-7rem)] h-12 bg-foreground text-white text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors"
          >
            开始抽取
          </button>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {ctx.shuffling ? (
          <div className="flex flex-col items-center">
            <p className="shuffle-text font-serif text-2xl text-foreground/60 text-center">
              {ctx.currentCard.title}
            </p>
            <div className="mt-6 w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-muted mt-2">正在为你抽取…</p>
          </div>
        ) : (
          <>
            <CardFlip
              card={ctx.currentCard}
              isFavorite={ctx.isFavorite(ctx.currentCard.id)}
              onToggleFavorite={ctx.toggleFavorite}
            />
            <div className="flex gap-4 w-full max-w-xs">
              <button
                onClick={handlePractice}
                disabled={realized}
                className={`flex-1 h-12 text-xs tracking-[0.15em] uppercase transition-colors ${
                  realized
                    ? 'bg-accent text-white cursor-not-allowed'
                    : 'bg-foreground text-white hover:bg-foreground/90'
                }`}
              >
                {realized ? '已完成' : '我已觉察'}
              </button>
              <button
                onClick={handleDrawAgain}
                className="flex-1 h-12 border border-foreground text-foreground text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-white transition-colors"
              >
                再抽一张
              </button>
            </div>
          </>
        )}
        <Toast show={showToast} onDone={() => setShowToast(false)} />
      </main>
      <BottomNav />
    </>
  );
}
