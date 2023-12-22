import { styled } from '@mui/material/styles';
import type {Theme} from '@components/interface'

export const DrawerHeader = styled('div')(({theme}: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));