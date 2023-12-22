"use client"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {alpha, useTheme} from '@mui/material/styles';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import type {ReactNode} from "react";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/navigation";
import {useResponsive} from "@components/hooks";
import {Iconify} from "@components/iconify";


export function Logout(): ReactNode {
  const smUp = useResponsive('up', 'sm');
  const router = useRouter()
  const theme = useTheme()
  const handleClick = (): void => {
    router.push("/api/auth/logout")
  }
  return smUp ? (
    <Button
      color="inherit"
      onClick={handleClick}
      startIcon={<LogoutOutlinedIcon/>}
      sx={{borderColor: alpha(theme.palette.grey[500], 0.16)}}
      variant="contained"
    >
      <Typography>Log Out</Typography>
    </Button>
  ) : (
    <IconButton onClick={handleClick}>
      <Iconify icon="mdi:logout"/>
    </IconButton>
  )

} 
