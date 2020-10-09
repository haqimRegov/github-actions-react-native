import React, { FunctionComponent, useState } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { SAMPLE_AGENT } from "../../mocks";
import {
  centerVertical,
  colorWhite,
  flexChild,
  flexRow,
  fs10RegBlue25,
  fs12RegBlack2,
  fs16BoldBlue2,
  px,
  py,
  sh16,
  sh88,
  shadowBlue5,
  sw10,
  sw16,
  sw24,
  sw8,
} from "../../styles";
import { AnimationUtils } from "../../utils";
import { Avatar } from "../Avatar";
import { CircleBadge } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export interface NotificationItemProps {
  badge?: boolean;
  label?: string;
  onPress?: () => void;
  style?: ViewStyle;
  subtitle?: string;
  title?: string;
}

export const NotificationItem: FunctionComponent<NotificationItemProps> = ({
  badge,
  label,
  onPress,
  style,
  subtitle,
  title,
}: NotificationItemProps) => {
  const [readMore, setReadMore] = useState<boolean>(false);
  const container: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    minHeight: sh88,
    ...style,
  };

  const handleReadMore = () => {
    if (onPress !== undefined) {
      onPress();
    }
    AnimationUtils.layout();
    setReadMore(!readMore);
  };

  return (
    <TouchableWithoutFeedback onPress={handleReadMore}>
      <View style={shadowBlue5}>
        <View style={container}>
          <View>
            <Avatar image={{ uri: SAMPLE_AGENT.image }} />
            <CustomFlexSpacer />
          </View>
          <CustomSpacer isHorizontal={true} space={sw16} />
          <View style={flexChild}>
            <View style={{ ...centerVertical, ...flexRow }}>
              <Text style={fs16BoldBlue2}>{label}</Text>
              <CustomSpacer isHorizontal={true} space={sw8} />
              {badge === true ? <CircleBadge /> : null}
            </View>
            <Text numberOfLines={readMore ? undefined : 1} style={{ ...fs12RegBlack2 }}>
              {title}
            </Text>
            <Text style={fs10RegBlue25}>{subtitle}</Text>
          </View>
          <CustomSpacer isHorizontal={true} space={sw24} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
