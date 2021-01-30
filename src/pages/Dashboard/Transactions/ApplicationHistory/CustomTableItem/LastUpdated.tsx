import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { DEFAULT_TIME_FORMAT, PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue2, fs12RegBlue2 } from "../../../../../styles";

export interface LastUpdatedProps extends ITableCustomItem {}

export const LastUpdated: FunctionComponent<LastUpdatedProps> = ({ item }: LastUpdatedProps) => {
  const { lastUpdated } = item.rawData as IDashboardOrder;
  return (
    <View style={centerHorizontal}>
      <Text style={fs12RegBlue2}>{moment(lastUpdated, "x").format(PAYMENT_DATE_FORMAT)}</Text>
      <Text style={fs10RegBlue2}>{moment(lastUpdated, "x").format(DEFAULT_TIME_FORMAT)}</Text>
    </View>
  );
};
