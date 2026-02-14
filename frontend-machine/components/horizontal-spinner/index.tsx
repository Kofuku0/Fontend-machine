'use client';

import { useRef, useState,useMemo } from 'react';
// import RouletteScroller, { RouletteRef } from '@/frontend-machine/components/roulette-scrollbar';
import ResponsibleCard from '../card';

const games = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Game ${i + 1}`,
  image: `https://picsum.photos/400/400?random=${i + 1}`,
  isFav: i % 3 === 0,
}));
import { useScreenSize } from '@/frontend-machine/hooks/useScreenSize';
export default function Page() {
  // const rouletteRef = useRef<RouletteRef>(null);
  const [winner, setWinner] = useState<any>(null);
  const { width, isMobile, isTablet, isDesktop } = useScreenSize();
  console.log('working...')
  

  const wheelData = useMemo(()=>{
    const repeat = 20;
    return Array.from({length:repeat}).flatMap(()=>games)
  },[games]);


   const containerRef = useRef<HTMLDivElement | null>(null);
   const [containerWidth, setContainerWidth] = useState(0);


   // middle Index
   const middleIndex = Math.floor(wheelData.length/2);
   
  const scrollToIndex = (index:number,behavior:ScrollBehavior){
      const container = containerRef.current;
      if(!container) return;

      // card selector 

      const cardEl = container.querySelector(`[data-index="${index}"]`) as HTMLElement | null;

      if(!cardEl) return;

      const target = cardEl.offsetLeft-containerWidth/2 +cardEl.cliue
  }
  return (
    <div className="min-h-screen w-full bg-[#0b0f19] px-6 py-10 text-white">
      


      <div className='w-[700px] relative h-[600px] bg-red-500 p-4'>



      <div className='relative bg-green-500'>
        
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 h-full -translate-x-1/2">
        <div className="flex h-full items-center">
          <div className="h-[160px] w-[2px] rounded-full bg-yellow-400/80" />
        </div>
      </div>
        
       <div ref = {containerRef} className='flex w-full overflow-x-auto gap-4 py-6'>
      {wheelData.map((g,idx) => (
          <div key={`${g.id}-${idx}`} data-index = {idx} className="shrink-0">
            <ResponsibleCard title={g.title} image={g.image} isFav={g.isFav} />
          </div>
        ))}
        </div>
        </div>

        </div>
      

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            // onClick={() => rouletteRef.current?.spin()}
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
   
  );
}
