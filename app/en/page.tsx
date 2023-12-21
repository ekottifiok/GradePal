import React from 'react';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Box, Typography} from "@mui/material";
import {getUserAuth0} from "@components/utils/get-user-auth0";
import Error from "@app/error";
import {StaffPage} from './staff-page';
import {StudentPage} from "./student-page";

// eslint-disable-next-line import/no-default-export -- Next.js requires this
export default withPageAuthRequired(
  async () => getUserAuth0(getSession())
      .then((user) => (
        <Box>
          <Typography sx={{mb: 5}} variant="h4">
            Hi, Welcome back 👋
          </Typography>
          {user.isStaff ? (
            <StaffPage user={user}/>
          ) : (
            <StudentPage user={user}/>
          )}
        </Box>
      ))
      .catch((e: { stack: string, message: string }) => {
        return <Error error={e.message}/>
      })
)