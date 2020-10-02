import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, colorBlue, fs16BoldBlue2, sh32, sh56, sw8 } from "../../styles";
import { BadgeCount } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views";

export interface MenuItemProps {
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
  const defaultButtonStyle: ViewStyle = {
    ...centerVertical,
    height: sh56,
    ...style,
  };
  const textColor = color ? { color: color } : {};
  const defaultTextStyle: TextStyle = {
    ...fs16BoldBlue2,
    ...textColor,
    ...textStyle,
  };

  const defaultSpaceBetween = spaceBetween !== undefined ? spaceBetween : sw8;
  const defaultSize = iconSize !== undefined ? iconSize : sh32;
  const defaultColor = color !== undefined ? color : colorBlue._2;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={defaultButtonStyle}>
        <IcoMoon color={defaultColor} name={name} size={defaultSize} />
        <CustomSpacer isHorizontal={true} space={defaultSpaceBetween} />
        <Text style={defaultTextStyle}>{text}</Text>
        <CustomFlexSpacer />
        {badgeCount !== undefined ? <BadgeCount count={badgeCount} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
