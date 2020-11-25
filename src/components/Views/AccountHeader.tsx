import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import {
  borderBottomRed4,
  centerVertical,
  colorWhite,
  flexRow,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  sh24,
  sh56,
  shadowBlue204,
  sw24,
  sw8,
} from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

interface AccountHeaderProps {
  headerStyle?: ViewStyle;
  spaceToBottom?: number;
  subtitle: string;
  subtitleStyle?: TextStyle;
  title: string;
  titleStyle?: TextStyle;
}

export const AccountHeader: FunctionComponent<AccountHeaderProps> = ({
  headerStyle,
  spaceToBottom,
  subtitle,
  subtitleStyle,
  title,
  titleStyle,
}: AccountHeaderProps) => {
  const container: ViewStyle = {
    ...centerVertical,
    ...borderBottomRed4,
    ...flexRow,
    ...shadowBlue204,
    ...px(sw24),
    height: sh56,
    backgroundColor: colorWhite._1,
    borderTopRightRadius: sw8,
    borderTopLeftRadius: sw8,
    position: "relative",
    zIndex: 1,
    ...headerStyle,
  };

  const defaultBottomSpace = spaceToBottom !== undefined ? spaceToBottom : sh24;

  return (
    <Fragment>
      <View style={container}>
        <Text style={{ ...fs24BoldBlack2, ...titleStyle }}>{title}</Text>
        <CustomFlexSpacer />
        <Text style={{ ...fs16RegBlack2, ...subtitleStyle }}>{subtitle}</Text>
      </View>
      <CustomSpacer space={defaultBottomSpace} />
    </Fragment>
  );
};
