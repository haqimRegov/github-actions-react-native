import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CreatedOn } from "../../../Transactions/ApplicationHistory/CustomTableItem/CreatedOn";
import { LastUpdated } from "../../../Transactions/ApplicationHistory/CustomTableItem/LastUpdated";
import { ClosedDate } from "./ClosedDate";
import { DueDate } from "./DueDate";
import { EDDStatus } from "./EDDStatus";
import { InvestorName } from "./InvestorName";

export interface CustomTableItemProps extends ITableCustomItem {}
export const EDDCustomTableItem: FunctionComponent<CustomTableItemProps> = (data: CustomTableItemProps) => {
  switch (data.keyName.key) {
    case "status":
      return <EDDStatus {...data} />;
    case "createdOn":
      return <CreatedOn {...data} />;
    case "lastUpdated":
      return <LastUpdated {...data} />;
    case "targetDate":
      return <DueDate {...data} />;
    case "closeDate":
      return <ClosedDate {...data} />;
    case "clientName":
      return <InvestorName {...data} />;
    default:
      return <View />;
  }
};
