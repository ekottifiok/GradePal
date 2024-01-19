import type {ReactNode} from 'react';
import { useState} from 'react';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { BgBlur } from '@components/theme';
import {Iconify} from '@components/iconify';
import type {Theme} from '@components/interface/theme'



const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }: {theme: Theme}) => ({
  ...BgBlur(),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));



export function Searchbar({theme}:{theme: Theme}): ReactNode {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);

  const handleIsOpen = ():void => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleIsSearchClose = (): void => {
    setIsSearchBarOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleIsSearchClose}>
      <div>
        {!isSearchBarOpen && (
          <IconButton onClick={handleIsOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={isSearchBarOpen} mountOnEnter unmountOnExit>
          <StyledSearchbar theme={theme}>
            <Input
              disableUnderline
              fullWidth
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button color="inherit" onClick={handleIsOpen} variant="contained">
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
