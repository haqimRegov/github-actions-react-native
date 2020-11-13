import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer } from "../../../components";
import { Language } from "../../../constants/language";
import { IcoMoon } from "../../../icons";
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
  sh4,
  sh8,
  sw12,
  sw16,
  sw18,
  sw304,
  sw36,
  sw716,
  sw8,
} from "../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

declare interface EDDReasonsProps {
  data: IEDDReason[];
}

export const EDDReasons: FunctionComponent<EDDReasonsProps> = ({ data }: EDDReasonsProps) => {
  return (
    <Fragment>
      <CustomSpacer space={sh16} />
      <View style={px(sw16)}>
        <Text style={fs16BoldBlack1}>{DASHBOARD_HOME.LABEL_REJECTED_REASONS}</Text>
        <CustomSpacer space={sh12} />
        <View style={{ ...flexWrap, width: sw716, ...flexRow }}>
          <CustomSpacer space={sh8} />
          {data.map((reason, index) => {
            const remark = `${DASHBOARD_HOME.LABEL_REMARK}: ${reason.remark}`;
            let rejectionIcon: string = "";
            if (reason.label === "Payment Not Found" || reason.label === "3rd Party Payment" || reason.label === "Duplicate Payment") {
              rejectionIcon = "payment-not-found";
            } else {
              rejectionIcon = "error";
            }
            return (
              <Fragment key={index}>
                {index % 2 === 0 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null}
                <IcoMoon color={colorRed._1} name={rejectionIcon} size={sw18} style={{ marginTop: sh4 }} />
                <CustomSpacer isHorizontal={true} space={sw12} />
                <View style={{ width: sw304, marginBottom: sh16 }}>
                  <Text style={fs12BoldBlack2}>{reason.label}</Text>
                  <Text style={fs10RegBlack2}>{remark}</Text>
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
