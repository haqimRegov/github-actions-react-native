import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CheckBox, CustomSpacer, CustomTextInput, RadioButtonGroup, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants/language";
import {
  borderBottomBlack21,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldGray8,
  fs16BoldBlack26,
  fs16RegBlack2,
  px,
  sh16,
  sh24,
  sh32,
  sh8,
  sw12,
  sw16,
  sw24,
  sw360,
  sw64,
} from "../../../../styles";

const { INVESTMENT } = Language.PAGE;

const RADIO_GROUP_1 = [INVESTMENT.QUESTION_1_OPTION_1, INVESTMENT.QUESTION_1_OPTION_2];

const age = 54;

interface InvestmentProps {
  data: IFundSales;
  setData: (data: IFundSales) => void;
}

export const Investment: FunctionComponent<InvestmentProps> = ({ data, setData }: InvestmentProps) => {
  const {
    fundPaymentMethod,
    investmentAmount,
    salesCharge,
    scheduledInvestment,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
    fund,
  } = data;

  const extractedSalesCharge: TypeLabelValue[] = [];
  const isFundingMethodCash = fundPaymentMethod === "Cash";

  const minSalesCharge = isFundingMethodCash ? fund.salesCharge.cash?.minimum! : fund.salesCharge.epf?.minimum!;
  const maxSalesCharge = isFundingMethodCash ? fund.salesCharge.cash?.maximum! : fund.salesCharge.epf?.maximum!;
  const maxSalesChargelabel = `${INVESTMENT.LABEL_MAX_SALES_CHARGE} ${maxSalesCharge}%`;

  for (let index = minSalesCharge || 0; index <= maxSalesCharge; index += isFundingMethodCash ? 0.5 : maxSalesCharge - minSalesCharge) {
    const element: TypeLabelValue = { label: `${index}`, value: `${index}` };
    extractedSalesCharge.push(element);
  }

  const handleFundingMethod = (option: string) => {
    const newData: IFundSales =
      option === "Cash"
        ? { ...data, fundPaymentMethod: "Cash" }
        : {
            ...data,
            scheduledInvestment: false,
            fundPaymentMethod: "EPF",
            scheduledSalesCharge: undefined,
            scheduledInvestmentAmount: undefined,
          };
    setData(newData);
  };

  const handleInvestmentAmount = (text: string) => {
    setData({ ...data, investmentAmount: text });
  };

  const handleSalesCharge = (value: string) => {
    setData({ ...data, salesCharge: parseInt(value, 10) });
  };

  const handleScheduled = () => {
    const newData = { ...data, scheduledSalesCharge: 0, scheduledInvestment: !scheduledInvestment };
    if (newData.scheduledInvestment === false) {
      delete newData.scheduledSalesCharge;
      delete newData.scheduledInvestmentAmount;
    }
    setData(newData);
  };

  const handleScheduledAmount = (value: string) => {
    setData({ ...data, scheduledInvestmentAmount: value });
  };

  const handleScheduledSalesCharge = (value: string) => {
    setData({ ...data, scheduledSalesCharge: parseInt(value, 10) });
  };

  const investmentAmountInput = (
    <CustomTextInput
      inputPrefix={fund.fundCurrency}
      label={INVESTMENT.LABEL_AMOUNT}
      onChangeText={handleInvestmentAmount}
      prefixStyle={fs16RegBlack2}
      spaceToLabel={sh8}
      value={investmentAmount}
    />
  );

  const scheduledCheckbox = (
    <Fragment>
      <CustomSpacer space={sh16} />
      <CheckBox
        label={INVESTMENT.LABEL_SCHEDULE_PAYMENT}
        labelStyle={fs12BoldBlack2}
        onPress={handleScheduled}
        spaceToLabel={sw12}
        style={px(sw16)}
        toggle={scheduledInvestment}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <View style={{ ...flexRow, ...px(sw24) }}>
        {fund.isEpf && age < 55 ? (
          <View>
            <TextSpaceArea spaceToBottom={sh16} style={{ ...fs16RegBlack2, width: sw360 }} text={INVESTMENT.LABEL_FUND} />
            <RadioButtonGroup options={RADIO_GROUP_1} space={sh24} selected={fundPaymentMethod} setSelected={handleFundingMethod} />
          </View>
        ) : (
          investmentAmountInput
        )}
        <CustomSpacer isHorizontal={true} space={sw64} />
        <CustomTextInput
          disabled={true}
          label={INVESTMENT.LABEL_CURRENCY}
          spaceToLabel={sh8}
          style={fs16BoldBlack26}
          value={fund.fundCurrency}
        />
      </View>
      <CustomSpacer space={sh32} />
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <View style={flexRow}>
          {fund.isEpf === true ? (
            <Fragment>
              <View>
                {investmentAmountInput}
                {fund.isScheduled === false || fundPaymentMethod === "EPF" ? null : scheduledCheckbox}
              </View>
              <CustomSpacer isHorizontal={true} space={sw64} />
            </Fragment>
          ) : null}
          <View>
            <AdvancedDropdown
              items={extractedSalesCharge}
              handleChange={handleSalesCharge}
              label={INVESTMENT.LABEL_SALES_CHARGE}
              value={`${salesCharge}`}
            />
            <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={maxSalesChargelabel} />
            {fund.isEpf === true || fund.isScheduled === false ? null : scheduledCheckbox}
          </View>
        </View>
        {scheduledInvestment === true ? (
          <Fragment>
            <CustomSpacer space={sh32} />
            <View style={flexRow}>
              <CustomTextInput
                inputPrefix={fund.fundCurrency}
                label={INVESTMENT.LABEL_SCHEDULE_PAYMENT}
                onChangeText={handleScheduledAmount}
                spaceToLabel={sh8}
                value={scheduledInvestmentAmount}
              />
              <CustomSpacer isHorizontal={true} space={sw64} />
              <View>
                <AdvancedDropdown
                  handleChange={handleScheduledSalesCharge}
                  items={extractedSalesCharge}
                  label={INVESTMENT.LABEL_SALES_CHARGE}
                  value={`${scheduledSalesCharge}`}
                />
                <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={maxSalesChargelabel} />
              </View>
            </View>
          </Fragment>
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
    </Fragment>
  );
};
