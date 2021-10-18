import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Language } from "../../constants/language";
import { IcoMoon } from "../../icons";
import {
  centerHorizontal,
  centerVertical,
  colorRed,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs14BoldBlack2,
  px,
  py,
  sh16,
  sh24,
  sh8,
  sw1,
  sw24,
  sw8,
} from "../../styles";
import { CustomSpacer } from "./Spacer";

const { DASHBOARD_EDD_CASE } = Language.PAGE;

declare interface IReasonProps {
  reason: string;
  remark: string;
  status: string;
  icon: IIcon;
}

export const Reason: FunctionComponent<IReasonProps> = ({ icon, reason, remark, status }: IReasonProps) => {
  let containerStatusStyle: ViewStyle = {};

  switch (status) {
    case "cancelled":
    case "rejected":
      containerStatusStyle = { borderColor: colorRed._2, backgroundColor: colorRed._6 };
      break;
    default:
      containerStatusStyle = {};
  }

  const containerStyle: ViewStyle = {
    ...flexRow,
    ...px(sw24),
    ...py(sh16),
    borderWidth: sw1,
    borderRadius: sw8,
    ...containerStatusStyle,
  };
  return (
    <View style={flexChild}>
      <View style={containerStyle}>
        <View style={{ ...centerHorizontal, height: sh24 }}>
          <IcoMoon color={icon.color} name={icon.name} size={icon.size} />
        </View>
        <CustomSpacer isHorizontal space={sw8} />
        <View>
          <Text style={fs14BoldBlack2}>{reason}</Text>
          <CustomSpacer space={sh8} />
          <View style={{ ...flexRow, ...centerVertical }}>
            <Text style={fs12BoldBlack2}>{`${DASHBOARD_EDD_CASE.LABEL_REMARKS}:`}</Text>
            <CustomSpacer isHorizontal space={sw8} />
            <Text style={fs12RegBlack2}>{remark}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
