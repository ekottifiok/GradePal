/* eslint-disable @typescript-eslint/no-explicit-any -- ApexOptions use any */
import type {ApexOptions} from "apexcharts";
import type {ReactNode} from "react";

export interface CurrentSubjectWidgets {
  chart: {
    colors?: any[];
    options?: ApexOptions;
    categories: any;
    series: ApexAxisChartSeries;
  };
  other?: ApexOptions;
  subheader?: string;
  title: string;
}

export interface BestStudentsWidget {
  chart: {
    labels?: string[];
    colors?: any[];
    options?: ApexOptions;
    categories?: any;
    series: {
      label: string;
      value: number;
      name?: string
    }[];
  }
  other?: ApexOptions;
  subheader: string;
  title: string;
}

export interface WidgetsRawData {
  chart: {
    labels: string[];
    colors?: any[];
    options?: ApexOptions;
    categories: any;
    series: {
      label: string;
      value: number;
      name?: string
    }[];
  }
  other: ApexOptions;
  subheader: string;
  title: string;
}



export interface WebsiteVisitsWidget {
  chart: {
    labels: string[];
    colors?: any[];
    options?: ApexOptions;
    series: {
      name: string;
      type: string;
      fill: string;
      data: number[];
    }[];
  };
  other?: ApexOptions;
  subheader: string;
  title: string;
}


export interface WidgetSummary {
  icon: ReactNode | string;
  sx?: object;
  title: string;
  total: number
}