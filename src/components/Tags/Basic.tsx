import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  centerHV,
  colorBlue,
  colorGreen,
  colorRed,
  colorWhite,
  colorYellow,
  flexRow,
  fs12SemiBoldWhite1,
  px,
  py,
  sh24,
  sh4,
  sw24,
  sw8,
} from "../../styles";

export type TagColorType = "success" | "error" | "primary" | "secondary" | "warning" | "danger";

interface TagProps {
  color?: TagColorType;
  onPress?: () => void;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const Tag: FunctionComponent<TagProps> = ({ color = "primary", onPress, style, text, textStyle }: TagProps) => {
  let tagColor = colorBlue._2;
  let tagTextColor = colorWhite._1;

  switch (color) {
    case "success":
      tagTextColor = colorGreen._1;
      tagColor = colorGreen._1_05;
      break;
    case "error":
      tagTextColor = colorRed._2;
      tagColor = colorRed._2_05;
      break;
    case "primary":
      tagTextColor = colorWhite._1;
      tagColor = colorBlue._2;
      break;
    case "secondary":
      tagTextColor = colorBlue._2;
      tagColor = colorBlue._2_05;
      break;
    case "warning":
      tagTextColor = colorYellow._2;
      tagColor = colorYellow._2_05;
      break;
    case "danger":
      tagTextColor = colorRed._3;
      tagColor = colorRed._3_05;
      break;

    default:
      break;
  }

  const tagStyle: ViewStyle = {
    ...centerHV,
    ...px(sw8),
    ...py(sh4),
    borderRadius: sw24,
    backgroundColor: tagColor,
    height: sh24,
    ...style,
  };

  const tagTextStyle: TextStyle = {
    color: tagTextColor,
    ...textStyle,
  };
  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={tagStyle}>
          <Text style={{ ...fs12SemiBoldWhite1, ...tagTextStyle }}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
