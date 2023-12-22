import type {MouseEvent, ReactNode} from 'react';
import { useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import {IMAGE_PATH} from "@components/constants";

// ----------------------------------------------------------------------

const LANGUAGES = [
  {
    value: 'en',
    label: 'English',
    icon: IMAGE_PATH.concat('icons/ic_flag_ng.svg'),
  },
  {
    value: 'de',
    label: 'German',
    icon: IMAGE_PATH.concat('icons/ic_flag_de.svg'),
  },
  {
    value: 'fr',
    label: 'French',
    icon: IMAGE_PATH.concat('icons/ic_flag_fr.svg'),
  },
];

// ----------------------------------------------------------------------

export function LanguagePopover(): ReactNode {
  const [isOpen, setIsOpen] = useState<EventTarget | null>(null);

  const handleIsOpen = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>): void => {
    setIsOpen(!isOpen ? event.currentTarget : null)
  }

  return (
    <>
      <IconButton
        onClick={handleIsOpen}
        sx={{
          width: 40,
          height: 40,
          ...(isOpen && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img alt={LANGUAGES[0].label} src={LANGUAGES[0].icon} />
      </IconButton>

      <Popover
        anchorEl={isOpen as Element}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleIsOpen}
        open={Boolean(isOpen)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Paper sx={{
          p: 0,
          mt: 1,
          ml: 0.75,
          width: 180,
        }}>
          
        {LANGUAGES.map((option) => (
          <MenuItem
            href="#"
            key={option.value}
            onClick={handleIsOpen}
            selected={option.value === LANGUAGES[0].value}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box alt={option.label} component="img" src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
        </Paper>
      </Popover>
    </>
  );
}
