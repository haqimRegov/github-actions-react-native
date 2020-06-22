import React, { Fragment, useState } from "react";
import { View, ViewStyle, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CustomFlexSpacer } from "../../components";
import { colorBlue, colorGray, flexRow, fs12BoldGray4, colorWhite, sh6, sh16, sh18, sw18 } from "../../styles";

export interface SliderProps {
  disabled?: boolean;
  options: string[];
  setSelected: (result: string) => void;
  // setValue: (value: number) => void;
  // value: number;
}

export const SliderComponent = ({ disabled, options, setSelected }) => {
  const [value, setValue] = useState<number>(0);
  const handleCalculation = (currentValue: number) => {
    const index: number = Math.round(currentValue);
    return options[index];
  };
  const handleChange = (update: number[]) => {
    const current: number = update[0];
    const result = handleCalculation(current);
    setSelected(result);
  };
  const handleSeek = (index: number) => {
    setValue(index);
    setSelected(options[index]);
  };
  const thumbStyle: ViewStyle = { borderColor: colorWhite._1, borderWidth: 1, height: sh18, width: sw18 };
  const labelStyle: ViewStyle = { ...flexRow };
  return (
    <Fragment>
      <Slider
        containerStyle={{ height: sh16 }}
        disabled={disabled}
        maximumTrackTintColor={colorGray._9}
        maximumValue={options.length - 1}
        minimumTrackTintColor={colorBlue._6}
        minimumValue={0}
        onValueChange={handleChange}
        thumbStyle={thumbStyle}
        thumbTintColor={colorBlue._1}
        trackStyle={{ height: sh6 }}
        value={value}
      />
      <View style={labelStyle}>
        {options.map((option: string, index: number) => {
          return (
            <Fragment key={index}>
              <TouchableWithoutFeedback onPress={() => handleSeek(index)}>
                <Text style={fs12BoldGray4}>{option}</Text>
              </TouchableWithoutFeedback>
              {index < options.length - 1 ? <CustomFlexSpacer /> : null}
            </Fragment>
          );
        })}
      </View>
    </Fragment>
  );
};
