import React, { FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { centerHorizontal, colorBlue, fs12SemiBoldBlue2, px, sw16, sw8 } from "../../styles";

export interface StatusProps {
  text: string;
  textStyle?: TextStyle;
  viewStyle?: ViewStyle;
}

export const Status: FunctionComponent<StatusProps> = ({ text, textStyle, viewStyle }: StatusProps) => {
  const statusViewStyle: ViewStyle = {
    backgroundColor: colorBlue._2_05,
    borderRadius: sw16,
    ...px(sw8),
    ...centerHorizontal,
    ...viewStyle,
  };
  return (
    <View style={statusViewStyle}>
      <Text style={{ ...fs12SemiBoldBlue2, ...textStyle }} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};
