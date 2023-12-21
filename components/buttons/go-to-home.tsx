"use client"
import { Button, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import type {ReactNode} from "react";
import {Iconify} from '@components/iconify';
import {RouterLink} from '@components/routes';

export function GoToHome({ sx }: { sx?: object }) : ReactNode {
  return (
    <Button
      color='inherit'
      component={RouterLink}
      href='/en'
      sx={{ borderColor: alpha(useTheme().palette.grey[500], 0.16), marginTop: '20px', ...sx }}
      variant='contained'
    >
      <Typography variant='h6'>Go to Home</Typography>
      <Iconify icon='mdi:arrow-right-bold' sx={{ paddingLeft: '5px' }} width='40' />
    </Button>
  );
}
