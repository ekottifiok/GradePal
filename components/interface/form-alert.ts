import type {AlertColor} from "@mui/material";

export interface FormAlert { 
  severity: AlertColor | undefined; 
  content: string 
}