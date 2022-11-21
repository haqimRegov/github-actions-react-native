import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { IcoMoon } from "../../icons";
import { centerVertical, colorBlue, flexRow, fs12BoldGray6, fs14RegBlack1, fs16BoldBlack1, fs16RegGray6, sw12, sw4 } from "../../styles";
import { TouchableWrapper } from "../Touchables/TouchableWrapper";
import { CustomSpacer } from "./Spacer";

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
  titleIconStyle,
  titleNumberOfLines,
  titlePrefix,
  titlePrefixStyle,
  titleStyle,
}: LabeledTitleProps) => {
  const defaultIconSpace = spaceToIcon !== undefined ? spaceToIcon : sw12;
  return (
    <TouchableWrapper onPress={onPress}>
      <View style={style}>
        <Text style={{ ...fs12BoldGray6, ...labelStyle }}>{label}</Text>
        {spaceToLabel === undefined ? null : <CustomSpacer space={spaceToLabel} />}
        <View style={flexRow}>
          {titlePrefix !== undefined ? (
            <Fragment>
              <Text style={{ ...fs16RegGray6, ...titlePrefixStyle }}>{titlePrefix}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
            </Fragment>
          ) : null}
          {title !== undefined ? (
            <Text style={{ ...fs16BoldBlack1, ...titleStyle }} numberOfLines={titleNumberOfLines}>
              {title}
            </Text>
          ) : null}
          {titleIcon !== undefined ? (
            <View style={{ ...flexRow, ...centerVertical, ...titleIconStyle }}>
              <CustomSpacer isHorizontal={true} space={defaultIconSpace} />
              <IcoMoon color={colorBlue._8} name={titleIcon} size={iconSize} />
            </View>
          ) : null}
        </View>
        {subtitle !== undefined ? <Text style={{ ...fs14RegBlack1, ...subtitleStyle }}>{subtitle}</Text> : null}
        {spaceToBottom === undefined ? null : <CustomSpacer space={spaceToBottom} />}
      </View>
    </TouchableWrapper>
  );
};
