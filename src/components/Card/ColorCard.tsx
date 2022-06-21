import React, { FunctionComponent, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import {
  border,
  colorBlue,
  colorGray,
  colorWhite,
  fs12RegGray5,
  fs16BoldBlack2,
  px,
  py,
  sh12,
  sh16,
  sh32,
  sw1,
  sw16,
  sw32,
  sw8,
} from "../../styles";
import { LabeledTitle } from "../Views";

interface ColorCardProps {
  containerStyle?: ViewStyle;
  content?: ReactNode;
  contentStyle?: ViewStyle;
  customHeader?: ReactNode;
  header: LabeledTitleProps | "custom";
  headerStyle?: ViewStyle;
}

export const ColorCard: FunctionComponent<ColorCardProps> = ({
  containerStyle,
  content,
  contentStyle,
  customHeader,
  header,
  headerStyle,
}: ColorCardProps) => {
  const defaultContainerStyle: ViewStyle = {
    ...border(colorGray._2, sw1, sw16),
  };

  const defaultHeaderStyle: ViewStyle = {
    ...px(sw32),
    ...py(sh12),
    backgroundColor: colorBlue._3,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    ...headerStyle,
  };

  const defaultContentStyle: ViewStyle = {
    ...px(sw32),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw8,
    borderBottomRightRadius: sw8,
    paddingBottom: sh32,
    paddingTop: sh16,
    ...contentStyle,
  };

  const defaultHeader =
    header !== "custom" ? <LabeledTitle labelStyle={fs16BoldBlack2} titleStyle={{ ...fs12RegGray5 }} {...header} /> : null;

  return (
    <View style={{ ...defaultContainerStyle, ...containerStyle }}>
      <View style={defaultHeaderStyle}>{header === "custom" && customHeader !== undefined ? customHeader : defaultHeader}</View>
      <View style={defaultContentStyle}>{content}</View>
    </View>
  );
};
