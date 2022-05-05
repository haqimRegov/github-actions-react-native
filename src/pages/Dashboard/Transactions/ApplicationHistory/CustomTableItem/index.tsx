import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CreatedOn } from "./CreatedOn";
import { InvestorName } from "./InvestorName";
import { LastUpdated } from "./LastUpdated";
import { PendingStatus } from "./Status";
import { TotalInvestments } from "./TotalInvestments";

declare interface CustomTableItemProps extends ITableCustomItem {
  downloadInitiated?: boolean;
  sortedColumns: TransactionsSortColumnType[];
}
export const CustomTableItem: FunctionComponent<CustomTableItemProps> = ({ sortedColumns, ...rest }: CustomTableItemProps) => {
  switch (rest.keyName.key) {
    case "investorName":
      return <InvestorName sortedColumns={sortedColumns} {...rest} />;
    case "status":
      return <PendingStatus sortedColumns={sortedColumns} {...rest} />;
    case "totalInvestment":
      return <TotalInvestments sortedColumns={sortedColumns} {...rest} />;
    case "createdOn":
      return <CreatedOn sortedColumns={sortedColumns} {...rest} />;
    case "lastUpdated":
      return <LastUpdated sortedColumns={sortedColumns} {...rest} />;
    default:
      return <View />;
  }
};
