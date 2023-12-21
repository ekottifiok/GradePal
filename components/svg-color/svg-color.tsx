import {forwardRef} from 'react';
import Box from '@mui/material/Box';

interface Parameter {
  src: string;
  sx: object
}

export const SvgColor = forwardRef<HTMLElement, Parameter>(
  function SvgColorForwardRef({src, sx, ...other}, ref) {
    return <Box
      className="svg-color"
      component="span"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />

  }
)

