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
  icon?: string;
  iconSize?: number;
  color?: StatusBadgeColorType;
  onPress?: () => void;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const StatusBadge: FunctionComponent<StatusBadgeProps> = ({
  icon,
  iconSize,
  color = "primary",
  onPress,
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

  const badgeStyle: ViewStyle = {
    ...centerHV,
    ...flexRow,
    ...px(sw8),
    ...py(sh4),
    borderRadius: sw24,
    backgroundColor: badgeColor,
    height: sh24,
    ...style,
  };

  const badgeTextStyle: TextStyle = {
    ...fs12BoldWhite1,
    color: badgeTextColor,
    fontFamily: NunitoSemiBold,
    lineHeight: sh16,
    ...textStyle,
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={badgeStyle}>
          <Text style={badgeTextStyle}>{text}</Text>
          {icon !== undefined ? (
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
