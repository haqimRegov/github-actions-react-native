import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
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
  selected: number;
  setSelected: (result: number) => void;
}

export const CustomSlider = ({ disabled, options, selected, setSelected }: SliderProps) => {
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
        minimumTrackTintColor={selected === 0 ? colorWhite._1 : colorRed._1}
        minimumValue={0}
        renderThumbComponent={() => <CustomThumb />}
        trackStyle={{ height: sh6 }}
        value={selected}
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

          const handleSeek = () => {
            setSelected(index);
          };

          return (
            <TouchableWithoutFeedback key={index} onPress={handleSeek}>
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
