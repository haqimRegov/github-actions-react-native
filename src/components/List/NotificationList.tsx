import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";

import { DEFAULT_TIME_FORMAT } from "../../constants";
import { fs12RegBlue25, sh14, sh8 } from "../../styles";
import { NotificationItem } from "../Items";
import { TextSpaceArea } from "../Views";
import { CustomSpacer } from "../Views/Spacer";

interface NotificationListProps {
  items: INotificationItem[];
  label?: string;
  onPress?: (notification: INotificationItem) => void;
}

export const NotificationList: FunctionComponent<NotificationListProps> = ({ items, label, onPress }: NotificationListProps) => {
  return (
    <Fragment>
      {label !== undefined ? <TextSpaceArea spaceToBottom={sh8} style={{ ...fs12RegBlue25, lineHeight: sh14 }} text={label} /> : null}
      {items.map((item: INotificationItem, index: number) => {
        const { createdAt, isRead, title, message } = item;
        const subtitle = moment(createdAt).format(DEFAULT_TIME_FORMAT);
        const handlePress = () => {
          if (onPress !== undefined) {
            onPress(item);
          }
        };
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer space={sh8} />}
            <NotificationItem badge={!isRead} label={title} onPress={handlePress} title={message} subtitle={subtitle} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};
