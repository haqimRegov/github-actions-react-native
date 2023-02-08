import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import {
  borderBottomRed1,
  centerVertical,
  flexRow,
  fs10RegGray6,
  fs12BoldBlack2,
  sh16,
  sh20,
  shadow12Blue104,
  sw16,
  sw8,
} from "../../styles";
import { CustomSpacer } from "./Spacer";

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
    height: sh20,
    borderTopRightRadius: sw8,
    borderTopLeftRadius: sw8,
    position: "relative",
    zIndex: 1,
    ...headerStyle,
  };

  const defaultBottomSpace = spaceToBottom !== undefined ? spaceToBottom : sh16;

  return (
    <Fragment>
      <View style={container}>
        <Text style={{ ...fs10RegGray6, ...titleStyle }}>{title}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <Text style={{ ...fs12BoldBlack2, ...subtitleStyle }}>{subtitle}</Text>
      </View>
      <CustomSpacer space={defaultBottomSpace} />
    </Fragment>
  );
};
