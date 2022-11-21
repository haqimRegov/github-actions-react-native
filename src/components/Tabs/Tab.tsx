import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  autoWidth,
  centerHV,
  colorBlue,
  colorRed,
  flexRow,
  fs16SemiBoldBlue1,
  fs16SemiBoldBlue5,
  sh48,
  sw2,
  sw24,
  sw8,
} from "../../styles";
import { BadgeCount } from "../Badge";
import { CustomSpacer } from "../Views";

export interface TabProps {
  badgeCount?: number;
  onPress?: () => void;
  selected?: boolean;
  spaceToRight?: number;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const Tab: FunctionComponent<TabProps> = ({ badgeCount, onPress, selected, style, spaceToRight, text, textStyle }: TabProps) => {
  const selectedStyle: ViewStyle = selected === true ? { borderBottomWidth: sw2, borderBottomColor: colorRed._1 } : {};
  const defaultTextStyle: TextStyle = selected === true ? { ...fs16SemiBoldBlue1, ...textStyle } : { ...fs16SemiBoldBlue5, ...textStyle };
  const defaultSpaceToRight = spaceToRight !== undefined ? spaceToRight : sw8;
  const container: ViewStyle = {
    ...centerHV,
    ...flexRow,
    height: sh48,
    paddingHorizontal: sw24,
    ...selectedStyle,
    ...style,
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={container}>
        <Text style={defaultTextStyle}>{text}</Text>
        <CustomSpacer isHorizontal={true} space={defaultSpaceToRight} />
        {badgeCount !== undefined ? (
          <BadgeCount count={badgeCount} style={selected === true ? autoWidth : { backgroundColor: colorBlue._6, ...autoWidth }} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
