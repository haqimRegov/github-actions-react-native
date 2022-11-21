import React, { FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { Badge, CustomSpacer } from "../../../../../components";
import { NunitoBold, NunitoRegular } from "../../../../../constants";
import { centerHV, circle, colorRed, flexRow, fs12RegBlue1, sw100, sw12, sw8 } from "../../../../../styles";

export interface InvestorNameProps extends ITableCustomItem {
  sortedColumns: IEDDDashboardSortType[];
}

export const InvestorName: FunctionComponent<InvestorNameProps> = ({ item, sortedColumns }: InvestorNameProps) => {
  const { clientName, isSeen } = item.rawData as IEDDDashboardCase;
  const titleStyle: TextStyle = {
    ...fs12RegBlue1,
    maxWidth: sw100,
    fontFamily: sortedColumns.includes("clientName") ? NunitoBold : NunitoRegular,
  };
  const badgeStyle: ViewStyle = {
    ...circle(sw8, colorRed._1),
    top: 0,
  };

  return (
    <View style={centerHV}>
      <View>
        {isSeen === false ? (
          <Badge style={badgeStyle} withoutIcon={false}>
            <View style={flexRow}>
              <Text style={titleStyle} numberOfLines={2}>
                {clientName}
              </Text>
              <CustomSpacer isHorizontal space={sw12} />
            </View>
          </Badge>
        ) : (
          <Text style={titleStyle} numberOfLines={2}>
            {clientName}
          </Text>
        )}
      </View>
    </View>
  );
};
