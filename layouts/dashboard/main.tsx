import type {ReactNode} from 'react';
import {Suspense} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import {useResponsive} from '@components/hooks/use-responsive';
import Loading from '@app/loading';
import {HEADER, DRAWER_WIDTH} from '@components/constants';

const SPACING = 8;

interface Main {
  children: ReactNode;
  sx?: object
}

export function Main({children, sx, ...other}: Main): ReactNode {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Container>
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
      </Container>
    </Box>
  );
}
