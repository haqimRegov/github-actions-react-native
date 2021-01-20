import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { DEFAULT_TIME_FORMAT } from "../../constants";
import { colorWhite, fs12RegBlue25, fs16RegBlack2, sh14, sh8 } from "../../styles";
import { AvatarProps } from "../Avatar";
import { NotificationItem } from "../Items";
import { CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";

interface NotificationListProps {
  avatarProps?: (item: INotificationItem) => AvatarProps;
  items: INotificationItem[];
  label?: string;
  onPress?: (notification: INotificationItem) => void;
}

export const NotificationList: FunctionComponent<NotificationListProps> = ({
  avatarProps,
  items,
  label,
  onPress,
}: NotificationListProps) => {
  return (
    <Fragment>
      {label !== undefined ? <TextSpaceArea spaceToBottom={sh8} style={{ ...fs12RegBlue25, lineHeight: sh14 }} text={label} /> : null}
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
