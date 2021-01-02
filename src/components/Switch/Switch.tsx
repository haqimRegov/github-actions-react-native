import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  centerVertical,
  circle,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  flexRowReverse,
  fs12BoldBlack2,
  px,
  sh16,
  sw10,
  sw16,
  sw24,
  sw3,
  sw8,
} from "../../styles";
import { AnimationUtils } from "../../utils";
import { CustomSpacer } from "../Views";

interface ISwitchColor {
  false: string;
  true: string;
}
export interface SwitchProps {
  label?: string;
  labelStyle?: TextStyle;
  onPress?: (value?: boolean) => void;
  thumbColor?: ISwitchColor;
  toggle: boolean;
  trackColor?: ISwitchColor;
}

export const Switch: FunctionComponent<SwitchProps> = ({ label, labelStyle, onPress, thumbColor, toggle, trackColor }: SwitchProps) => {
  const direction: ViewStyle = toggle === true ? flexRowReverse : flexRow;
  const activeTrackColor = trackColor !== undefined ? trackColor.true : colorRed._1;
  const inactiveTrackColor = trackColor !== undefined ? trackColor.false : colorGray._6;
  const baseTrackColor = toggle === true ? activeTrackColor : inactiveTrackColor;
  const activeThumbColor = thumbColor !== undefined ? thumbColor.true : colorWhite._1;
  const inactiveThumbColor = thumbColor !== undefined ? thumbColor.false : colorWhite._1;
  const baseThumbColor = toggle === true ? activeThumbColor : inactiveThumbColor;
  const switchStyle: ViewStyle = {
    borderRadius: sw16,
    height: sh16,
    width: sw24,
    backgroundColor: baseTrackColor,
    ...direction,
    ...centerVertical,
    ...px(sw3),
  };
  const thumbStyle: ViewStyle = { ...circle(sw10, colorWhite._1), backgroundColor: baseThumbColor };

  const handlePress = () => {
    AnimationUtils.layout();
    if (onPress !== undefined) {
      onPress(!toggle);
    }
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ ...centerVertical, ...flexRow }}>
          <View style={switchStyle}>
            <View style={thumbStyle} />
          </View>
          {label !== undefined ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
            </Fragment>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
