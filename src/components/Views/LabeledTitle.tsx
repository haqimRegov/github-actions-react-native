import React, { Fragment } from "react";
import { Text, TextStyle } from "react-native";

import { fs12BoldBlack2, fs16RegBlack2 } from "../../styles";
import { CustomSpacer } from "./Spacer";

interface LabeledTitleProps {
  label: string;
  labelStyle?: TextStyle;
  spaceToBottom?: number;
  spaceToLabel?: number;
  title: string;
  titleStyle?: TextStyle;
}

export const LabeledTitle = ({ label, labelStyle, spaceToBottom, spaceToLabel, title, titleStyle }: LabeledTitleProps) => {
  return (
    <Fragment>
      <Text style={{ ...fs12BoldBlack2, ...labelStyle }}>{label}</Text>
      {spaceToLabel === undefined ? null : <CustomSpacer space={spaceToLabel} />}
      <Text style={{ ...fs16RegBlack2, ...titleStyle }}>{title}</Text>
      {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
    </Fragment>
  );
};
