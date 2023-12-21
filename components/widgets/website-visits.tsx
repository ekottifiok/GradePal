import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {useTheme} from '@mui/material/styles'
import type {ReactNode} from "react";
import { Chart, useChart } from '@components/chart';
import type {WebsiteVisitsWidget} from "@components/interface";

export function WebsiteVisits({ title, subheader, chart, ...other }: WebsiteVisitsWidget): ReactNode {
  const { 
    labels, 
    colors, 
    series, 
    options 
  } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader subheader={subheader} title={title} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          height={364}
          options={chartOptions}
          series={series}
          theme={useTheme()}
          type="line"
          width="100%"
        />
      </Box>
    </Card>
  );
}
