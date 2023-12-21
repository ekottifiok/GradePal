import {AppBar, Box, IconButton, Stack, Toolbar,} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import type {ReactNode} from "react";
import {useResponsive} from '@components/hooks/use-responsive';
import {BgBlur} from '@components/theme/css';
import type {UsersInterface, Theme} from "@components/interface";
import {Logout as LogoutButton} from "@components/buttons";
import {Iconify} from '@components/iconify';
import {AccountPopover, LanguagePopover, NotificationsPopover, Searchbar,} from './common';
import {HEADER, NAV} from './config-layout';

export function Header({onOpenNav, user}: {
  onOpenNav: () => void,
  user: UsersInterface
}): ReactNode {

  const theme: Theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...BgBlur(),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: {lg: 5},
        }}
      >
        {!lgUp && (
          <IconButton onClick={onOpenNav} sx={{mr: 1}}>
            <Iconify icon="eva:menu-2-fill"/>
          </IconButton>
        )}

        <Searchbar theme={theme}/>

        <Box sx={{flexGrow: 1}}/>


        <Stack alignItems="center" direction="row" spacing={1}>
          <LogoutButton/>
          <LanguagePopover/>
          <NotificationsPopover/>
          <AccountPopover user={user}/>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
