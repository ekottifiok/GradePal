"use client"
import type {ReactNode} from 'react';
import {Box} from '@mui/material';
import {alpha, useTheme} from "@mui/material/styles";
import {Loader} from "@components/loader";
import {BgGradient} from "@components/theme";

// eslint-disable-next-line import/no-default-export -- this is needed in Next.js documentation
export default function Loading(): ReactNode {
  const theme = useTheme();
  
  return <Loader background={BgGradient({
        color: alpha(theme.palette.background.default, 0.7),
        imgUrl: 'background/overlay_4.jpg'
      })}/>
}
