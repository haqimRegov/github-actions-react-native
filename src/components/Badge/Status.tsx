import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoSemiBold } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  colorBlue,
  colorGray,
  colorGreen,
  colorPurple,
  colorRed,
  colorWhite,
  colorYellow,
  disabledOpacity5,
  flexRow,
  fs12BoldWhite1,
  px,
  py,
  sh12,
  sh16,
  sh24,
  sh4,
  sw24,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views";

export type StatusBadgeColorType = "success" | "error" | "primary" | "secondary" | "warning" | "danger" | "review" | "complete";

interface StatusBadgeProps {
  disabled?: boolean;
  icon?: string;
  iconSize?: number;
  color?: StatusBadgeColorType;
  onPress?: () => void;
  prefix?: string;
  prefixStyle?: TextStyle;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const StatusBadge: FunctionComponent<StatusBadgeProps> = ({
  disabled,
  icon,
  iconSize,
  color = "primary",
  onPress,
  prefix,
  prefixStyle,
  style,
  text,
  textStyle,
}: StatusBadgeProps) => {
  let badgeColor = colorBlue._1;
  let badgeTextColor = colorWhite._1;
  const iconColor = colorBlue._9;

  switch (color) {
    case "complete":
      badgeTextColor = colorBlue._9;
      badgeColor = colorGray._7;
      break;
    case "danger":
      badgeTextColor = colorRed._3;
      badgeColor = colorRed._5;
      break;
    case "error":
      badgeTextColor = colorRed._2;
      badgeColor = colorRed._4;
      break;
    case "primary":
      badgeTextColor = colorWhite._1;
      badgeColor = colorBlue._1;
      break;
    case "review":
      badgeTextColor = colorPurple._1;
      badgeColor = colorPurple._2;
      break;
    case "secondary":
      badgeTextColor = colorBlue._1;
      badgeColor = colorBlue._2;
      break;
    case "success":
      badgeTextColor = colorGreen._1;
      badgeColor = colorGreen._2;
      break;
    case "warning":
      badgeTextColor = colorYellow._2;
      badgeColor = colorYellow._3;
      break;

    default:
      break;
  }

  const disabledStyle: ViewStyle = disabled !== undefined && disabled === true ? disabledOpacity5 : {};

  const badgeStyle: ViewStyle = {
    ...centerHV,
    ...flexRow,
    ...px(sw8),
    ...py(sh4),
    borderRadius: sw24,
    backgroundColor: badgeColor,
    height: sh24,
    ...disabledStyle,
    ...style,
  };

  const badgeTextStyle: TextStyle = {
    ...fs12BoldWhite1,
    color: badgeTextColor,
    fontFamily: NunitoSemiBold,
    lineHeight: sh16,
    ...textStyle,
  };

  const checkDisabled = disabled === true ? "none" : "auto";

  return (
    <View style={flexRow} pointerEvents={checkDisabled}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={badgeStyle}>
          {prefix !== undefined ? (
            <Fragment>
              <Text style={prefixStyle}>{prefix}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
            </Fragment>
          ) : null}
          <Text style={badgeTextStyle}>{text}</Text>
          {icon !== undefined && disabled !== true ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <IcoMoon color={iconColor} name={icon} size={iconSize || sh12} />
            </Fragment>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
