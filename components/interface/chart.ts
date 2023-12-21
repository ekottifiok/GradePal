import type {CSSProperties} from "react";

export interface BaseOptions {
  colors: unknown[];
  chart: {
    toolbar: {
      show: boolean;
    };
    zoom: {
      enabled: boolean;
    };
    foreColor: string;
    fontFamily: CSSProperties['fontFamily'];
  };
  states: {
    hover: {
      filter: {
        type: string;
        value: number;
      };
    };
    active: {
      filter: {
        type: string;
        value: number;
      };
    };
  };
  responsive: {
    breakpoint: number;
    options: {
      plotOptions: {
        bar: {
          columnWidth: string;
        }
      }
    }
  }[];
  fill: {
    opacity: number;
    gradient: {
      type: 'vertical';
      shadeIntensity: number;
      opacityFrom: number;
      opacityTo: number;
      stops: number[];
    };
  };

  dataLabels: {
    enabled: boolean;
  };

  stroke: {
    width: number;
    curve: string;
    lineCap: string;
  };

  grid: {
    strokeDashArray: number;
    borderColor: string;
    xaxis: {
      lines: {
        show: boolean;
      };
    };
  };

  xaxis: {
    axisBorder: { show: boolean };
    axisTicks: { show: boolean };
  };

  // Markers
  markers: {
    size: number;
    strokeColors: string;
  };

  // Tooltip
  tooltip: {
    theme: boolean;
    x: {
      show: boolean;
    };
  };

  // Legend
  legend: {
    show: boolean;
    fontSize: number;
    position: string;
    horizontalAlign: string;
    markers: {
      radius: number;
    };
    fontWeight: number;
    itemMargin: {
      horizontal: number;
    };
    labels: {
      colors: string;
    };
  };

  // plotOptions
  plotOptions: {
    // Bar
    bar: {
      borderRadius: number;
      columnWidth: string;
      borderRadiusApplication: string;
      borderRadiusWhenStacked: string;
    };

    // Pie + Donut
    pie: {
      donut: {
        labels: {
          show: boolean;
          value: LabelValue;
          total: LabelTotal;
        };
      };
    };

    // Radialbar
    radialBar: {
      track: {
        strokeWidth: '100%';
        background: string;
      };
      dataLabels: {
        value: LabelValue;
        total: LabelTotal;
      };
    };

    // Radar
    radar: {
      polygons: {
        fill: { colors: string[] };
        strokeColors: string;
        connectorColors: string;
      };
    };

    // polarArea
    polarArea: {
      rings: {
        strokeColor: string;
      };
      spokes: {
        connectorColors: string;
      };
    };
  };
}

export interface LabelValue {
  offsetY: number,
  color: CSSProperties['color'];
  fontSize: CSSProperties['fontSize'];
  fontWeight: CSSProperties['fontWeight'];
  lineHeight: CSSProperties['lineHeight'];
}

export interface LabelTotal {
  show: boolean;
  label: string;
  color: CSSProperties['color'];
  fontSize: CSSProperties['fontSize'];
  fontWeight: CSSProperties['fontWeight'];
  lineHeight: CSSProperties['lineHeight'];
}

export type UnknownRecord = Record<string, unknown>[];

export type UseChartReturnType = BaseOptions & UnknownRecord[]
