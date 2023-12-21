import type { ReactNode} from 'react';
import {forwardRef} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { StyledLabel } from './styles';
import { EnumColors, EnumVariant } from './interface';

interface Parameter {
  children: ReactNode,
  color: EnumColors,
  variant: EnumVariant,
  startIcon?: ReactNode,
  endIcon?: ReactNode
  sx: object
}

export const Label = forwardRef(
  function LabelForwardRef({
    children, color = EnumColors.default,
    variant = EnumVariant.soft, startIcon, endIcon, sx, ...other
  }: Parameter, ref): ReactNode {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        component="span"
        ownerState={{ color, variant }}
        ref={ref}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon ? <Box sx={{ mr: 0.75, ...iconStyles }}>{startIcon}</Box> : null}

        {children}

        {endIcon ? <Box sx={{ ml: 0.75, ...iconStyles }}>{endIcon}</Box> : null}
      </StyledLabel>
    );
  }
);
