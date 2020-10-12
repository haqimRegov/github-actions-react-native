import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, colorBlue, colorRed, colorWhite, flexRow, fs16BoldBlue2, px, sh32, sh56, sw24, sw8 } from "../../styles";
import { BadgeCount } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

export interface MenuItemProps {
  active?: boolean;
  badgeCount?: number;
  color?: string;
  iconSize?: number;
  name: string;
  onPress?: () => void;
  spaceBetween?: number;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  active,
  badgeCount,
  color,
  iconSize,
  name,
  onPress,
  spaceBetween,
  style,
  text,
  textStyle,
}: MenuItemProps) => {
  const badgeColor: ViewStyle = active === true ? { backgroundColor: colorWhite._1 } : { backgroundColor: colorRed._1 };
  const badgeCountColor: TextStyle = active === true ? { color: colorRed._1 } : { color: colorWhite._1 };
  const bgColor: ViewStyle = active === true ? { backgroundColor: colorRed._1 } : { backgroundColor: colorWhite._1 };
  const selectedColor = active === true ? colorWhite._1 : colorBlue._2;
  const defaultButtonStyle: ViewStyle = {
    ...bgColor,
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    height: sh56,
    ...style,
  };
  const textColor = color ? { color: color } : {};
  const defaultTextStyle: TextStyle = {
    ...fs16BoldBlue2,
    color: selectedColor,
    ...textColor,
    ...textStyle,
  };

  const defaultSpaceBetween = spaceBetween !== undefined ? spaceBetween : sw8;
  const defaultSize = iconSize !== undefined ? iconSize : sh32;
  const defaultColor = color !== undefined ? color : selectedColor;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={defaultButtonStyle}>
        <IcoMoon color={defaultColor} name={name} size={defaultSize} />
        <CustomSpacer isHorizontal={true} space={defaultSpaceBetween} />
        <Text style={defaultTextStyle}>{text}</Text>
        <CustomFlexSpacer />
        {badgeCount !== undefined ? <BadgeCount count={badgeCount} countStyle={badgeCountColor} style={badgeColor} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
