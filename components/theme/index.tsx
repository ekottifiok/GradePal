"use client"
import type {ReactNode} from 'react';
import { useMemo} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import type { ThemeOptions} from '@mui/material/styles';
import {createTheme, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
import { palette as paletteFunc } from './palette';
import { shadows as shadowsFunc } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows as customShadowsFunc } from './custom-shadows';

// ----------------------------------------------------------------------

const palette = paletteFunc();
const shadows = shadowsFunc();
const customShadows = customShadowsFunc()

export function ThemeProvider({ children }: {children: ReactNode}): ReactNode {

  const memoizedValue = useMemo<ThemeOptions>(
    ()  => ({
      palette,
      typography,
      shadows,
      customShadows,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  // @ts-expect-error -- theme 
  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
