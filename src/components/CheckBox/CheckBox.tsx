import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  fs12RegBlack2,
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
  toggleColor?: string;
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
  const disabledBackground: TextStyle = disabled === true ? { backgroundColor: colorGray._9 } : {};
  const disabledStyle: TextStyle = disabled === true ? { opacity: 0.6 } : {};
  const defaultIconSize: number = iconSize !== undefined ? iconSize : sw14;

  const toggleStyle: ViewStyle = {
    ...centerHV,
    borderColor: colorBlue._2,
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

  const defaultSpace = spaceToLabel !== undefined ? spaceToLabel : sw10;

  const handlePress = () => {
    if (disabled !== true) {
      onPress();
    }
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ ...centerVertical, ...flexRow, ...style }}>
          <View style={checkboxStyle}>
            <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="success" size={defaultIconSize} /> : null}</View>
          </View>
          {label === undefined ? null : (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={defaultSpace} />
              <View>
                <Text
                  numberOfLines={numberOfLines}
                  style={{ ...fs12RegBlack2, fontFamily, lineHeight: sh24, ...disabledStyle, ...labelStyle }}>
                  {label}
                </Text>
                {subLabel !== undefined ? (
                  <Fragment>
                    {spaceToSubLabel !== undefined ? <CustomSpacer space={spaceToSubLabel} /> : null}
                    <Text style={{ ...fs12RegBlack2, ...subLabelStyle }}>{subLabel}</Text>
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
