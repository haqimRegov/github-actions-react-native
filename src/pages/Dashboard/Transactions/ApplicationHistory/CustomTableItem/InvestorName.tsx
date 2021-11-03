import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { Badge, CustomSpacer } from "../../../../../components";
import { IcoMoon } from "../../../../../icons";
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
} from "../../../../../styles";

export interface InvestorNameProps extends ITableCustomItem {}

export const InvestorName: FunctionComponent<InvestorNameProps> = ({ item }: InvestorNameProps) => {
  const { accountType, investorName, isSeen } = item.rawData as IDashboardOrder;
  const iconName = accountType === "Joint" ? "avatar-joint" : "avatar";
  const titleStyle: TextStyle = { ...fs12RegBlue1, maxWidth: sw100 };
  const subtitleStyle: TextStyle = { ...fs10RegBlue6, maxWidth: sw100 };
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
                  {investorName.principal}
                </Text>
                <CustomSpacer isHorizontal space={sw12} />
              </View>
            </Badge>
          ) : (
            <Text style={titleStyle} numberOfLines={2}>
              {investorName.principal}
            </Text>
          )}
          {accountType === "Joint" ? (
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
