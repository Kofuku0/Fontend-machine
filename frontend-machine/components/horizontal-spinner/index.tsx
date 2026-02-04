'use client';

import { useRef, useState } from 'react';
import RouletteScroller, { RouletteRef } from '@/frontend-machine/components/roulette-scrollbar';

const games = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Game ${i + 1}`,
  image: `https://picsum.photos/400/400?random=${i + 1}`,
  isFav: i % 3 === 0,
}));
import { useScreenSize } from '@/frontend-machine/hooks/useScreenSize';
export default function Page() {
  const rouletteRef = useRef<RouletteRef>(null);
  const [winner, setWinner] = useState<any>(null);
  const { width, isMobile, isTablet, isDesktop } = useScreenSize();
  console.log('working...')
  
  return (
    <div className="min-h-screen bg-[#0b0f19] px-6 py-10 text-white">
      <h1 className="mb-4 text-xl font-bold">Roulette Spin Test</h1>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className={`w-[800px] overflow-hidden`}>
          <RouletteScroller
          ref={rouletteRef}
          games={games}
          gap={16}
          onResult={(g) => setWinner(g)}
        />
      </div>
      

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => rouletteRef.current?.spin()}
            className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-black"
          >
            Spin
          </button>

          {winner && (
            <p className="text-sm text-white/80">
              Winner: <span className="font-bold">{winner.title}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
