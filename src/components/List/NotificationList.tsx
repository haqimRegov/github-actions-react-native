import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { DEFAULT_TIME_FORMAT } from "../../constants";
import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import { centerVertical, colorBlue, flexRow, fs12BoldBlue1, fs12RegGray4, sh16, sh8, shadow12Blue104, sw4 } from "../../styles";
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
  label,
  markAll,
  notificationsCount,
  onPress,
}: NotificationListProps) => {
  return (
    <Fragment>
      <View style={flexRow}>
        {label !== undefined ? <TextSpaceArea spaceToBottom={sh8} style={fs12RegGray4} text={label} /> : null}
        {markAll && notificationsCount > 0 ? (
          <Fragment>
            <CustomFlexSpacer />
            <TouchableWithoutFeedback onPress={handleReadAll}>
              <View style={{ ...flexRow, ...centerVertical }}>
                <IcoMoon color={colorBlue._1} name="check" size={sh16} />
                <CustomSpacer isHorizontal space={sw4} />
                <Text style={fs12BoldBlue1}>{`${INBOX.READ_ALL} (${notificationsCount})`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </Fragment>
        ) : null}
      </View>
      {items.map((item: INotificationItem, index: number) => {
        const { createdAt, id, isRead, isSeen, localIsRead, title, message } = item;
        const subtitle = moment(createdAt, "x").format(DEFAULT_TIME_FORMAT);
        const handlePress = () => {
          if (onPress !== undefined) {
            onPress(item);
          }
        };
        const unreadStyle: ViewStyle = isRead === true || localIsRead ? { backgroundColor: colorBlue._2 } : shadow12Blue104;

        const avatar = avatarProps !== undefined ? avatarProps(item) : undefined;

        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={sh8} />}
            <NotificationItem
              avatarProps={avatar}
              badge={!isSeen}
              id={id}
              label={title}
              onPress={handlePress}
              title={message}
              style={unreadStyle}
              subtitle={subtitle}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
