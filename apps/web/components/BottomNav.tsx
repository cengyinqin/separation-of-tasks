'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: '首页', icon: '◇' },
  { href: '/draw', label: '抽取', icon: '◎' },
  { href: '/browse', label: '浏览', icon: '☰' },
  { href: '/favorites', label: '收藏', icon: '★' },
];

export function BottomNav(): React.ReactNode {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t border-foreground/10 flex justify-around py-2">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center px-4 py-1"
            style={{ color: active ? '#D4AF37' : '#9CA3AF' }}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-[11px] mt-0.5">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
