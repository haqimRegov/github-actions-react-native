import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import {
  borderBottomRed1,
  centerVertical,
  colorWhite,
  flexRow,
  fs12RegGray6,
  fs24BoldGray6,
  px,
  sh24,
  sh56,
  shadow12Blue104,
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
    ...borderBottomRed1,
    ...flexRow,
    ...shadow12Blue104,
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
        <Text style={{ ...fs24BoldGray6, ...titleStyle }}>{title}</Text>
        <CustomFlexSpacer />
        <Text style={{ ...fs12RegGray6, ...subtitleStyle }}>{subtitle}</Text>
      </View>
      <CustomSpacer space={defaultBottomSpace} />
    </Fragment>
  );
};
