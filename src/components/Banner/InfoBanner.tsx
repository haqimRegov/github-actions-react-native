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
  fs12BoldGray6,
  fs12RegGray6,
  fs14BoldBlack2,
  px,
  py,
  sh16,
  sh24,
  sh8,
  sw1,
  sw24,
  sw696,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

const { DASHBOARD_EDD_CASE } = Language.PAGE;

declare interface IInfoBannerProps {
  icon: IIcon;
  reason: string;
  remark: string;
  status: string;
}

export const InfoBanner: FunctionComponent<IInfoBannerProps> = ({ icon, reason, remark, status }: IInfoBannerProps) => {
  let containerStatusStyle: ViewStyle = {};

  switch (status) {
    case "cancelled":
    case "rejected":
      containerStatusStyle = { borderColor: colorRed._2, backgroundColor: colorRed._4 };
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
        <CustomSpacer isHorizontal={true} space={sw8} />
        <View style={{ maxWidth: sw696 }}>
          <Text style={fs14BoldBlack2}>{reason}</Text>
          <CustomSpacer space={sh8} />
          <View style={{ ...flexRow, ...centerVertical }}>
            <Text style={fs12BoldGray6}>{`${DASHBOARD_EDD_CASE.LABEL_REMARKS}:`}</Text>
            <CustomSpacer isHorizontal={true} space={sw8} />
            <Text style={fs12RegGray6}>{remark}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
