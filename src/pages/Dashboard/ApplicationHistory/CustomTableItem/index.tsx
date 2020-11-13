import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { InvestorName } from "./InvestorName";
import { PendingStatus } from "./Status";
import { TotalInvestments } from "./TotalInvestments";

export interface CustomTableItemProps extends ITableCustomItem {}
export const CustomTableItem: FunctionComponent<CustomTableItemProps> = (data: CustomTableItemProps) => {
  switch (data.keyName.key) {
    case "investorName":
      return <InvestorName {...data} />;
    case "status":
      return <PendingStatus {...data} />;
    case "investments":
      return <TotalInvestments {...data} />;
    default:
      return <View />;
  }
};
