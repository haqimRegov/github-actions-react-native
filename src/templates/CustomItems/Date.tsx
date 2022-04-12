import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { DEFAULT_TIME_FORMAT, NunitoBold, PAYMENT_DATE_FORMAT } from "../../constants";
import { centerHorizontal, fs10RegBlue6, fs12RegBlue1 } from "../../styles";

declare type TInvestorKeyNames = "createdOn" | "accountOpeningDate";

export interface DateProps extends ITableCustomItem {
  sortedColumns: TransactionsSortColumnType[] | InvestorAccountsSortColumnType[];
  time?: boolean;
}

declare interface IDashboardAll extends IDashboardOrder, IInvestorAccountsData {}

export const DateTime: FunctionComponent<DateProps> = ({ item, keyName, sortedColumns, time }: DateProps) => {
  const addKeyType: TInvestorKeyNames = keyName.key as TInvestorKeyNames;
  const { [addKeyType]: date } = item.rawData as unknown as IDashboardAll;
  const updatedTextStyle: TextStyle = sortedColumns.includes(addKeyType) ? { fontFamily: NunitoBold } : {};
  return (
    <View style={centerHorizontal}>
      <Text style={{ ...fs12RegBlue1, ...updatedTextStyle }}>{moment(date, "x").format(PAYMENT_DATE_FORMAT)}</Text>
      {time === true ? <Text style={{ ...fs10RegBlue6, ...updatedTextStyle }}>{moment(date, "x").format(DEFAULT_TIME_FORMAT)}</Text> : null}
    </View>
  );
};
