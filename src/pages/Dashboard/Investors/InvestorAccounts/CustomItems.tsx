import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { DateTime } from "../../../../templates/CustomItems/Date";
import { InvestorName } from "../../../../templates/CustomItems/InvestorName";

declare interface CustomTableItemProps extends ITableCustomItem {
  sortedColumns: InvestorAccountsSortColumnType[];
}
export const InvestorDetailsCustomTableItem: FunctionComponent<CustomTableItemProps> = ({
  sortedColumns,
  ...data
}: CustomTableItemProps) => {
  switch (data.keyName.key) {
    case "name":
      return <InvestorName {...data} sortedColumns={sortedColumns} />;
    case "accountOpeningDate":
      return <DateTime sortedColumns={sortedColumns} {...data} />;
    default:
      return <View />;
  }
};
