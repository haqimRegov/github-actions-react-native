import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoSemiBold } from "../../constants";
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
  sh24,
  sh4,
  sw24,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views";

export type TagColorType = "success" | "error" | "primary" | "secondary" | "warning" | "danger" | "review" | "complete";

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
  let tagColor = colorBlue._1;
  let tagTextColor = colorWhite._1;

  switch (color) {
    case "complete":
      tagTextColor = colorBlue._9;
      tagColor = colorGray._7;
      break;
    case "danger":
      tagTextColor = colorRed._3;
      tagColor = colorRed._5;
      break;
    case "error":
      tagTextColor = colorRed._2;
      tagColor = colorRed._4;
      break;
    case "primary":
      tagTextColor = colorWhite._1;
      tagColor = colorBlue._1;
      break;
    case "review":
      tagTextColor = colorPurple._1;
      tagColor = colorPurple._2;
      break;
    case "secondary":
      tagTextColor = colorBlue._1;
      tagColor = colorBlue._2;
      break;
    case "success":
      tagTextColor = colorGreen._1;
      tagColor = colorGreen._2;
      break;
    case "warning":
      tagTextColor = colorYellow._2;
      tagColor = colorYellow._3;
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
    ...fs12BoldWhite1,
    color: tagTextColor,
    fontFamily: color === "secondary" ? NunitoSemiBold : NunitoBold,
    ...textStyle,
  };

  return (
    <View style={flexRow}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={tagStyle}>
          <Text style={tagTextStyle}>{text}</Text>
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
