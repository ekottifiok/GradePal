import { useMemo } from 'react';
import { usePathname as NextUsePathname } from 'next/navigation'



export function usePathname(): string {
  const pathname = NextUsePathname()

  return useMemo(() => pathname, [pathname]);
}
