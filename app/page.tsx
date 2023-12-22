"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import { Alert, AlertTitle, Stack, Typography } from '@mui/material';
import type {ReactNode} from "react";
import { GetStarted } from '@components/buttons/get-started';
import { useResponsive } from '@components/hooks';
import {Redirect} from "@components/utils";
import {IMAGE_PATH} from "@components/constants";
import Loading from './loading';

// eslint-disable-next-line import/no-default-export -- next js requires this
export default function Page(): ReactNode {

  const { user, error, isLoading } = useUser();

  const upMd = useResponsive('up', 'md')
  if (isLoading) {
    return <Loading />
  }
  return user ? <Redirect to='/en' /> : (
    <Stack alignItems='center' direction={upMd ? 'row' : 'column'}
      gap={4} justifyContent='center'
      sx={{ paddingLeft: '20px', height: '100vh' }}>
      <Stack sx={{ padding: '40px 0 0 10px' }} >
        {error ? (
          <Alert severity='error'>
            <AlertTitle>
              <Typography sx={{ fontWeight: 'fontWeightMedium' }}>
                Error
              </Typography>
            </AlertTitle>
            {error.message}
          </Alert>
        ) : null}

        <Typography sx={{ py: 1.3 }} variant='h1'>
          Welcome to GradePal
        </Typography>
        <Typography variant='h4'>
          Your pal when it comes to handling results
        </Typography>

        <Typography sx={{ paddingTop: '10px' }}>

          Handling results has being hectic
          but now GradePal makes it easier university staff upload results and it’s ready to be seen by all students

        </Typography>

        <GetStarted href="/api/auth/login" sx={{ mt: 3 }} />

      </Stack>

      <img
        alt='Black boy reading a book'
        src={IMAGE_PATH.concat("background/black_boy_reading.png")}
        style={{
          height: "100", width: "100", objectFit: 'cover',
        }}
      />
    </Stack>
  );
}
