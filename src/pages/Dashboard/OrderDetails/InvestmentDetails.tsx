import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AdvanceTable, CustomSpacer } from "../../../components";
import { Language } from "../../../constants/language";
import {
  fs12RegBlue2,
  fs12RegBlue65,
  fsTransformNone,
  fsUppercase,
  px,
  sh16,
  sh32,
  sh8,
  sw112,
  sw120,
  sw152,
  sw16,
  sw196,
  sw60,
  sw72,
  sw73,
} from "../../../styles";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface InvestmentDetailsProps {
  data: IInvestmentDetails[];
}

export const InvestmentDetails: FunctionComponent<InvestmentDetailsProps> = ({ data }: InvestmentDetailsProps) => {
  const columns: ITableColumn[] = [
    {
      key: [{ key: "fundNumber" }, { key: "fundCode", textStyle: { ...fs12RegBlue65, ...fsUppercase } }],
      viewStyle: { width: sw72 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_FUND_CODE,
    },
    {
      key: [{ key: "fundName" }],
      viewStyle: { width: sw196 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_FUND_NAME,
    },
    {
      key: [
        { key: "fundGroup", textStyle: fsUppercase },
        { key: "fundType", textStyle: fs12RegBlue65 },
      ],
      viewStyle: { width: sw112 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_FUND_TYPE,
    },
    {
      key: [{ key: "utmc", textStyle: fsTransformNone }],
      viewStyle: { width: sw152 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_UTMC,
    },
    {
      key: [{ key: "type" }],
      viewStyle: { width: sw72 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_TYPE,
    },
    {
      key: [{ key: "investmentAmount" }],
      prefix: [{ key: "fundCurrency", targetKey: "investmentAmount", textStyle: { ...fs12RegBlue2, ...fsTransformNone } }],
      viewStyle: { width: sw120 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_INVESTMENT_AMOUNT,
    },
    {
      key: [{ key: "salesCharge" }],
      viewStyle: { width: sw73 },
      title: DASHBOARD_ORDER_DETAILS.LABEL_SALES,
      titleStyle: { width: sw60 },
    },
  ];
  return (
    <Fragment>
      <CustomSpacer space={sh16} />
      <View style={px(sw16)}>
        <AdvanceTable columns={columns} data={data} spaceToHeader={sh8} />
        <CustomSpacer space={sh32} />
      </View>
    </Fragment>
  );
};
