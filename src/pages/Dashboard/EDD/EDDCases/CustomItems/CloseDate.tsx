import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT, NunitoBold } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../../../../styles";

export interface CloseDateProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}

export const CloseDate: FunctionComponent<CloseDateProps> = ({ item, sortedColumns }: CloseDateProps) => {
  const { lastUpdated } = item.rawData as unknown as IEDDDashboardCase;
  const checkBold: TextStyle = sortedColumns.includes("closeDate") ? { fontFamily: NunitoBold } : {};
  return (
    <View style={centerHorizontal}>
      <Text style={{ ...fs12RegBlue1, ...checkBold }}>{moment(lastUpdated, "x").format(DEFAULT_DATE_FORMAT)}</Text>
      <Text style={{ ...fs10RegBlue6, ...checkBold }}>{moment(lastUpdated, "x").format(DEFAULT_TIME_FORMAT)}</Text>
    </View>
  );
};
