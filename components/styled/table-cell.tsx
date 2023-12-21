import {styled, useColorScheme} from "@mui/material/styles";
import {TableCell, tableCellClasses} from "@mui/material";

export const StyledTableCell = styled(TableCell)(({theme}) => {
  const { mode } = useColorScheme();
  return mode === 'dark' && ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  })
});
