import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { usePrevious } from "../../hooks";
import {
  colorWhite,
  flexChild,
  flexRow,
  fs12RegBlue5,
  fs14RegGray5,
  fs18BoldBlue1,
  px,
  py,
  sh16,
  sh4,
  sh78,
  sw10,
  sw16,
  sw24,
  sw4,
} from "../../styles";
import { AnimationUtils } from "../../utils";
import { Avatar, AvatarProps } from "../Avatar";
import { CircleBadge } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export interface NotificationItemProps {
  avatarProps?: AvatarProps;
  badge?: boolean;
  id: string;
  label?: string;
  onPress?: () => void;
  style?: ViewStyle;
  subtitle?: string;
  title?: string;
  titleStyle?: TextStyle;
}

export const NotificationItem: FunctionComponent<NotificationItemProps> = ({
  avatarProps,
  badge,
  id,
  label,
  onPress,
  style,
  subtitle,
  title,
  titleStyle,
}: NotificationItemProps) => {
  const [readMore, setReadMore] = useState<boolean>(false);
  const prevId = usePrevious(id);

  const container: ViewStyle = {
    // ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    minHeight: sh78,
    ...style,
  };

  const handleReadMore = () => {
    if (onPress !== undefined) {
      onPress();
    }
    AnimationUtils.layout();
    setReadMore(!readMore);
  };

  useEffect(() => {
    if (prevId !== id) {
      setReadMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <TouchableWithoutFeedback onPress={handleReadMore}>
      <View style={container}>
        <View>
          <Avatar {...avatarProps} />
          <CustomFlexSpacer />
        </View>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={flexChild}>
          <View style={flexRow}>
            <Text style={{ ...fs18BoldBlue1, ...titleStyle }}>{label}</Text>
            <CustomSpacer isHorizontal={true} space={sw4} />
            {badge === true ? <CircleBadge /> : null}
            <CustomFlexSpacer />
            <Text style={fs12RegBlue5}>{subtitle}</Text>
          </View>
          <CustomSpacer space={sh4} />
          <Text numberOfLines={readMore === true ? undefined : 1} style={fs14RegGray5}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
