import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import {
  centerVertical,
  circle,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity6,
  flexRow,
  flexRowReverse,
  fs12BoldGray6,
  px,
  sh16,
  sw12,
  sw16,
  sw2,
  sw32,
  sw8,
} from "../../styles";
import { AnimationUtils } from "../../utils";
import { CustomSpacer } from "../Views";

interface ISwitchColor {
  false: string;
  true: string;
}
export interface SwitchProps {
  disabled?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  onPress?: (value?: boolean) => void;
  style?: ViewStyle;
  thumbColor?: ISwitchColor;
  toggle: boolean;
  trackColor?: ISwitchColor;
}

export const Switch: FunctionComponent<SwitchProps> = ({
  disabled,
  label,
  labelStyle,
  onPress,
  style,
  thumbColor,
  toggle,
  trackColor,
}: SwitchProps) => {
  const direction: ViewStyle = toggle === true ? flexRowReverse : flexRow;
  const activeTrackColor = trackColor !== undefined ? trackColor.true : colorRed._1;
  const inactiveTrackColor = trackColor !== undefined ? trackColor.false : colorGray._4;
  const baseTrackColor = toggle === true ? activeTrackColor : inactiveTrackColor;
  const activeThumbColor = thumbColor !== undefined ? thumbColor.true : colorWhite._1;
  const inactiveThumbColor = thumbColor !== undefined ? thumbColor.false : colorWhite._1;
  const baseThumbColor = toggle === true ? activeThumbColor : inactiveThumbColor;
  const disabledStyle: TextStyle = disabled === true ? { ...disabledOpacity6 } : {};
  const switchStyle: ViewStyle = {
    borderRadius: sw16,
    height: sh16,
    width: sw32,
    backgroundColor: baseTrackColor,
    ...direction,
    ...centerVertical,
    ...px(sw2),
    ...style,
  };
  const thumbStyle: ViewStyle = { ...circle(sw12, colorWhite._1), backgroundColor: baseThumbColor };
  const fontFamily = toggle ? NunitoBold : NunitoRegular;

  const handlePress = () => {
    if (disabled !== true) {
      AnimationUtils.layout();
      if (onPress !== undefined) {
        onPress(!toggle);
      }
    }
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ ...centerVertical, ...flexRow, ...disabledStyle }}>
          <View style={switchStyle}>
            <View style={thumbStyle} />
          </View>
          {label !== undefined ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={{ ...fs12BoldGray6, ...labelStyle, fontFamily: fontFamily }}>{label}</Text>
            </Fragment>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
