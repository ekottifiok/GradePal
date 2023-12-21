"use client"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {ReactNode} from "react";

// eslint-disable-next-line import/no-default-export, @typescript-eslint/no-explicit-any -- next js requires this
export default function Error({error}: { error?: any }): ReactNode {
  // eslint-disable-next-line no-console -- I need it to debug
  console.log(error);

  return (
    <Box>
      <Typography>
        An error occurred
      </Typography>

    </Box>
  )
}