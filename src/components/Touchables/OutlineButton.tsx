import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  border,
  centerVertical,
  colorBlack,
  colorBlue,
  colorRed,
  colorTransparent,
  disabledOpacity5,
  flexRow,
  fs12BoldBlue1,
  px,
  sh16,
  sh32,
  sw1,
  sw100,
  sw16,
  sw8,
} from "../../styles";
import { BadgeCount } from "../Badge/Count";
import { CustomSpacer } from "../Views/Spacer";

type ButtonType = "solid" | "dashed";

export interface OutlineButtonProps {
  badgeCount?: number;
  buttonStyle?: ViewStyle;
  buttonType?: ButtonType;
  disabled?: boolean;
  disabledOpacity?: number;
  color?: string;
  icon?: string;
  onPress: () => void;
  spaceToIcon?: number;
  text: string;
  textStyle?: TextStyle;
}

export const OutlineButton: FunctionComponent<OutlineButtonProps> = ({
  badgeCount,
  buttonStyle,
  buttonType,
  disabled,
  disabledOpacity,
  color,
  icon,
  onPress,
  spaceToIcon,
  text,
  textStyle,
}: OutlineButtonProps) => {
  const borderStyle: ViewStyle = buttonType === "dashed" ? { borderStyle: "dashed" } : {};
  const defaultDisabledOpacity = disabledOpacity !== undefined ? { opacity: disabledOpacity } : disabledOpacity5;
  const opacity = disabled === true ? defaultDisabledOpacity : {};
  const borderColor: ViewStyle = color !== undefined ? { borderColor: color } : { borderColor: colorBlue._1 };
  const roundedButtonStyle: ViewStyle = {
    ...border(colorRed._1, sw1),
    ...centerVertical,
    ...flexRow,
    ...px(sw16),
    backgroundColor: colorTransparent,
    borderRadius: sw100,
    height: sh32,
    ...borderStyle,
    ...borderColor,
    ...opacity,
    ...buttonStyle,
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={disabled === true ? undefined : onPress}>
        <View style={roundedButtonStyle}>
          {icon === undefined ? null : (
            <Fragment>
              <IcoMoon color={color || colorBlack._1} name={icon} size={sh16} />
              <CustomSpacer isHorizontal={true} space={spaceToIcon || sw8} />
            </Fragment>
          )}
          <Text style={{ ...fs12BoldBlue1, color: color, ...textStyle }}>{text}</Text>
          {badgeCount !== undefined ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <BadgeCount count={badgeCount} style={{ backgroundColor: colorBlue._6 }} />
            </Fragment>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
