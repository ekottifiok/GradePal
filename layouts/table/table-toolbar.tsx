import {
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import IconButton from "@mui/material/IconButton"
import type { ChangeEvent, ReactNode } from "react";
import { Iconify } from '@components/iconify';
import type { TableOptions } from '@components/interface';
import { ReplaceDeleteEnum } from '@components/interface';

interface TableToolbar {
  numSelected: number;
  filterName: string;
  onFilterName: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  options?: TableOptions;
}


export function TableToolbar(
  {
    filterName,
    numSelected,
    onFilterName,
    placeholder,
    options
  }: TableToolbar): ReactNode {

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgColor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
          value={filterName}
        />
      )}

      <IconButton>
        <Iconify icon="material-symbols:print-rounded" sx={{ color: 'inherit' }} />
      </IconButton>

      {numSelected > 0 ? (
        <SelectAllAction flag={options?.replaceDelete} />
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

function SelectAllAction({ flag }: { flag?: ReplaceDeleteEnum }): ReactNode {
  switch (flag) {
    case ReplaceDeleteEnum.Report:
      return (
        <Tooltip title="Report">
          <IconButton>
            <Iconify icon="material-symbols:report" />
          </IconButton>
        </Tooltip>
      )
    default:
      return (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )
  }
}
