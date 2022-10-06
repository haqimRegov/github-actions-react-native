import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { StatusBadge, StatusBadgeColorType } from "../../../../../components";
import { Language } from "../../../../../constants";
import { centerHorizontal, centerVertical, flexRow } from "../../../../../styles";

const { INVESTOR_ACCOUNTS } = Language.PAGE;

interface AccountStatusProps extends ITableCustomItem {
  sortedColumns: InvestorAccountsSortColumnType[];
}

export const AccountStatus: FunctionComponent<AccountStatusProps> = ({ item }: AccountStatusProps) => {
  const { status } = item.rawData as unknown as IInvestorAccountsData;
  const statusColor: StatusBadgeColorType = status === INVESTOR_ACCOUNTS.LABEL_INACTIVE ? "warning" : "complete";

  return (
    <View style={centerHorizontal}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <StatusBadge color={statusColor} text={status} />
      </View>
    </View>
  );
};
