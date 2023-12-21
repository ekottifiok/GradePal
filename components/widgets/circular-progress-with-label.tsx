import type {ReactNode} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

export function CircularProgressWithLabel({progress}: {progress: number}): ReactNode {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant={progress === 0 ? "indeterminate" : "determinate"} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary" component="div" variant="caption">
          {progress !== 0 && `${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  )
}