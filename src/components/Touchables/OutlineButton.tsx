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
import { CustomSpacer } from "../Views";

export interface OutlineButtonProps {
  buttonStyle?: ViewStyle;
  color?: string;
  icon?: string;
  onPress: () => void;
  text: string;
  textStyle?: TextStyle;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = ({
  buttonStyle,
  color,
  icon,
  onPress,
  text,
  textStyle,
}: OutlineButtonProps) => {
  const defaultBorderColor: ViewStyle = color !== undefined ? { borderColor: color } : { borderColor: colorBlack._2 };

  const roundedButtonStyle: ViewStyle = {
    ...border(colorRed._1, sw1),
    ...centerVertical,
    ...flexRow,
    ...px(sw16),
    backgroundColor: colorTransparent,
    borderRadius: sw100,
    height: sh32,
    marginRight: "auto", // TODO find better solution
    ...defaultBorderColor,
    ...buttonStyle,
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={roundedButtonStyle}>
        {icon === undefined ? null : (
          <Fragment>
            <IcoMoon color={color || colorBlack._1} name={icon} size={sh16} />
            <CustomSpacer isHorizontal={true} space={sw8} />
          </Fragment>
        )}
        <Text style={{ ...fs12RegBlack2, color: color, ...textStyle }}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
