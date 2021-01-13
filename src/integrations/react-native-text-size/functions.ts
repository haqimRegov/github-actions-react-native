import rnTextSize, { TSFontSpecs, TSMeasureParams } from "react-native-text-size";

import { NunitoSemiBold } from "../../constants";
import { sh12 } from "../../styles";

export const MeasureTextSize = async (params: TSMeasureParams, textStyle?: TSFontSpecs) => {
  const defaultStyles: TSFontSpecs = {
    fontFamily: NunitoSemiBold,
    fontSize: sh12,
    ...textStyle,
  };
  const size = await rnTextSize.measure({
    ...defaultStyles,
    ...params,
  });
  return size;
};

export const CalculateCount = async (textArray: string[], width: number, remainingSpace: number, textStyle?: TSFontSpecs) => {
  let count: number = 0;
  let total: number = 0;
  const promiseArray = textArray.map(async (text) => {
    const size = await MeasureTextSize({ text: text }, textStyle);
    total += size.width + remainingSpace;
    if (total > width) {
      count += 1;
    }
    return count;
  });
  const remainingCount = await Promise.all(promiseArray).then((values) => {
    return values[values.length - 1];
  });
  return remainingCount;
};
