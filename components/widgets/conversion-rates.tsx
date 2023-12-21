import {
  Box,
  Card,
  CardHeader
} from '@mui/material';
import type { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { fNumber } from '@components/utils/format-number';
import { Chart, useChart } from '@components/chart';
import type {ConversionRatesWidget} from "@components/interface";

export function ConversionRates({ title, subheader, chart, ...other }: ConversionRatesWidget ): ReactNode {
  const { colors, series, options } = chart;
  
  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader subheader={subheader} title={title} />

      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          options={chartOptions}
          series={[{ data: series.map((i) => i.value) }]}
          theme={useTheme()}
          type="bar"
          width="100%"
        />
      </Box>
    </Card>
  );
}
