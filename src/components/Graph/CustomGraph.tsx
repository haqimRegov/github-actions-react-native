import React, { FunctionComponent } from "react";
import { LineChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

import { NunitoBold } from "../../constants";
import { colorBlue, colorGray, colorTransparent, sh10, sh266, sw2, sw752 } from "../../styles";

interface CustomGraphProps {
  benchmark?: number[];
  chartConfig?: AbstractChartConfig;
  labels: string[];
  layout?: {
    height?: number;
    width?: number;
  };
  performance: number[];
}

export const CustomGraph: FunctionComponent<CustomGraphProps> = ({
  benchmark,
  chartConfig,
  labels,
  layout,
  performance,
}: CustomGraphProps) => {
  const defaultLayout = {
    height: layout?.height || sh266,
    width: layout?.width || sw752,
  };

  const navLine: Dataset = {
    color: () => colorBlue._1,
    data: performance || [],
    strokeWidth: sw2,
  };

  const benchmarkLine: Dataset = {
    color: () => colorGray._2,
    data: benchmark || [],
    strokeWidth: sw2,
  };

  const datasets: Dataset[] = [navLine];

  if (benchmark !== undefined) {
    datasets.splice(0, 0, benchmarkLine);
  }

  const chartData: LineChartData = {
    labels: labels,
    datasets: datasets,
  };

  const defaultChartConfig: AbstractChartConfig = {
    backgroundGradientFrom: colorTransparent,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colorTransparent,
    backgroundGradientToOpacity: 0,
    color: () => colorGray._2,
    decimalPlaces: 0,
    labelColor: () => colorGray._2,
    strokeWidth: 2,
    width: defaultLayout.width,
  };

  return (
    <LineChart
      bezier={true}
      chartConfig={{
        ...defaultChartConfig,
        propsForLabels: {
          fontFamily: NunitoBold,
          fontSize: sh10,
          fontWeight: "bold",
        },
        propsForBackgroundLines: { strokeDasharray: "" },
        ...chartConfig,
      }}
      data={chartData}
      height={defaultLayout.height}
      segments={5}
      width={defaultLayout.width}
      withHorizontalLines={false}
      xLabelsOffset={2}
    />
  );
};
