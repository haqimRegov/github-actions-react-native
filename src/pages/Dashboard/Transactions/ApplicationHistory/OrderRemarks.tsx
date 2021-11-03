import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer } from "../../../../components";
import { Language } from "../../../../constants/language";
import { IcoMoon } from "../../../../icons";
import {
  centerHorizontal,
  centerVertical,
  colorRed,
  colorWhite,
  flexRow,
  flexWrap,
  fs10BoldGray5,
  fs10RegGray5,
  fs16BoldBlack2,
  px,
  sh12,
  sh13,
  sh16,
  sh4,
  sw12,
  sw16,
  sw24,
  sw296,
  sw36,
  sw716,
} from "../../../../styles";

const { DASHBOARD_HOME } = Language.PAGE;

declare interface OrderRemarksProps {
  remarks: IDashboardRemark[];
  remarkTitle?: string;
  showIcon?: boolean;
  status: OrderStatusType | IEDDStatusType;
}

export const OrderRemarks: FunctionComponent<OrderRemarksProps> = ({ remarks, remarkTitle, showIcon, status }: OrderRemarksProps) => {
  const title =
    status === "BR - Rerouted" || status === "HQ - Rerouted"
      ? DASHBOARD_HOME.LABEL_REASONS_REROUTED
      : DASHBOARD_HOME.LABEL_REASONS_REJECTED;
  const defaultTitle = remarkTitle !== undefined ? remarkTitle : title;

  return (
    <Fragment>
      <View style={{ backgroundColor: colorWhite._1, borderBottomLeftRadius: sw12, borderBottomRightRadius: sw12 }}>
        <CustomSpacer space={sh16} />
        <View style={{ ...px(sw16) }}>
          <Text style={fs16BoldBlack2}>{defaultTitle}</Text>
          <CustomSpacer space={sh4} />
          <View style={{ ...flexWrap, width: sw716, ...flexRow }}>
            {remarks.map(({ label, remark }: IDashboardRemark, index) => {
              return (
                <Fragment key={index}>
                  {/* {index % 2 !== 0 && index !== 0 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null} */}
                  <View style={{ ...flexRow, ...centerVertical, marginBottom: sh16 }}>
                    {showIcon !== false ? (
                      <Fragment>
                        <View style={centerHorizontal}>
                          <IcoMoon color={colorRed._2} name="error-octagon" size={sw24} />
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw12} />
                      </Fragment>
                    ) : null}
                    <View style={{ ...centerHorizontal, width: sw296 }}>
                      <Text style={{ ...fs10BoldGray5, lineHeight: sh13 }}>{label}</Text>
                      {remark.length > 0
                        ? remark.map((text: string, remarkIndex: number) => {
                            const updatedText = remarkIndex !== 0 ? `• ${text}` : text;
                            return (
                              <Text key={remarkIndex} style={{ ...fs10RegGray5, lineHeight: sh12 }}>
                                {updatedText}
                              </Text>
                            );
                          })
                        : null}
                    </View>
                  </View>
                  {index % 2 === 0 ? <CustomSpacer isHorizontal={true} space={sw36} /> : null}
                </Fragment>
              );
            })}
          </View>
        </View>
      </View>
    </Fragment>
  );
};
