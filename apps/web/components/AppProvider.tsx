'use client';

import { createContext, useContext } from 'react';
import { useApp } from '@/hooks/useApp';

type AppCtx = ReturnType<typeof useApp>;
const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const app = useApp();
  return <Ctx.Provider value={app}>{children}</Ctx.Provider>;
}

export function useAppCtx() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppCtx must be used within AppProvider');
  return ctx;
}
