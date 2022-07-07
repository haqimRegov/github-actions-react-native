import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { ButtonSelectionList, CustomSpacer, TextSpaceArea } from "../../../../components";
import { CustomGraph } from "../../../../components/Graph";
import { Language } from "../../../../constants";
import { flexChild, flexRow, fs10RegGray6, fs16BoldGray6, px, sh16, sh24, sw24 } from "../../../../styles";

const { PRODUCT_GRAPH } = Language.PAGE;

export interface ProductGraphProps {
  fund?: IProduct;
  layout?: {
    height?: number;
    width?: number;
  };
}

const BUTTON_LABELS = [
  PRODUCT_GRAPH.BUTTON_ONE_MONTH,
  PRODUCT_GRAPH.BUTTON_SIX_MONTH,
  PRODUCT_GRAPH.BUTTON_ONE_YEAR,
  PRODUCT_GRAPH.BUTTON_THREE_YEARS,
  PRODUCT_GRAPH.BUTTON_FIVE_YEARS,
  PRODUCT_GRAPH.BUTTON_TEN_YEARS,
];

export const ProductGraph: FunctionComponent<ProductGraphProps> = ({ fund, layout }: ProductGraphProps) => {
  // TODO labels are still not sure because we do not know the actual data from fund master list

  const [navPerformance, setNavPerformance] = useState<number[]>([0]);
  const [benchmarkPerformance, setBenchmarkPerformance] = useState<number[]>([0]);
  const [performanceIndex, setPerformanceIndex] = useState<number>(1);
  const [labels, setLabels] = useState<string[]>(["JAN", "FEB", "MAR", "APR", "MAY", "JUN "]);

  const handlePerformance = (buttonIndex: number) => {
    if (fund !== undefined) {
      const { benchmark, nav } = fund.performance;
      let navData: number[] = [];
      let benchmarkData: number[] = [];
      let graphLabel = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN "];
      switch (buttonIndex) {
        case 0:
          navData = nav?.oneMonth;
          benchmarkData = benchmark?.oneMonth;
          graphLabel = ["Week 1", "Week 2", "Week 3", "Week 4"];
          break;
        case 1:
          navData = nav?.sixMonths;
          benchmarkData = benchmark?.sixMonths;
          graphLabel = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
          break;
        case 2:
          navData = nav?.oneYear;
          benchmarkData = benchmark?.oneYear;
          graphLabel = ["JAN - MAR", "APR - JUN", "JUL - SEP", "OCT - DEC"];
          break;
        case 3:
          navData = nav?.threeYears;
          benchmarkData = benchmark?.threeYears;
          graphLabel = ["Year 1", "Year 2", "Year 3"];
          break;
        case 4:
          navData = nav?.fiveYears;
          benchmarkData = benchmark?.fiveYears;
          graphLabel = ["Year 1", "Year 2", "Year 3"];
          break;
        case 5:
          navData = nav?.tenYears;
          benchmarkData = benchmark?.tenYears;
          graphLabel = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];
          break;

        default:
          break;
      }

      setPerformanceIndex(buttonIndex);
      setNavPerformance(navData);
      setBenchmarkPerformance(benchmarkData);
      setLabels(graphLabel);
    }
  };

  useEffect(() => {
    if (fund !== undefined) {
      setNavPerformance([...fund.performance.nav.sixMonths]);
      setBenchmarkPerformance([...fund.performance.benchmark.sixMonths]);
    }
  }, [fund]);

  return (
    <View>
      <TextSpaceArea
        style={{ ...fs16BoldGray6, ...px(sw24) }}
        spaceToBottom={sh16}
        spaceToTop={sh24}
        text={PRODUCT_GRAPH.LABEL_FUND_PERFORMANCE}
      />
      <CustomGraph labels={labels} performance={navPerformance} layout={layout} benchmark={benchmarkPerformance} />
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={{ ...flexRow }}>
          <ButtonSelectionList
            activeIndex={performanceIndex}
            buttonStyle={{ height: sh24 }}
            data={BUTTON_LABELS}
            onPress={handlePerformance}
          />
          <CustomSpacer space={sw24} isHorizontal={true} />
          <Text style={{ ...fs10RegGray6, ...flexChild }}>{PRODUCT_GRAPH.LABEL_DISCLAIMER}</Text>
        </View>
      </View>
    </View>
  );
};
