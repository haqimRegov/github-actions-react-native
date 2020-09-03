import React, { Fragment } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, LinkTextGroup, LinkTextProps } from "..";
import { IFundSummary } from "../../../types/fund-summary";
import { Language } from "../../constants/language";
import {
  alignItemsEnd,
  centerHorizontal,
  colorGray,
  colorWhite,
  flexRow,
  fs10BoldBlack2,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  py,
  sh16,
  sh24,
  sh29,
  sh8,
  sh80,
  sh96,
  shadowBlue5,
  sw16,
  sw24,
  sw8,
  sw832,
} from "../../styles";
import { CardV2 } from "./CardV2";

const { PAYMENT } = Language.PAGE;

export interface ICardV3Props {
  amount?: number;
  funds: IFundSummary[];
  heading: string;
  middle?: string;
  rightContent: string;
  rightHeading?: string;
  style?: ViewStyle;
  title: string;
}

interface rowData {
  label: string;
  value: string;
}

export const CardV3 = ({ amount, funds, heading, rightContent, rightHeading, style, title }: ICardV3Props) => {
  const defaultAmount = amount !== undefined ? amount.toString() : "";
  const links: LinkTextProps[] = [
    {
      text: rightContent,
      style: { ...fs16RegBlack2, textTransform: "none" },
    },
    {
      text: defaultAmount,
      style: { ...fs16BoldBlack2, textTransform: "none" },
    },
  ];
  const cardHeaderStyle: ViewStyle = {
    ...centerHorizontal,
    ...shadowBlue5,
    ...flexRow,
    ...px(sw24),
    ...py(sh24),
    ...style,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh96,
    width: sw832,
    zIndex: 1,
  };
  return (
    <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
      {/* <CustomSpacer space={sh96} /> */}
      <View style={cardHeaderStyle}>
        <View>
          <Text style={fs24BoldBlack2}>{title}</Text>
          <Text style={fs12BoldBlack2}>{heading}</Text>
        </View>
        <CustomFlexSpacer />
        <View style={alignItemsEnd}>
          <Text style={fs12RegBlack2}>{rightHeading}</Text>
          <CustomSpacer space={sh8} />
          <LinkTextGroup links={links} divider={<Text> </Text>} />
        </View>
      </View>
      {funds.map((fund: IFundSummary, fundIndex: number) => {
        const defaultFundAmount = fund.amount !== undefined ? fund.amount.toString() : "";
        const dataRow1: rowData[] = [
          {
            label: PAYMENT.LABEL_ACCOUNT_TYPE,
            value: fund.accountFund,
          },
          {
            label: PAYMENT.LABEL_FUND_TYPE,
            value: fund.fundType,
          },
          {
            label: PAYMENT.LABEL_SHARIAH,
            value: fund.shariah,
          },
        ];
        const dataRow2: rowData[] = [
          {
            label: PAYMENT.LABEL_EPF,
            value: fund.epf,
          },
          {
            label: PAYMENT.LABEL_ACCOUNT_TYPE,
            value: fund.accountType,
          },
          {
            label: PAYMENT.LABEL_CHANNEL,
            value: fund.channel,
          },
        ];
        const dataRow3: rowData[] = [
          {
            label: PAYMENT.LABEL_CURRENCY,
            value: fund.currency,
          },
          {
            label: PAYMENT.LABEL_SALES_CHARGE,
            value: fund.salesCharge,
          },
        ];
        const fundLinks: LinkTextProps[] = [
          {
            text: rightContent,
            style: { ...fs16RegBlack2, textTransform: "none" },
          },
          {
            text: defaultFundAmount,
            style: { ...fs16BoldBlack2, textTransform: "none" },
          },
        ];
        const fundHeaderStyle: ViewStyle = {
          ...centerHorizontal,
          ...flexRow,
          ...px(sw24),
          backgroundColor: colorGray._5,
          height: sh80,
          ...style,
        };
        return (
          <Fragment key={fundIndex}>
            <View style={fundHeaderStyle}>
              <View>
                <CustomSpacer space={sh16} />
                <Text style={fs24BoldBlack2}>{fund.fundName}</Text>
                <Text style={fs12BoldBlack2}>{fund.fundIssuer}</Text>
              </View>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <Text style={{ ...fs10BoldBlack2, paddingTop: sh29 }}>{PAYMENT.LABEL_ONE_TIME}</Text>
              <CustomFlexSpacer />
              <View>
                <CustomSpacer space={sh24} />
                <LinkTextGroup links={fundLinks} divider={<Text> </Text>} />
              </View>
            </View>
            <CustomSpacer space={sh16} />
            <CardV2 data={dataRow1} labelStyle={fs12BoldBlack2} />
            <CustomSpacer space={sh16} />
            <CardV2 data={dataRow2} labelStyle={fs12BoldBlack2} />
            <CustomSpacer space={sh16} />
            <CardV2 data={dataRow3} labelStyle={fs12BoldBlack2} />
            <CustomSpacer space={sh16} />
          </Fragment>
        );
      })}
    </View>
  );
};
