'use client';


import { useEffect, useState } from 'react';
import { encouragements } from '@sot/shared';

interface Props {
  show: boolean;
  onDone: () => void;
}

export function Toast({ show, onDone }: Props): React.ReactNode | null {
  const [msg] = useState(() => encouragements[Math.floor(Math.random() * encouragements.length)]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  if (!show && !visible) return null;

  return (
    <div
      className={`fixed bottom-24 left-8 right-8 bg-foreground text-white px-6 py-4 text-center z-50 transition-all duration-300 italic ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {msg}
    </div>
  );
}
