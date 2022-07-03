import React, { Fragment, FunctionComponent } from "react";
import { ColorValue, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  alignSelfStart,
  centerHorizontal,
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity6,
  flexRow,
  fs12RegBlack2,
  fs12RegGray5,
  sh24,
  sw1,
  sw10,
  sw14,
  sw18,
  sw4,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CheckBoxProps {
  boxStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  disabled?: boolean;
  iconSize?: number;
  label?: string;
  labelStyle?: TextStyle;
  numberOfLines?: number;
  onPress: () => void;
  spaceToLabel?: number;
  spaceToSubLabel?: number;
  subLabel?: string;
  subLabelStyle?: TextStyle;
  style?: ViewStyle;
  toggle: boolean;
  toggleColor?: ColorValue;
}
export const CheckBox: FunctionComponent<CheckBoxProps> = ({
  boxStyle,
  checkboxStyle,
  disabled,
  iconSize,
  label,
  labelStyle,
  numberOfLines,
  onPress,
  subLabel,
  subLabelStyle,
  spaceToLabel,
  spaceToSubLabel,
  style,
  toggle,
  toggleColor,
}: CheckBoxProps) => {
  const defaultColor = toggleColor !== undefined ? toggleColor : colorRed._1;
  const selectedStyle: ViewStyle = toggle ? { backgroundColor: defaultColor, borderColor: defaultColor } : {};
  const disabledBackground: TextStyle = disabled === true ? { backgroundColor: colorGray._4 } : {};
  const disabledStyle: TextStyle = disabled === true ? { ...disabledOpacity6 } : {};
  const defaultIconSize: number = iconSize !== undefined ? iconSize : sw14;

  const toggleStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorWhite._1,
    borderColor: colorBlue._1,
    borderRadius: sw4,
    borderWidth: sw1,
    height: sw18,
    width: sw18,
    ...boxStyle,
    ...disabledBackground,
    ...selectedStyle,
    ...disabledStyle,
  };
  const fontFamily = toggle ? NunitoBold : NunitoRegular;

  const defaultLabelSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  const handlePress = () => {
    if (disabled !== true) {
      onPress();
    }
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ ...centerVertical, ...flexRow, ...style }}>
          <View style={{ ...centerHorizontal, ...alignSelfStart, height: sh24, ...checkboxStyle }}>
            <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="success" size={defaultIconSize} /> : null}</View>
          </View>
          {label === undefined ? null : (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={defaultLabelSpace} />
              <View>
                <Text
                  numberOfLines={numberOfLines}
                  style={{ ...fs12RegBlack2, lineHeight: sh24, ...disabledStyle, ...labelStyle, fontFamily: fontFamily }}>
                  {label}
                </Text>
                {subLabel !== undefined ? (
                  <Fragment>
                    {spaceToSubLabel !== undefined ? <CustomSpacer space={spaceToSubLabel} /> : null}
                    <Text style={{ ...fs12RegGray5, ...subLabelStyle }}>{subLabel}</Text>
                  </Fragment>
                ) : null}
              </View>
            </Fragment>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
