import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CreatedOn } from "./CreatedOn";
import { InvestorName } from "./InvestorName";
import { LastUpdated } from "./LastUpdated";
import { PendingStatus } from "./Status";
import { TotalInvestments } from "./TotalInvestments";

export type CustomTableItemProps = ITableCustomItem;
export const CustomTableItem: FunctionComponent<CustomTableItemProps> = (data: CustomTableItemProps) => {
  switch (data.keyName.key) {
    case "investorName":
      return <InvestorName {...data} />;
    case "status":
      return <PendingStatus {...data} />;
    case "totalInvestment":
      return <TotalInvestments {...data} />;
    case "createdOn":
      return <CreatedOn {...data} />;
    case "lastUpdated":
      return <LastUpdated {...data} />;
    default:
      return <View />;
  }
};
