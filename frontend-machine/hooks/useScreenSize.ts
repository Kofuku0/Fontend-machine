'use client';

import { useEffect, useState } from 'react';

type ScreenSize = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export function useScreenSize(): ScreenSize {
  const [size, setSize] = useState(() => ({
    width: 0,
    height: 0,
  }));

  useEffect(() => {
    const update = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update(); // ✅ initial

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { width, height } = size;

  return {
    width,
    height,
    isMobile: width > 0 && width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
  };
}
