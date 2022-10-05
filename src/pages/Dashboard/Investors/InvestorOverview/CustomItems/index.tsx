import React, { FunctionComponent } from "react";

import { DateTime, InvestorName } from "../../../../../templates";
import { InvestorOverviewActions } from "./Actions";

interface CustomTableItemProps extends ITableCustomItem {
  investorData?: IInvestor;
  sortedColumns: InvestorAccountsSortColumnType[];
  handleSales?: (item: IInvestorAccountsData) => void;
  handleViewAccount?: (item: ITableRowData) => void;
}
export const InvestorDetailsCustomTableItem: FunctionComponent<CustomTableItemProps> = ({
  investorData,
  sortedColumns,
  ...data
}: CustomTableItemProps) => {
  switch (data.keyName.key) {
    case "name":
      return <InvestorName {...data} sortedColumns={sortedColumns} />;
    case "accountOpeningDate":
      return <DateTime sortedColumns={sortedColumns} {...data} />;
    default:
      return <InvestorOverviewActions {...data} investorData={investorData} />;
  }
};
