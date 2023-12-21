import type { Breakpoint} from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

export function useResponsive(query: string, start: Breakpoint, end?: Breakpoint): boolean {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end ?? 'xl'));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// // ----------------------------------------------------------------------

// export function useWidth():string[] {
//   const theme = useTheme();

//   const keys = [...theme.breakpoints.keys].reverse();

//   return (
//     keys.reduce((output: any, key: Breakpoint) => {
//       const matches = useMediaQuery(theme.breakpoints.up(key));

//       return !output && matches ? key : output;
//     }, null) || 'xs'
//   );
// }
