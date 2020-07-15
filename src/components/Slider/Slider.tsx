import { Slider } from "@miblanchard/react-native-slider";
import React, { Fragment, useState } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { colorGray, colorRed, colorWhite, flexRowSbSb, fs12BoldBlack2, sh16, sh6, sw18, sw2 } from "../../styles";

export interface SliderProps {
  disabled?: boolean;
  options: string[];
  setSelected: (result: string) => void;
}

export const CustomSlider = ({ disabled, options, setSelected }: SliderProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (update: number[]) => {
    const current: number = update[0];
    const index = Math.round(current);
    setValue(index);
    setSelected(options[index]);
  };

  const handleSeek = (index: number) => {
    setValue(index);
    setSelected(options[index]);
  };

  const thumbStyle: ViewStyle = { borderColor: colorWhite._1, borderWidth: sw2, height: sw18, width: sw18 };

  return (
    <Fragment>
      <Slider
        animateTransitions={true}
        containerStyle={{ height: sh16 }}
        disabled={disabled}
        maximumTrackTintColor={colorGray._4}
        maximumValue={options.length - 1}
        minimumTrackTintColor={colorRed._1}
        minimumValue={0}
        onValueChange={handleChange}
        thumbStyle={thumbStyle}
        thumbTintColor={colorRed._1}
        trackStyle={{ height: sh6 }}
        value={value}
      />
      <View style={flexRowSbSb}>
        {options.map((option: string, index: number) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => handleSeek(index)}>
              <Text style={fs12BoldBlack2}>{option}</Text>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </Fragment>
  );
};
