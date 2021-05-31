import { Slider } from "@miblanchard/react-native-slider";
import React, { Fragment } from "react";
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
  justifyContentEnd,
  px,
  sh16,
  sh32,
  sh48,
  sh6,
  sh8,
  sw10,
  sw104,
  sw14,
  sw15,
  sw18,
  sw24,
  sw25,
  sw30,
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
      <CustomSpacer space={sh16} />
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
          let optionStyle: ViewStyle = { ...centerVertical, maxWidth: sw104 };
          const touchAreaStyle: ViewStyle = {
            ...justifyContentEnd,
            height: sh48,
            // TODO make the position and width dynamic
            left: index === 0 ? 0 : index * 152,
            position: "absolute",
            top: -sh32,
            width: sw72,
          };
          if (index === 1) {
            optionStyle = { ...optionStyle, paddingLeft: sw25 };
          } else if (index === 2) {
            optionStyle = { ...optionStyle, paddingLeft: sw30 };
          }

          const handleSeek = () => {
            setSelected(index);
          };

          return (
            <Fragment key={index}>
              <View style={optionStyle}>
                <Text style={fs12BoldBlack2}>{option}</Text>
              </View>
              <TouchableWithoutFeedback onPress={handleSeek}>
                <View style={touchAreaStyle} />
              </TouchableWithoutFeedback>
            </Fragment>
          );
        })}
      </View>
      <CustomSpacer space={sh8} />
    </View>
  );
};
