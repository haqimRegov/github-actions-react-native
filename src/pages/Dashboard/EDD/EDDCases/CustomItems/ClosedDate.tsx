import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs12RegBlue1 } from "../../../../../styles";

export type ClosedDateProps = ITableCustomItem;

export const ClosedDate: FunctionComponent<ClosedDateProps> = ({ item }: ClosedDateProps) => {
  const { closeDate } = item.rawData as IEDDDashboardCase;
  return (
    <View style={centerHorizontal}>
      <Text style={fs12RegBlue1}>{moment(closeDate, "x").format(PAYMENT_DATE_FORMAT)}</Text>
    </View>
  );
};
