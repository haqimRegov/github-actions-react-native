import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs10RegBlue6,
  fs14BoldGray6,
  px,
  sh32,
  sh56,
  sw24,
  sw8,
} from "../../styles";
import { BadgeCount } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export interface MenuItemProps {
  active?: boolean;
  badgeCount?: number;
  color?: string;
  iconSize?: number;
  name: string;
  onPress?: () => void;
  spaceBetween?: number;
  style?: ViewStyle;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  title: string;
  titleStyle?: TextStyle;
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
  subtitle,
  titleStyle,
  subtitleStyle,
  title,
}: MenuItemProps) => {
  const badgeColor: ViewStyle = active === true ? { backgroundColor: colorWhite._1 } : { backgroundColor: colorRed._1 };
  const badgeCountColor: TextStyle = active === true ? { color: colorRed._1 } : { color: colorWhite._1 };
  const bgColor: ViewStyle = active === true ? { backgroundColor: colorRed._1 } : { backgroundColor: colorWhite._1 };
  const selectedColor = active === true ? colorWhite._1 : colorBlue._1;
  const defaultButtonStyle: ViewStyle = {
    ...bgColor,
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    height: sh56,
    ...style,
  };
  const textColor = color ? { color: color } : {};
  const defaultTitleStyle: TextStyle = {
    ...fs14BoldGray6,
    color: selectedColor,
    ...textColor,
    ...titleStyle,
  };

  const defaultSubtitleStyle: TextStyle = {
    ...fs10RegBlue6,
    color: selectedColor,
    ...textColor,
    ...subtitleStyle,
  };

  const defaultSpaceBetween = spaceBetween !== undefined ? spaceBetween : sw8;
  const defaultSize = iconSize !== undefined ? iconSize : sh32;
  const defaultColor = color !== undefined ? color : selectedColor;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={defaultButtonStyle}>
        <IcoMoon color={defaultColor} name={name} size={defaultSize} />
        <CustomSpacer isHorizontal={true} space={defaultSpaceBetween} />
        <View>
          <Text style={defaultTitleStyle}>{title}</Text>
          {subtitle !== undefined ? <Text style={defaultSubtitleStyle}>{subtitle}</Text> : null}
        </View>
        <CustomFlexSpacer />
        {badgeCount !== undefined ? <BadgeCount count={badgeCount} countStyle={badgeCountColor} style={badgeColor} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
