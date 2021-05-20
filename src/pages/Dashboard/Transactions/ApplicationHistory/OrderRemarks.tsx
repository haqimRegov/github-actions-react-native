import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import {
  colorRed,
  flexRow,
  flexWrap,
  fs10RegBlack2,
  fs12BoldBlack2,
  fs16BoldBlack1,
  px,
  sh12,
  sh16,
  sh8,
  sw12,
  sw16,
  sw24,
  sw296,
  sw36,
  sw716,
  sw8,
} from "../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

declare interface OrderRemarksProps {
  remarks: IDashboardRemark[];
  status: OrderStatusType;
}

export const OrderRemarks: FunctionComponent<OrderRemarksProps> = ({ remarks, status }: OrderRemarksProps) => {
  const title =
    status === "BR - Rerouted" || status === "HQ - Rerouted"
      ? DASHBOARD_HOME.LABEL_REASONS_REROUTED
      : DASHBOARD_HOME.LABEL_REASONS_REJECTED;

  return (
    <Fragment>
      <CustomSpacer space={sh16} />
      <View style={px(sw16)}>
        <Text style={fs16BoldBlack1}>{title}</Text>
        <CustomSpacer space={sh12} />
        <View style={{ ...flexWrap, width: sw716, ...flexRow }}>
          <CustomSpacer space={sh8} />
          {remarks.map(({ label, remark }: IDashboardRemark, index) => {
            return (
              <Fragment key={index}>
                {index % 2 === 0 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null}
                <IcoMoon color={colorRed._2} name={"error"} size={sw24} />
                <CustomSpacer isHorizontal={true} space={sw12} />
                <View style={{ width: sw296, marginBottom: sh16 }}>
                  <Text style={fs12BoldBlack2}>{label}</Text>
                  {remark.map((text: string, remarkIndex: number) => (
                    <Text key={remarkIndex} style={fs10RegBlack2}>{`• ${text}`}</Text>
                  ))}
                </View>
                {index % 2 === 0 ? <CustomSpacer isHorizontal={true} space={sw36} /> : null}
              </Fragment>
            );
          })}
        </View>
      </View>
    </Fragment>
  );
};
