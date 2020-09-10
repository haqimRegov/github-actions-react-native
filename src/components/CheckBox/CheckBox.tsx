import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs12RegBlack2,
  sh12,
  sh24,
  sw1,
  sw10,
  sw16,
  sw4,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface CheckBoxProps {
  checkboxStyle?: ViewStyle;
  disabled?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  onPress: () => void;
  spaceToLabel?: number;
  style?: ViewStyle;
  toggle: boolean;
}
export const CheckBox: FunctionComponent<CheckBoxProps> = ({
  checkboxStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  spaceToLabel,
  style,
  toggle,
}: CheckBoxProps) => {
  const selectedStyle: ViewStyle = toggle ? { backgroundColor: colorRed._1, borderColor: colorRed._1 } : {};
  const disabledStyle: ViewStyle = disabled === true ? { opacity: 0.5 } : {};

  const toggleStyle: ViewStyle = {
    ...centerHV,
    borderColor: colorBlue._2,
    borderRadius: sw4,
    borderWidth: sw1,
    height: sw16,
    width: sw16,
    ...selectedStyle,
    ...disabledStyle,
  };

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
            <View style={toggleStyle}>{toggle ? <IcoMoon color={colorWhite._1} name="check" size={sh12} /> : null}</View>
          </View>
          {label === undefined ? null : (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={defaultSpace} />
              <Text onPress={handlePress} style={{ ...fs12RegBlack2, lineHeight: sh24, ...disabledStyle, ...labelStyle }}>
                {label}
              </Text>
            </Fragment>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
