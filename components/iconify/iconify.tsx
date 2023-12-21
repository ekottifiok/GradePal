"use client"
import type {ReactNode} from "react";
import {forwardRef} from 'react';
import {Icon} from '@iconify/react';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

interface IconifyInterface {
  icon: string;
  width?: string;
  sx?: object;
  className?: string;
}

export const Iconify = forwardRef<HTMLElement, IconifyInterface>(
  function IconifyRender({
                           className,
                           icon,
                           width = '20',
                           sx, ...other}, ref): ReactNode {
    return (
      <Box
        className={`component-iconify ${className}`}
        component={Icon}
        icon={icon}
        ref={ref}
        sx={{width, height: parseInt(width), ...sx}}
        {...other}
      />
    )
  });
