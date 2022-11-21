import React, { FunctionComponent } from "react";

import { PendingActions } from "./Actions";
import { CreatedOn } from "./CreatedOn";
import { InvestorName } from "./InvestorName";
import { LastUpdated } from "./LastUpdated";
import { PendingStatus } from "./Status";
import { TotalInvestments } from "./TotalInvestments";

declare interface CustomTableItemProps extends ITableCustomItem {
  downloadInitiated?: boolean;
  handleResubmitOrder?: (orderNumber: string) => void;
  handleSelectOrder?: (order: IDashboardOrder) => void;
  onClose?: () => void;
  setCurrentOrder?: (order: IDashboardOrder) => void;
  setScreen?: (route: TransactionsPageType) => void;
  sortedColumns?: TransactionsSortColumnType[];
}
export const CustomTableItem: FunctionComponent<CustomTableItemProps> = ({ sortedColumns, ...rest }: CustomTableItemProps) => {
  switch (rest.keyName.key) {
    case "investorName":
      return <InvestorName sortedColumns={sortedColumns} {...rest} />;
    case "status":
      return <PendingStatus {...rest} />;
    case "totalInvestment":
      return <TotalInvestments sortedColumns={sortedColumns} {...rest} />;
    case "createdOn":
      return <CreatedOn sortedColumns={sortedColumns} {...rest} />;
    case "lastUpdated":
      return <LastUpdated sortedColumns={sortedColumns} {...rest} />;
    default:
      return <PendingActions sortedColumns={sortedColumns} {...rest} />;
  }
};
