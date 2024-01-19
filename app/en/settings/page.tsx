import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {Box, Typography} from "@mui/material";
import type {Metadata} from "next";
import {getUserAuth0} from "@components/utils";
import {CsrPage} from "./csr-page";

export const metadata: Metadata = {
  title: 'GradePal - Settings',
}

// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async () => getUserAuth0(getSession())
    .then(() => (
      <Box>
        <Typography variant='h3'>Settings</Typography>
        <CsrPage/>
      </Box>
    ))
)