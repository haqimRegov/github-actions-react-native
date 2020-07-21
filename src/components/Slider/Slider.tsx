import { Slider } from "@miblanchard/react-native-slider";
import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  centerHV,
  centerVertical,
  circle,
  colorGray,
  colorRed,
  colorWhite,
  customShadow,
  flexRowSbSb,
  fs12BoldBlack2,
  px,
  py,
  sh16,
  sh6,
  sh8,
  sw10,
  sw12,
  sw14,
  sw15,
  sw18,
  sw24,
  sw72,
} from "../../styles";
import { CustomSpacer } from "../Views";

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

  const sliderContainer: ViewStyle = {
    ...customShadow(colorGray._3, 0, 0, 0.8, sw15),
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
  };

  const CustomThumb = () => {
    return (
      <View style={{ ...centerHV, ...circle(sw18, colorWhite._1) }}>
        <View style={circle(sw14, colorRed._1)} />
      </View>
    );
  };

  return (
    <View style={sliderContainer}>
      <Slider
        animateTransitions={true}
        containerStyle={{ height: sh16 }}
        disabled={disabled}
        maximumTrackTintColor={colorGray._4}
        maximumValue={options.length - 1}
        minimumTrackTintColor={value === 0 ? colorWhite._1 : colorRed._1}
        minimumValue={0}
        onValueChange={handleChange}
        renderThumbComponent={() => <CustomThumb />}
        trackStyle={{ height: sh6 }}
        value={value}
      />
      <CustomSpacer space={sh8} />
      <View style={flexRowSbSb}>
        {options.map((option: string, index: number) => {
          let optionStyle: ViewStyle = { width: sw72, ...centerVertical };
          if (index === 1) {
            optionStyle = { ...optionStyle, paddingRight: sw15 };
          } else if (index === 2) {
            optionStyle = { ...optionStyle, paddingLeft: sw12 };
          }
          return (
            <TouchableWithoutFeedback key={index} onPress={() => handleSeek(index)}>
              <View style={optionStyle}>
                <Text style={fs12BoldBlack2}>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};
