import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue8, fs12RegBlue2 } from "../../../../../styles";

export interface DueDateProps extends ITableCustomItem {}

export const DueDate: FunctionComponent<DueDateProps> = ({ item }: DueDateProps) => {
  const { targetDate, daysRemaining } = item.rawData as IEDDDashboardCase;
  const defaultTargetDate = targetDate !== null ? moment(targetDate, "x").format(PAYMENT_DATE_FORMAT) : "-";
  return (
    <View style={centerHorizontal}>
      <Text style={fs12RegBlue2}>{defaultTargetDate}</Text>
      {daysRemaining !== null ? <Text style={fs10RegBlue8}>{daysRemaining}</Text> : null}
    </View>
  );
};
