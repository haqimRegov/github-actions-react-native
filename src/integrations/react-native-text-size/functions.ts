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

export const CalculateCount = async (
  textArray: string[],
  width: number,
  remainingSpace: number,
  spaceBetween: number,
  textStyle?: TSFontSpecs,
) => {
  let count = 0;
  let total = 0;
  const promiseArray = textArray.map(async (text, index) => {
    const spaceToAdd = index === textArray.length - 1 ? 0 : spaceBetween;
    const totalSpace = remainingSpace + spaceToAdd;
    const size = await MeasureTextSize({ text: text }, textStyle);
    total += size.width + totalSpace;
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
