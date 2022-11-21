import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { Badge, CustomSpacer } from "../../components";
import { NunitoBold } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  circle,
  colorBlue,
  colorGray,
  colorRed,
  flexRow,
  fs10RegBlue6,
  fs12RegBlue1,
  sh4,
  sw100,
  sw12,
  sw14,
  sw24,
  sw8,
} from "../../styles";

interface InvestorNameProps extends ITableCustomItem {
  sortedColumns: InvestorAccountsSortColumnType[];
}

type TInvestorKeyNames = "name" | "investorName";

export const InvestorName: FunctionComponent<InvestorNameProps> = ({ item, sortedColumns, keyName }: InvestorNameProps) => {
  const addKeyType: TInvestorKeyNames = keyName.key as TInvestorKeyNames;
  const { accountType, [addKeyType]: investorName, isSeen } = item.rawData as unknown as IDashboardAll;
  const iconName = accountType === "Joint" ? "avatar-joint" : "avatar";
  const updatedTextStyle: TextStyle = sortedColumns.includes(addKeyType) ? { fontFamily: NunitoBold } : {};
  const titleStyle: TextStyle = { ...fs12RegBlue1, ...updatedTextStyle, maxWidth: sw100 };
  const subtitleStyle: TextStyle = { ...fs10RegBlue6, ...updatedTextStyle, maxWidth: sw100 };
  const badgeStyle: ViewStyle = {
    ...circle(sw8, colorRed._1),
    top: 0,
  };

  return (
    <View style={centerHV}>
      <View style={{ ...flexRow, ...centerHV }}>
        <View style={{ ...circle(sw24, colorGray._1), ...centerHV }}>
          <IcoMoon color={colorBlue._1} name={iconName} size={sw14} />
        </View>
        <CustomSpacer isHorizontal={true} space={sw8} />
        <View>
          {isSeen === false ? (
            <Badge style={badgeStyle} withoutIcon={false}>
              <View style={flexRow}>
                <Text style={titleStyle} numberOfLines={2}>
                  {typeof investorName === "string" ? investorName : investorName.principal}
                </Text>
                <CustomSpacer isHorizontal space={sw12} />
              </View>
            </Badge>
          ) : (
            <Text style={titleStyle} numberOfLines={2}>
              {typeof investorName === "string" ? investorName : investorName.principal}
            </Text>
          )}
          {accountType === "Joint" && typeof investorName !== "string" ? (
            <Fragment>
              <CustomSpacer space={sh4} />
              <Text style={subtitleStyle} numberOfLines={2}>
                {investorName.joint}
              </Text>
            </Fragment>
          ) : null}
        </View>
      </View>
    </View>
  );
};
