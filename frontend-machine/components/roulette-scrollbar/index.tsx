'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ResponsibleCard from '../card';

type Game = {
  id: number | string;
  title: string;
  image: string;
  isFav?: boolean;
};

export type RouletteRef = {
  spin: () => void;
};

type Props = {
  games: Game[];
  gap?: number; // px gap between cards
  onResult?: (game: Game) => void;
};

function buildWheelData(games: Game[], repeat = 30) {
  if (!games?.length) return [];
  return Array.from({ length: repeat }).flatMap(() => games);
}

const RouletteScroller = forwardRef<RouletteRef, Props>(
  ({ games, gap = 16, onResult }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [containerWidth, setContainerWidth] = useState(0);

    // ✅ prevent multiple clicks freeze
    const spinningRef = useRef(false);
    const timeoutRef = useRef<number | null>(null);

    const wheelData = useMemo(() => buildWheelData(games, 35), [games]);
    const middleIndex = Math.floor(wheelData.length / 2);

    // ✅ measure container width responsively
    useLayoutEffect(() => {
      if (!containerRef.current) return;

      const el = containerRef.current;
      const ro = new ResizeObserver(() => setContainerWidth(el.clientWidth));

      ro.observe(el);
      setContainerWidth(el.clientWidth);

      return () => ro.disconnect();
    }, []);

    // ✅ scroll to any index by DOM position (responsive safe)
    const scrollToIndex = (index: number, behavior: ScrollBehavior) => {
      const container = containerRef.current;
      if (!container) return;

      const cardEl = container.querySelector(
        `[data-index="${index}"]`
      ) as HTMLElement | null;

      if (!cardEl) return;

      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.clientWidth;

      const targetLeft = cardLeft - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior,
      });
    };

    // ✅ figure out which card is exactly centered (real winner)
    const getCenteredIndex = () => {
      const container = containerRef.current;
      if (!container) return 0;

      const centerX = container.scrollLeft + containerWidth / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      const children = container.querySelectorAll('[data-index]');
      children.forEach((el) => {
        const node = el as HTMLElement;
        const left = node.offsetLeft;
        const width = node.clientWidth;
        const nodeCenter = left + width / 2;

        const dist = Math.abs(centerX - nodeCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = Number(node.dataset.index || 0);
        }
      });

      return bestIdx;
    };

    // ✅ start centered on load
    useEffect(() => {
      if (!containerWidth || !wheelData.length) return;

      requestAnimationFrame(() => {
        scrollToIndex(middleIndex, 'auto');
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerWidth, wheelData.length]);

    // ✅ SPIN FUNCTION
    const spin = () => {
      console.log('inside');

      if (spinningRef.current) return;
      if (!containerRef.current || !containerWidth || !wheelData.length) return;

      spinningRef.current = true;

      // clear old timer
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // ✅ make movement very visible
      const BIG_JUMP = 80;
      const extra = Math.floor(Math.random() * games.length);
      const targetIndex = middleIndex + BIG_JUMP + extra;

      console.log('scrollLeft BEFORE:', containerRef.current.scrollLeft);

      // reset to base center first (prevents reaching end)
      scrollToIndex(middleIndex, 'auto');

      // animate after DOM settles
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToIndex(targetIndex, 'smooth');
        });
      });

      timeoutRef.current = window.setTimeout(() => {
        console.log('scrollLeft AFTER:', containerRef.current?.scrollLeft);

        const centeredIdx = getCenteredIndex();
        const winner = wheelData[centeredIdx];

        onResult?.(winner);

        spinningRef.current = false;
      }, 2500);
    };

    useImperativeHandle(ref, () => ({ spin }));

    useEffect(() => {
      return () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <div className="relative w-full">
        {/* ✅ Stopper line */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 h-full -translate-x-1/2">
          <div className="flex h-full items-center">
            <div className="h-[160px] w-[2px] rounded-full bg-yellow-400/80" />
          </div>
        </div>

        {/* ✅ Scroll container */}
        <div
          ref={containerRef}
          className="flex w-full overflow-x-auto py-6"
          style={{
            gap: `${gap}px`,
            scrollbarWidth: 'none',
            paddingLeft: `${containerWidth / 2}px`,
            paddingRight: `${containerWidth / 2}px`,
          }}
        >
          {wheelData.map((g, idx) => (
            <div key={`${g.id}-${idx}`} data-index={idx} className="shrink-0">
              <ResponsibleCard title={g.title} image={g.image} isFav={g.isFav} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

RouletteScroller.displayName = 'RouletteScroller';
export default RouletteScroller;
