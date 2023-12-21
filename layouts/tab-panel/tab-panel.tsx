import type {ReactNode} from "react";
import {Box} from "@mui/material";

export function TabPanel({ children, value, index, ...other }: {
  children: ReactNode, value: number, index: number
}): ReactNode {
  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tab-panel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}