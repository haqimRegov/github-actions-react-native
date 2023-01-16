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
  rowCenterVertical,
  sh12,
  sh16,
  sh32,
  sw1,
  sw16,
  sw24,
  sw32,
} from "../../styles";
import { IconButton, IconButtonProps } from "../Touchables";
import { CustomFlexSpacer, LabeledTitle } from "../Views";

export interface BaseColorCardProps {
  containerStyle?: ViewStyle;
  content?: ReactNode;
  contentStyle?: ViewStyle;
  customHeader?: ReactNode;
  headerIcon?: IconButtonProps;
  headerStyle?: ViewStyle;
}
export interface ColorCardProps extends BaseColorCardProps {
  header: LabeledTitleProps | "custom";
}

export const ColorCard: FunctionComponent<ColorCardProps> = ({
  containerStyle,
  content,
  contentStyle,
  customHeader,
  header,
  headerIcon,
  headerStyle,
}: ColorCardProps) => {
  const defaultContainerStyle: ViewStyle = {
    ...border(colorGray._2, sw1, sw16),
  };

  const defaultHeaderStyle: ViewStyle = {
    ...px(sw32),
    ...py(sh12),
    backgroundColor: colorBlue._3,
    borderTopLeftRadius: sw16,
    borderTopRightRadius: sw16,
    ...headerStyle,
  };

  const defaultContentStyle: ViewStyle = {
    ...px(sw32),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw16,
    borderBottomRightRadius: sw16,
    paddingBottom: sh32,
    paddingTop: sh16,
    ...contentStyle,
  };

  const defaultHeader =
    header !== "custom" ? (
      <View style={rowCenterVertical}>
        <LabeledTitle labelStyle={fs16BoldBlack2} titleStyle={{ ...fs12RegGray5 }} {...header} />
        <CustomFlexSpacer />
        {headerIcon !== undefined ? <IconButton color={colorBlue._1} size={sw24} {...headerIcon} /> : null}
      </View>
    ) : null;

  return (
    <View style={{ ...defaultContainerStyle, ...containerStyle }}>
      <View style={defaultHeaderStyle}>{header === "custom" && customHeader !== undefined ? customHeader : defaultHeader}</View>
      <View style={defaultContentStyle}>{content}</View>
    </View>
  );
};
