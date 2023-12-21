"use client"
import type {ReactNode} from 'react'
import {Box, Stack, Typography} from '@mui/material';
import {GoToHome} from "@components/buttons";

// eslint-disable-next-line import/no-default-export -- required by next js
export default function Page(): ReactNode {
  return (
    <Stack direction='column'>
      <Typography>It&#39;s sad to see you go</Typography>
      <Box sx={{
        m: "20px",
        position: "relative",
        height: "100px",
        width: "100px",
        border: "4px solid #ef9a9a",
        borderRadius: "50%",
        background: "#ffebee",
        '&::before': {
          content: '""',
          position: 'absolute',
          border: "3px solid transparent",
          borderRadius: "50%",
          height: "65px",
          right: "17px",
          width: "60px",
          bottom: "-30px",
          borderTopColor: "#ef9a9a",
        },
        '&::after': {
          content: '". ."',
          position: 'absolute',
          fontSize: "60px",
          textAlign: "center",
          width: "50px",
          top: "-8px",
          left: "25px",
          color: "#ef9a9a",
        }
      }}/>
      <GoToHome/>
    </Stack>
  )
}