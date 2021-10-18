import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
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
  sh12,
  sh24,
  sh4,
  sw24,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views";

export type TagColorType = "success" | "error" | "primary" | "secondary" | "warning" | "danger";

interface TagProps {
  icon?: string;
  iconSize?: number;
  color?: TagColorType;
  onPress?: () => void;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

export const Tag: FunctionComponent<TagProps> = ({ icon, iconSize, color = "primary", onPress, style, text, textStyle }: TagProps) => {
  let tagColor = colorBlue._2;
  let tagTextColor = colorWhite._1;

  switch (color) {
    case "success":
      tagTextColor = colorGreen._1;
      tagColor = colorGreen._2;
      break;
    case "error":
      tagTextColor = colorRed._2;
      tagColor = colorRed._6;
      break;
    case "primary":
      tagTextColor = colorWhite._1;
      tagColor = colorBlue._2;
      break;
    case "secondary":
      tagTextColor = colorBlue._2;
      tagColor = colorWhite._4;
      break;
    case "warning":
      tagTextColor = colorYellow._2;
      tagColor = colorYellow._3;
      break;
    case "danger":
      tagTextColor = colorRed._3;
      tagColor = colorRed._6;
      break;

    default:
      break;
  }

  const tagStyle: ViewStyle = {
    ...centerHV,
    ...flexRow,
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
          {icon !== undefined ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <IcoMoon color={tagTextColor} name={icon} size={iconSize || sh12} />
            </Fragment>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
