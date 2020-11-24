import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlack,
  colorRed,
  colorTransparent,
  flexRow,
  fs12RegBlack2,
  px,
  sh16,
  sh32,
  sw1,
  sw100,
  sw16,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface OutlineButtonProps {
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  color?: string;
  icon?: string;
  onPress: () => void;
  text: string;
  textStyle?: TextStyle;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = ({
  buttonStyle,
  disabled,
  color,
  icon,
  onPress,
  text,
  textStyle,
}: OutlineButtonProps) => {
  const disabledOpacity = disabled === true ? { opacity: 0.5 } : undefined;
  const defaultBorderColor: ViewStyle = color !== undefined ? { borderColor: color } : { borderColor: colorBlack._2 };
  const roundedButtonStyle: ViewStyle = {
    ...border(colorRed._1, sw1),
    ...centerVertical,
    ...flexRow,
    ...px(sw16),
    backgroundColor: colorTransparent,
    borderRadius: sw100,
    height: sh32,
    ...defaultBorderColor,
    ...disabledOpacity,
    ...buttonStyle,
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
        <View style={roundedButtonStyle}>
          {icon === undefined ? null : (
            <Fragment>
              <IcoMoon color={color || colorBlack._1} name={icon} size={sh16} style={disabledOpacity} />
              <CustomSpacer isHorizontal={true} space={sw8} />
            </Fragment>
          )}
          <Text style={{ ...fs12RegBlack2, color: color, ...disabledOpacity, ...textStyle }}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
