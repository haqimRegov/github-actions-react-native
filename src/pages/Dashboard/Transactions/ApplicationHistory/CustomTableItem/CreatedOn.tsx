import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { DEFAULT_TIME_FORMAT, PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../../../../styles";

export type CreatedOnProps = ITableCustomItem;

export const CreatedOn: FunctionComponent<CreatedOnProps> = ({ item }: CreatedOnProps) => {
  const { createdOn } = item.rawData as IDashboardOrder;
  return (
    <View style={centerHorizontal}>
      <Text style={fs12RegBlue1}>{moment(createdOn, "x").format(PAYMENT_DATE_FORMAT)}</Text>
      <Text style={fs10RegBlue6}>{moment(createdOn, "x").format(DEFAULT_TIME_FORMAT)}</Text>
    </View>
  );
};
