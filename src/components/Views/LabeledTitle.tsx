import React, { Fragment } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { flexRow, fs12BoldBlack2, fs16RegBlack2, sw4 } from "../../styles";
import { CustomSpacer } from "./Spacer";

export interface LabeledTitleProps {
  label: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
  spaceToBottom?: number;
  spaceToLabel?: number;
  style?: ViewStyle;
  title: string;
  titlePrefix?: string;
  titlePrefixStyle?: TextStyle;
  titleStyle?: TextStyle;
}

export const LabeledTitle = ({
  label,
  labelStyle,
  onPress,
  spaceToBottom,
  spaceToLabel,
  style,
  title,
  titlePrefix,
  titlePrefixStyle,
  titleStyle,
}: LabeledTitleProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style}>
        <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
        {spaceToLabel === undefined ? null : <CustomSpacer space={spaceToLabel} />}
        <View style={flexRow}>
          {titlePrefix !== undefined ? (
            <Fragment>
              <Text style={{ ...fs16RegBlack2, ...titlePrefixStyle }}>{titlePrefix}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
            </Fragment>
          ) : null}
          <Text style={{ ...fs16RegBlack2, ...titleStyle }}>{title}</Text>
        </View>
        {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
      </View>
    </TouchableWithoutFeedback>
  );
};
