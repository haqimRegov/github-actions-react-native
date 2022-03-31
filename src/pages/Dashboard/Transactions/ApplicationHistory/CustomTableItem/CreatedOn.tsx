import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { DEFAULT_TIME_FORMAT, NunitoBold, PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../../../../styles";

export interface CreatedOnProps extends ITableCustomItem {
  sortedColumns: TransactionsSortColumnType[];
}

export const CreatedOn: FunctionComponent<CreatedOnProps> = ({ item, sortedColumns }: CreatedOnProps) => {
  const { createdOn } = item.rawData as IDashboardOrder;
  const updatedTextStyle: TextStyle = sortedColumns.includes("createdOn") ? { fontFamily: NunitoBold } : {};
  return (
    <View style={centerHorizontal}>
      <Text style={{ ...fs12RegBlue1, ...updatedTextStyle }}>{moment(createdOn, "x").format(PAYMENT_DATE_FORMAT)}</Text>
      <Text style={{ ...fs10RegBlue6, ...updatedTextStyle }}>{moment(createdOn, "x").format(DEFAULT_TIME_FORMAT)}</Text>
    </View>
  );
};
