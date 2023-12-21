/* eslint-disable @typescript-eslint/no-unsafe-assignment -- ApexChart requires any */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme} from '@mui/material/styles';
import type {ReactNode} from "react";
import {useChart} from '@components/chart';
import type {CurrentSubjectWidgets} from "@components/interface";
import {StyledChart} from "@components/styled";

export function CurrentSubject({title, subheader, chart, ...other}: CurrentSubjectWidgets): ReactNode {
  const theme = useTheme();

  const {series, colors, categories, options} = chart;

  const chartOptions = useChart({
    colors,
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.48,
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: new Array(6).fill(theme.palette.text.secondary)
        }
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader subheader={subheader} sx={{mb: 5}} title={title}/>

      <StyledChart
        dir="ltr"
        height={340}
        options={chartOptions}
        series={series}
        theme={useTheme()}
        type="radar"
        width="100%"
      />
    </Card>
  );
}
