import type {MouseEvent, ReactNode} from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import {alpha} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import type {UsersInterface} from "@components/interface";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    link: '/en'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    link: '/en/profile'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    link: '/en/settings'
  },
];

// ----------------------------------------------------------------------

export function AccountPopover({user}: { user: UsersInterface }): ReactNode {
  const [open, setOpen] = useState<EventTarget | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    setOpen(event.currentTarget as HTMLInputElement);
  };

  const handleClose = (): void => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          alt={`${user.name} avatar`}
          imgProps={{referrerPolicy: "no-referrer"}}
          src={user.picture}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        anchorEl={open as Element | undefined}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        onClose={handleClose}
        open={Boolean(open)}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Paper sx={{
          p: 0,
          mt: 1,
          ml: 0.75,
          width: 200,
        }}>
          <Box sx={{my: 1.5, px: 2}}>
            <Typography noWrap variant="subtitle2">
              {user.name}
            </Typography>
            <Typography noWrap sx={{color: 'text.secondary'}} variant="body2">
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{borderStyle: 'dashed'}}/>

          {MENU_OPTIONS.map((option) => (
            <MenuItem
              href={option.link}
              key={option.label}
              onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}

          <Divider sx={{borderStyle: 'dashed', m: 0}}/>

          <MenuItem
            href="/api/auth/logout"
            onClick={handleClose}
            sx={{typography: 'body2', color: 'error.main', py: 1.5}}
          >
            Logout
          </MenuItem>
        </Paper>
      </Popover>
    </>
  );
}
