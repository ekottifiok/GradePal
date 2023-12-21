import {forwardRef} from 'react';
import Link from 'next/link';

interface Parameter {
  href: string
}

export const RouterLink = forwardRef<HTMLAnchorElement, Parameter>(
  function RouterLinkForwardRef({href, ...other}, ref) {
    return (
      <Link href={href} ref={ref} {...other} />
    )
  })
