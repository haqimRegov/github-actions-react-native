import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { LastUpdated } from "../../../Transactions/ApplicationHistory/CustomTableItem/LastUpdated";
import { CaseCreated } from "./CaseCreated";
import { CloseDate } from "./CloseDate";
import { DueDate } from "./DueDate";
import { EDDStatus } from "./EDDStatus";
import { InvestorName } from "./InvestorName";

declare interface CustomTableItemProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}
export const EDDCustomTableItem: FunctionComponent<CustomTableItemProps> = ({ sortedColumns, ...data }: CustomTableItemProps) => {
  switch (data.keyName.key) {
    case "status":
      return <EDDStatus sortedColumns={sortedColumns} {...data} />;
    case "caseCreated":
      return <CaseCreated sortedColumns={sortedColumns} {...data} />;
    case "lastUpdated":
      if (data.keyName.name !== undefined && data.keyName.name === "closeDate") {
        return <CloseDate sortedColumns={sortedColumns} {...data} />;
      }
      return <LastUpdated sortedColumns={sortedColumns} {...data} />;
    case "targetDate":
      return <DueDate sortedColumns={sortedColumns} {...data} />;
    case "clientName":
      return <InvestorName sortedColumns={sortedColumns} {...data} />;
    default:
      return <View />;
  }
};
