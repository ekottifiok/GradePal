"use client"
import type {ReactNode} from 'react';
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {useRouter} from 'next/navigation';
import type {UsersInterface} from "@components/interface";
import {Nav} from './nav';
import {Main} from './main';
import {Header} from './header';

export function DashboardLayout({children, user}: {
  children: ReactNode;
  user: UsersInterface | null
}): ReactNode {
  const router = useRouter();
  useEffect(() => {

    if (user === null) {
      router.push('/register')
    }
  }, [router, user])

  const [openNav, setOpenNav] = useState(false);
  const handleNav = (): void => {
    setOpenNav(!openNav)
  }

  if (user) {
    return (
      <>
        <Header onOpenNav={handleNav} user={user}/>
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: {xs: 'column', lg: 'row'},
          }}
        >
          <Nav onCloseNav={handleNav} openNav={openNav} user={user}/>
          <Main>{children}</Main>
        </Box>
      </>
    );
  }
}
