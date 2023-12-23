import React from 'react';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Box, Stack, Typography} from "@mui/material";
import {getUserAuth0} from "@components/utils/get-user-auth0";
import Error from "@app/error";
import {StaffPage} from './staff-page';

// eslint-disable-next-line import/no-default-export -- Next.js requires this
export default withPageAuthRequired(
  async () => getUserAuth0(getSession())
    .then((user) => {
      const currentHour = new Date().getHours();

      // Define the greeting messages
      let greeting: string;

      if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good evening";
      }
      return (
        <Box>
          <Stack sx={{mb: 5}}>
            <Typography variant='h4'>
              {greeting} {user.name}
            </Typography>
            <Typography>
              Hi, Welcome back 👋
            </Typography>
          </Stack>
          {user.isStaff ? (
            <StaffPage/>
          ) : (
            <StaffPage/>
          )}
        </Box>
      )
    })
    .catch((e: { stack: string, message: string }) => {
      return <Error error={e.message}/>
    })
)