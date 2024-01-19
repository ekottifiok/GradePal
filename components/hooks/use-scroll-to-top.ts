"use client"
import { useEffect } from 'react';
import { usePathname } from './use-pathname';

export function useScrollToTop(): void {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
