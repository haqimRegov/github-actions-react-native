import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";

import { CustomSpacer } from "../../../../components";
import { IcoMoon } from "../../../../icons";
import {
  centerHV,
  circle,
  colorBlue,
  flexRow,
  fs10RegBlue38,
  fs12BoldBlack2,
  sh12,
  sh14,
  sh4,
  sw01,
  sw14,
  sw24,
  sw8,
} from "../../../../styles";

export interface InvestorNameProps extends ITableCustomItem {}

export const InvestorName: FunctionComponent<InvestorNameProps> = ({ item }: InvestorNameProps) => {
  const { investorName } = item.rawData as IApplicationHistoryTable;
  const iconName = investorName.joint !== undefined ? "avatar-joint" : "avatar-2";
  const titleStyle: TextStyle = { ...fs12BoldBlack2, letterSpacing: -sw01, lineHeight: sh14, width: 104 };
  const subtitleStyle: TextStyle = { ...fs10RegBlue38, lineHeight: sh12, width: 104 };

  return (
    <View style={centerHV}>
      <View style={{ ...flexRow, ...centerHV }}>
        <View style={{ ...circle(sw24, colorBlue._2_1), ...centerHV }}>
          <IcoMoon color={colorBlue._2} name={iconName} size={sw14} />
        </View>
        <CustomSpacer isHorizontal={true} space={sw8} />
        <View>
          <Text style={titleStyle} numberOfLines={2}>
            {investorName.principal}
          </Text>
          {investorName.joint !== undefined ? (
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
