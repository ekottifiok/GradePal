import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import type { ReactElement } from "react";
import { Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { getUserAuth0 } from "@components/utils";
import { resultFormatPopulate } from "@components/populate";

// eslint-disable-next-line import/no-default-export -- required by Next.js
export default withPageAuthRequired(
  async (): Promise<ReactElement> => getUserAuth0(getSession())
    .then(() => (
      <Box>
        <Typography variant='h3'>Format to Upload Results</Typography>

        <List
          aria-labelledby="nested-list-subheader"
          component="nav"
          sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
          {resultFormatPopulate.map(({ key, content, image }) => (
            <ListItem disablePadding key={key} sx={{padding: "24px 0"}}>
              <Stack gap={2}>
                <Typography>Step {key}: {content}</Typography>
                {image}
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    ))
)