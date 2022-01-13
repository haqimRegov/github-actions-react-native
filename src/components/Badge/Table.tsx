import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoSemiBold } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  colorBlue,
  colorGreen,
  colorPurple,
  colorRed,
  colorYellow,
  flexRow,
  fs10RegBlue1,
  px,
  py,
  sh12,
  sh16,
  sh2,
  sw1,
  sw4,
} from "../../styles";
import { CustomSpacer } from "../Views";
import { StatusBadgeColorType } from "./Status";

interface TableBadgeProps {
  icon?: string;
  iconSize?: number;
  color?: StatusBadgeColorType;
  onPress?: () => void;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const TableBadge: FunctionComponent<TableBadgeProps> = ({
  icon,
  iconSize,
  color = "complete",
  onPress,
  style,
  text,
  textStyle,
}: TableBadgeProps) => {
  let badgeTextColor = colorBlue._9;

  switch (color) {
    case "complete":
      badgeTextColor = colorBlue._9;
      break;
    case "danger":
      badgeTextColor = colorRed._3;
      break;
    case "error":
      badgeTextColor = colorRed._2;
      break;
    case "review":
      badgeTextColor = colorPurple._1;
      break;
    case "secondary":
      badgeTextColor = colorBlue._1;
      break;
    case "success":
      badgeTextColor = colorGreen._1;
      break;
    case "warning":
      badgeTextColor = colorYellow._2;
      break;

    default:
      break;
  }

  const badgeStyle: ViewStyle = {
    ...centerHV,
    ...flexRow,
    ...px(sw4),
    ...py(sh2),
    borderRadius: sw4,
    borderColor: badgeTextColor,
    borderWidth: sw1,
    // backgroundColor: badgeColor,
    height: sh16,
    ...style,
  };

  const badgeTextStyle: TextStyle = {
    ...fs10RegBlue1,
    color: badgeTextColor,
    fontFamily: NunitoSemiBold,
    lineHeight: sh12,
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
              <IcoMoon color={badgeTextColor} name={icon} size={iconSize || sh12} />
            </Fragment>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
