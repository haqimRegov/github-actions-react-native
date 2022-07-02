import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { DEFAULT_DATE_FORMAT, NunitoBold, NunitoRegular } from "../../../../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../../../../styles";

export interface DueDateProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}

export const DueDate: FunctionComponent<DueDateProps> = ({ item, sortedColumns }: DueDateProps) => {
  const { targetDate, daysRemaining } = item.rawData as IEDDDashboardCase;
  const defaultTargetDate = targetDate !== null ? moment(targetDate, "x").format(DEFAULT_DATE_FORMAT) : "-";
  const familyStyle: TextStyle = {
    fontFamily: sortedColumns.includes("targetDate") ? NunitoBold : NunitoRegular,
  };
  return (
    <View style={centerHorizontal}>
      <Text style={{ ...fs12RegBlue1, ...familyStyle }}>{defaultTargetDate}</Text>
      {daysRemaining !== null ? <Text style={{ ...fs10RegBlue6, ...familyStyle }}>{daysRemaining}</Text> : null}
    </View>
  );
};
