import type { Metadata } from 'next';
import { AppProvider } from '@/components/AppProvider';
import { SWRegister } from '@/components/SWRegister';
import './globals.css';

export const metadata: Metadata = {
  title: '课题分离练习卡牌',
  description: '基于阿德勒心理学的每日心理觉察工具 — 厘清边界，拒绝内耗',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="theme-color" content="#F9F8F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◎</text></svg>" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex justify-center bg-background">
        <AppProvider>
          <div className="w-full max-w-md bg-background min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
            {children}
          </div>
        </AppProvider>
        <SWRegister />
      </body>
    </html>
  );
}
