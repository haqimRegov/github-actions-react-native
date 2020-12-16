import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, colorBlue, flexRow, fs12BoldBlack2, fs14SemiBoldBlack1, fs16RegBlack2, sw12, sw4 } from "../../styles";
import { TouchableWrapper } from "../Touchables/TouchableWrapper";
import { CustomSpacer } from "./Spacer";

export interface LabeledTitleProps {
  iconSize?: number;
  label: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
  spaceToBottom?: number;
  spaceToIcon?: number;
  spaceToLabel?: number;
  style?: ViewStyle;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  title: string;
  titleIcon?: string;
  titlePrefix?: string;
  titlePrefixStyle?: TextStyle;
  titleStyle?: TextStyle;
}

export const LabeledTitle: FunctionComponent<LabeledTitleProps> = ({
  iconSize,
  label,
  labelStyle,
  onPress,
  spaceToBottom,
  spaceToIcon,
  spaceToLabel,
  style,
  subtitle,
  subtitleStyle,
  title,
  titleIcon,
  titlePrefix,
  titlePrefixStyle,
  titleStyle,
}: LabeledTitleProps) => {
  const defaultIconSpace = spaceToIcon !== undefined ? spaceToIcon : sw12;
  return (
    <TouchableWrapper onPress={onPress}>
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
          {titleIcon !== undefined ? (
            <View style={{ ...flexRow, ...centerVertical }}>
              <CustomSpacer isHorizontal={true} space={defaultIconSpace} />
              <IcoMoon color={colorBlue._1} name={titleIcon} size={iconSize} />
            </View>
          ) : null}
        </View>
        {subtitle !== undefined ? <Text style={{ ...fs14SemiBoldBlack1, ...subtitleStyle }}>{subtitle}</Text> : null}
        {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
      </View>
    </TouchableWrapper>
  );
};
