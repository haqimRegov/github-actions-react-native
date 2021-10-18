import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { DEFAULT_TIME_FORMAT } from "../../constants";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs12BoldBlue2,
  fs12RegBlue25,
  fs16RegBlack2,
  sh14,
  sh16,
  sh8,
  sw4,
} from "../../styles";
import { AvatarProps } from "../Avatar";
import { NotificationItem } from "../Items";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";

const { INBOX } = Language.PAGE;

interface NotificationListProps {
  avatarProps?: (item: INotificationItem) => AvatarProps;
  handleReadAll: () => void;
  items: INotificationItem[];
  label?: string;
  markAll: boolean;
  notificationsCount: number;
  onPress?: (notification: INotificationItem) => void;
}

export const NotificationList: FunctionComponent<NotificationListProps> = ({
  avatarProps,
  handleReadAll,
  items,
  markAll,
  notificationsCount,
  label,
  onPress,
}: NotificationListProps) => {
  return (
    <Fragment>
      <View style={flexRow}>
        {label !== undefined ? <TextSpaceArea spaceToBottom={sh8} style={{ ...fs12RegBlue25, lineHeight: sh14 }} text={label} /> : null}
        {markAll && notificationsCount > 0 ? (
          <Fragment>
            <CustomFlexSpacer />
            <TouchableWithoutFeedback onPress={handleReadAll}>
              <View style={{ ...flexRow, ...centerVertical }}>
                <IcoMoon color={colorBlue._2} name="check" size={sh16} />
                <CustomSpacer isHorizontal space={sw4} />
                <Text style={fs12BoldBlue2}>{`${INBOX.READ_ALL} (${notificationsCount})`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </Fragment>
        ) : null}
      </View>
      {items.map((item: INotificationItem, index: number) => {
        const { createdAt, id, isRead, title, message } = item;
        const subtitle = moment(createdAt, "x").format(DEFAULT_TIME_FORMAT);
        const handlePress = () => {
          if (onPress !== undefined) {
            onPress(item);
          }
        };
        const unreadStyle: ViewStyle = isRead === true ? { backgroundColor: colorWhite._4 } : {};
        const titleStyle: TextStyle = isRead === true ? fs16RegBlack2 : {};

        const avatar = avatarProps !== undefined ? avatarProps(item) : undefined;

        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={sh8} />}
            <NotificationItem
              avatarProps={avatar}
              badge={!isRead}
              id={id}
              label={title}
              onPress={handlePress}
              title={message}
              titleStyle={titleStyle}
              style={unreadStyle}
              subtitle={subtitle}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
