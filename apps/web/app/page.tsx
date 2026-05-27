'use client';


import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cards } from '@sot/shared';
import { useAppCtx } from '@/components/AppProvider';
import { BottomNav } from '@/components/BottomNav';

export default function HomePage(): React.ReactNode {
  const { data } = useAppCtx();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const c = cards[Math.floor(Math.random() * cards.length)];
    setQuote(c.solution.slice(0, 80) + '…');
  }, []);

  return (
    <>
      <header className="pt-8 pb-4 px-6 border-b border-foreground/10 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">课题分离</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">Separation of Tasks</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted uppercase tracking-wider">累计练习</p>
          <p className="font-serif text-xl text-accent font-bold">{data.totalPracticeCount}</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="fade-in space-y-4 text-center">
          <h2 className="font-serif text-3xl text-foreground leading-tight">
            厘清边界<br />拒绝内耗
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-[200px] mx-auto">
            做自己人生的主人，<br />从分清"谁的课题"开始。
          </p>
        </div>

        {/* Stats */}
        <div className="flex bg-white border border-foreground/10 py-5">
          <div className="flex-1 text-center">
            <p className="font-serif text-xl font-bold text-accent">{data.totalPracticeCount}</p>
            <p className="text-[10px] text-muted tracking-wider mt-1">累计练习</p>
          </div>
          <div className="w-px bg-foreground/10" />
          <div className="flex-1 text-center">
            <p className="font-serif text-xl font-bold text-accent">{data.streakDays}</p>
            <p className="text-[10px] text-muted tracking-wider mt-1">连续天数</p>
          </div>
          <div className="w-px bg-foreground/10" />
          <div className="flex-1 text-center">
            <p className="font-serif text-xl font-bold text-accent">{data.favorites.length}</p>
            <p className="text-[10px] text-muted tracking-wider mt-1">收藏卡牌</p>
          </div>
        </div>

        {/* Quote */}
        {quote && (
          <div className="bg-white p-5 border-l-[3px] border-l-accent fade-in">
            <p className="text-[10px] text-accent uppercase tracking-[0.3em] mb-2">每日一语</p>
            <p className="text-sm italic text-foreground leading-relaxed">"{quote}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3 fade-in">
          <Link
            href="/draw"
            className="flex items-center justify-center gap-2 h-14 bg-foreground text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-foreground/90 transition-colors"
          >
            随机抽取一张
            <span>→</span>
          </Link>
          <Link
            href="/browse"
            className="flex items-center justify-center h-14 border border-foreground text-foreground text-xs tracking-[0.15em] uppercase font-medium hover:bg-foreground hover:text-white transition-colors"
          >
            浏览全部卡牌
          </Link>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
