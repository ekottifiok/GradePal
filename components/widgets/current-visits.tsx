import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles';
import type {ReactNode} from "react";
import { fNumber } from '@components/utils/format-number';
import { useChart } from '@components/chart';
import type {WidgetsRawData} from "@components/interface";
import {StyledChart} from "@components/styled";

export function CurrentVisits({ title, subheader, chart, ...other }: WidgetsRawData): ReactNode {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader subheader={subheader} sx={{ mb: 5 }} title={title} />

      <StyledChart
        dir="ltr"
        height={280}
        options={chartOptions}
        series={series.map((i) => i.value)}
        theme={useTheme()}
        type="pie"
        width="100%"
      />
    </Card>
  );
}
