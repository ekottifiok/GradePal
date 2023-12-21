import type {ReactNode} from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import {alpha, useTheme} from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import {usePathname, useResponsive} from '@components/hooks';
import {Logo} from '@components/logo';
import {Scrollbar} from '@components/scrollbar';
import {RouterLink} from "@components/routes";
import type {UsersInterface} from "@components/interface";
import {NAV} from './config-layout';
import {navConfig} from './config-navigation';

export function Nav({openNav, onCloseNav, user}: {
  openNav: boolean,
  onCloseNav: () => void,
  user: UsersInterface
}): ReactNode {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const theme = useTheme();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [onCloseNav, openNav, pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar
        alt={`${user.name} avatar`}
        imgProps={{referrerPolicy: "no-referrer"}}
        src={user.picture}
      />

      <Box sx={{ml: 2}}>
        <Typography variant="subtitle2">{user.name}</Typography>

        <Typography sx={{color: 'text.secondary'}} variant="body2">
          {user.isStaff ? user.staffRole : user.matriculationNumber}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{px: 2}}>
      {navConfig.map((item) => (
        <NavItem item={item} key={item.title}/>
      ))}
    </Stack>
  );


  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{mt: 3, ml: 4}}/>

      {renderAccount}

      {renderMenu}

      <Box sx={{flexGrow: 1}}/>


    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: {lg: 0},
        width: {lg: NAV.WIDTH},
      }}
    >

      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
          onClose={onCloseNav}
          open={openNav}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({item}: {
  item: {
    path: string;
    icon: ReactNode;
    title: string;
  }
}): ReactNode {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{width: 24, height: 24, mr: 2}}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
