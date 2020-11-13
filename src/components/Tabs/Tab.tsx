import React, { FunctionComponent, ReactNode } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerHV, colorBlue, colorRed, flexRow, fs16BoldBlue2, fs16RegBlue25, sh48, sw164, sw2, sw8 } from "../../styles";
import { BadgeCount } from "../Badge";
import { CustomSpacer } from "../Views";

export interface TabProps {
  badgeCount?: number;
  onPress?: () => void;
  right?: ReactNode;
  selected?: boolean;
  spaceToRight?: number;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const Tab: FunctionComponent<TabProps> = ({ badgeCount, onPress, selected, style, spaceToRight, text, textStyle }: TabProps) => {
  const selectedStyle: ViewStyle = selected === true ? { borderBottomWidth: sw2, borderBottomColor: colorRed._1 } : {};
  const baseTextStyle: TextStyle = { letterSpacing: -0.44, ...textStyle };
  const defaultTextStyle: TextStyle = selected === true ? { ...fs16BoldBlue2, ...baseTextStyle } : { ...fs16RegBlue25, ...baseTextStyle };
  const defaultSpaceToRight = spaceToRight !== undefined ? spaceToRight : sw8;
  const container: ViewStyle = { ...centerHV, ...flexRow, height: sh48, width: sw164, ...selectedStyle, ...style };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={container}>
        <Text style={defaultTextStyle}>{text}</Text>
        <CustomSpacer isHorizontal={true} space={defaultSpaceToRight} />
        {badgeCount !== undefined ? (
          <BadgeCount count={badgeCount} style={selected === true ? {} : { backgroundColor: colorBlue._3_8 }} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
