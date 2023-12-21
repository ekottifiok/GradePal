"use client"
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import {Box, Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useColorScheme} from "@mui/material/styles";
import type {MouseEvent, ReactNode} from "react";
import type {Mode} from "@mui/system/cssVars/useCurrentColorScheme";

export function CsrPage(): ReactNode {

  const {mode, setMode} = useColorScheme();

  const handleAlignment = (
    _event: MouseEvent<HTMLElement>,
    newMode: Mode,
  ): void => {
    setMode(newMode)
  };

  return (
    <Box pt={3}>
      <Stack>
        <Typography>Mode</Typography>
        <ToggleButtonGroup
          aria-label="text alignment"
          exclusive
          onChange={handleAlignment}
          size='large'
          sx={{
            borderRadius: '5px',
          }}
          value={mode}
        >
          <ToggleButton value="light">
            <Stack direction='row' gap={2}>
              <LightModeOutlinedIcon/>
              <Typography>Light</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="system">
            <Stack direction='row' gap={2}>
              <SettingsBrightnessOutlinedIcon/>
              <Typography>System</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="dark">
            <Stack direction='row' gap={2}>
              <DarkModeOutlinedIcon/>
              <Typography>Dark</Typography>
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  )
}