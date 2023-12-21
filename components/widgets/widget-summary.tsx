import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type {ReactNode} from "react";
import { fShortenNumber } from '@components/utils';
import type {WidgetSummary} from "@components/interface";

export function WidgetSummary(
  {title, total, icon, sx, ...other}: WidgetSummary
): ReactNode {
  return (
    <Card
      component={Stack}
      direction="row"
      spacing={3}
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon ? <Box sx={{ width: 64, height: 64 }}>{icon}</Box> : null}

      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(total)}</Typography>

        <Typography sx={{ color: 'text.disabled' }} variant="subtitle2">
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}
