"use client"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {alpha, useTheme} from '@mui/material/styles';
import type {ReactNode} from "react";


export function Logout(): ReactNode {
  return (
    <Button
      color="inherit"
      href="/api/auth/logout"
      sx={{borderColor: alpha(useTheme().palette.grey[500], 0.16)}}
      variant="contained"
    >
      <Typography>Log Out</Typography>
    </Button>
  );

} 
