import moment from "moment";
import React, { FunctionComponent, useEffect } from "react";
import { Text, TextStyle, View } from "react-native";

import { DEFAULT_TIME_FORMAT, NunitoBold, PAYMENT_DATE_FORMAT } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../../../../styles";

export interface LastUpdatedProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[] | TransactionsSortColumnType[];
}

export const LastUpdated: FunctionComponent<LastUpdatedProps> = ({ item, sortedColumns }: LastUpdatedProps) => {
  const { lastUpdated } = item.rawData as IDashboardOrder;
  const updatedTextStyle: TextStyle = sortedColumns.includes("lastUpdated") ? { fontFamily: NunitoBold } : {};

  useEffect(() => {}, [sortedColumns]);
  return (
    <View style={centerHorizontal}>
      <Text style={{ ...fs12RegBlue1, ...updatedTextStyle }}>{moment(lastUpdated, "x").format(PAYMENT_DATE_FORMAT)}</Text>
      <Text style={{ ...fs10RegBlue6, ...updatedTextStyle }}>{moment(lastUpdated, "x").format(DEFAULT_TIME_FORMAT)}</Text>
    </View>
  );
};
