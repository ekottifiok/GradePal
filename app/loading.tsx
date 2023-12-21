"use client"
import './loading.css'
import type {ReactNode} from 'react';
import { Box } from '@mui/material'
import {alpha, useTheme} from '@mui/material/styles'
import { BgGradient } from '@components/theme/css';
import bgImage from '@public/assets/background/overlay_4.jpg'

// eslint-disable-next-line import/no-default-export -- this is needed in Next.js documentation
export default function Loading(): ReactNode {
  const theme = useTheme();
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "inherit",
        justifyContent: "center",
        width: "inherit",
        ...BgGradient({
          color: alpha(theme.palette.background.default, 0.7),
          imageData: bgImage
        }),
      }}
    >
      <LoadingCircle />
    </Box>
  )
}

function LoadingCircle(): ReactNode {
  return (
    <div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
      <div className="line">
        <div className="round" />
      </div>
    </div>
  )
}