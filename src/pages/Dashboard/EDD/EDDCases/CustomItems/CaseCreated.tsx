import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT, NunitoBold } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../../../../styles";

export interface CaseCreatedProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}

export const CaseCreated: FunctionComponent<CaseCreatedProps> = ({ item, sortedColumns }: CaseCreatedProps) => {
  const { createdOn } = item.rawData as unknown as IDashboardOrder;
  const updatedTextStyle: TextStyle = sortedColumns.includes("caseCreated") ? { fontFamily: NunitoBold } : {};
  return (
    <View style={centerHorizontal}>
      <Text style={{ ...fs12RegBlue1, ...updatedTextStyle }}>{moment(createdOn, "x").format(DEFAULT_DATE_FORMAT)}</Text>
      <Text style={{ ...fs10RegBlue6, ...updatedTextStyle }}>{moment(createdOn, "x").format(DEFAULT_TIME_FORMAT)}</Text>
    </View>
  );
};
