import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs12RegBlue2 } from "../../../../../styles";

export interface ClosedDateProps extends ITableCustomItem {}

export const ClosedDate: FunctionComponent<ClosedDateProps> = ({ item }: ClosedDateProps) => {
  const { closeDate } = item.rawData as IEDDDashboardCase;
  return (
    <View style={centerHorizontal}>
      <Text style={fs12RegBlue2}>{moment(closeDate, "x").format(PAYMENT_DATE_FORMAT)}</Text>
    </View>
  );
};
