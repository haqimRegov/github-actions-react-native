import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CreatedOn } from "../../../pages/Dashboard/Transactions/ApplicationHistory/CustomTableItem/CreatedOn";
import { LastUpdated } from "../../../pages/Dashboard/Transactions/ApplicationHistory/CustomTableItem/LastUpdated";
import { PendingStatus } from "../../../pages/Dashboard/Transactions/ApplicationHistory/CustomTableItem/Status";
import { TotalInvestments } from "../../../pages/Dashboard/Transactions/ApplicationHistory/CustomTableItem/TotalInvestments";
import { Remark } from "./Remark";

declare interface CustomTableItemProps extends ITableCustomItem {
  sortedColumns: TransactionsSortColumnType[];
}
export const CustomTableItem: FunctionComponent<CustomTableItemProps> = ({ sortedColumns, ...rest }: CustomTableItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { accordionIcon, ...withoutAccordion } = rest;
  switch (rest.keyName.key) {
    case "status":
      return <PendingStatus accordionIcon={undefined} {...withoutAccordion} />;
    case "createdOn":
      return <CreatedOn sortedColumns={sortedColumns} {...rest} />;
    case "lastUpdated":
      return <LastUpdated sortedColumns={sortedColumns} {...rest} />;
    case "remark":
      return <Remark sortedColumns={sortedColumns} {...rest} />;
    case "totalInvestment":
      return <TotalInvestments sortedColumns={sortedColumns} {...rest} />;
    default:
      return <View />;
  }
};
