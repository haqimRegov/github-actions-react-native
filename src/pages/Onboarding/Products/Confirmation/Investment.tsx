import React, { Fragment, FunctionComponent } from "react";
import { Alert, Text, View } from "react-native";

import {
  AdvancedDropdown,
  CheckBox,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  RadioButtonGroup,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants/language";
import { DICTIONARY_RECURRING_CURRENCY, DICTIONARY_RECURRING_MINIMUM_FPX, ERROR } from "../../../../data/dictionary";
import {
  borderBottomBlack21,
  centerVertical,
  colorBlack,
  flexRow,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs12SemiBoldGray8,
  fs16BoldBlack2,
  fs16RegBlack2,
  px,
  sh12,
  sh16,
  sh24,
  sh8,
  sw02,
  sw12,
  sw16,
  sw20,
  sw24,
  sw360,
  sw64,
} from "../../../../styles";
import { formatAmount, isAmount, parseAmount } from "../../../../utils";

const { INVESTMENT } = Language.PAGE;

interface InvestmentProps {
  accountType: TypeAccountChoices;
  data: IProductSales;
  setData: (data: IProductSales) => void;
  withEpf: boolean;
}

export const Investment: FunctionComponent<InvestmentProps> = ({ accountType, data, setData, withEpf }: InvestmentProps) => {
  const { investment, fundDetails, masterClassList } = data;

  const {
    amountError,
    fundClass,
    fundCurrency,
    fundPaymentMethod,
    investmentAmount,
    investmentSalesCharge,
    scheduledAmountError,
    scheduledInvestment,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
  } = investment;

  const { isEpf, isScheduled } = fundDetails;

  const fundingMethod = fundPaymentMethod === "Cash" ? "cash" : "epf";
  const radioColor = isEpf === "Yes" ? undefined : colorBlack._1;
  const fundingOption = fundDetails.isEpfOnly === "Yes" ? [INVESTMENT.QUESTION_1_OPTION_2] : [INVESTMENT.QUESTION_1_OPTION_1];
  if (isEpf === "Yes" && withEpf === true && accountType === "Individual" && fundDetails.isEpfOnly !== "Yes") {
    fundingOption.push(INVESTMENT.QUESTION_1_OPTION_2);
  }

  const classCurrencyIndex = masterClassList[fundClass!].findIndex((test) => test.currency === fundCurrency);
  const { newSalesAmount, salesCharge, topUpAmount } = masterClassList[fundClass!][classCurrencyIndex];

  const minSalesCharge = classCurrencyIndex !== -1 ? parseFloat(salesCharge[fundPaymentMethod.toLowerCase()].min) : parseFloat("NaN");
  const maxSalesCharge = classCurrencyIndex !== -1 ? parseFloat(salesCharge[fundPaymentMethod.toLowerCase()].max) : parseFloat("NaN");

  const salesChargeRange: TypeLabelValue[] = [];

  if (minSalesCharge % 0.5 !== 0 || maxSalesCharge % 0.5 !== 0 || minSalesCharge > maxSalesCharge) {
    Alert.alert(
      `There seems to be an issue with ${fundDetails.fundName} (ID: ${fundDetails.fundId}) \n\n If you wish to proceed, please use another fund. Otherwise, please contact support.`,
    );
  } else {
    for (let index = minSalesCharge; index <= maxSalesCharge; index += 0.5) {
      const element: TypeLabelValue = { label: `${index}`, value: `${index}` };
      salesChargeRange.push(element);
    }
  }
  const maxSalesChargeLabel = `${INVESTMENT.LABEL_MAX_SALES_CHARGE} ${maxSalesCharge}%`;

  const minNewSalesAmount = formatAmount(newSalesAmount[fundingMethod].min);
  const minTopUpAmount = formatAmount(topUpAmount[fundingMethod].min);
  const minNewSalesAmountLabel = ` (${INVESTMENT.LABEL_MINIMUM} ${fundCurrency} ${minNewSalesAmount})`;
  const minTopUpAmountLabel = ` (${INVESTMENT.LABEL_MINIMUM} ${DICTIONARY_RECURRING_CURRENCY} ${minTopUpAmount})`;

  const currencies =
    masterClassList !== undefined
      ? masterClassList[fundClass!].map((value) => {
          return { label: value.currency, value: value.currency };
        })
      : [];

  const classes =
    masterClassList !== undefined
      ? Object.keys(masterClassList).map((value) => {
          return { label: value, value: value };
        })
      : [];

  const handleFundingMethod = (option: string) => {
    const newData: IProductSales =
      option === "Cash"
        ? { ...data, investment: { ...investment, investmentSalesCharge: "", fundPaymentMethod: "Cash" } }
        : {
            ...data,
            investment: {
              ...investment,
              investmentSalesCharge: "",
              scheduledInvestment: false,
              fundPaymentMethod: "EPF",
              scheduledSalesCharge: undefined,
              scheduledInvestmentAmount: undefined,
            },
          };
    setData(newData);
  };

  const handleInvestmentAmount = (value: string) => {
    setData({ ...data, investment: { ...investment, investmentAmount: value } });
  };

  const validateAmount = (value: string, amountType: "newSalesAmount" | "topUpAmount") => {
    const cleanValue = value.replace(/[,]/g, "");
    const amount: IAmountValueError = { value: cleanValue, error: undefined };
    if (isAmount(cleanValue) === false) {
      return { ...amount, error: ERROR.INVESTMENT_INVALID_AMOUNT };
    }
    if (parseAmount(cleanValue) > parseFloat(masterClassList[fundClass!][classCurrencyIndex][amountType][fundingMethod].max)) {
      return { ...amount, error: ERROR.INVESTMENT_MAX_AMOUNT };
    }
    if (parseAmount(cleanValue) < parseFloat(masterClassList[fundClass!][classCurrencyIndex][amountType][fundingMethod].min)) {
      return { ...amount, error: ERROR.INVESTMENT_MIN_AMOUNT };
    }
    return { ...amount, value: formatAmount(cleanValue) };
  };

  const setAmountError = (amount: IAmountValueError) => {
    setData({ ...data, investment: { ...investment, investmentAmount: amount.value, amountError: amount.error } });
  };

  const setScheduledAmountError = (amount: IAmountValueError) => {
    setData({ ...data, investment: { ...investment, scheduledInvestmentAmount: amount.value, scheduledAmountError: amount.error } });
  };

  const checkInvestmentAmount = () => {
    setAmountError(validateAmount(investmentAmount, "newSalesAmount"));
  };

  const checkScheduledInvestmentAmount = () => {
    setScheduledAmountError(validateAmount(scheduledInvestmentAmount!, "topUpAmount"));
  };

  const handleCurrency = (value: string) => {
    const newClassCurrencyIndex = masterClassList[fundClass!].findIndex((test) => test.currency === value);
    const newFundId = masterClassList[fundClass!][newClassCurrencyIndex].fundId;
    setData({
      ...data,
      investment: {
        ...investment,
        fundCurrency: value,
        fundId: newFundId,
        scheduledInvestment: false,
        scheduledSalesCharge: "",
        scheduledInvestmentAmount: "",
      },
    });
  };

  const handleClass = (value: string) => {
    const newCurrency = masterClassList[value][0].currency;
    const newFundId = masterClassList[value][0].fundId;
    setData({ ...data, investment: { ...investment, fundClass: value, fundCurrency: newCurrency, fundId: newFundId } });
  };

  const handleSalesCharge = (value: string) => {
    setData({ ...data, investment: { ...investment, investmentSalesCharge: value } });
  };

  const handleScheduled = () => {
    const newData: IProductSales = {
      ...data,
      investment: { ...investment, scheduledSalesCharge: "", scheduledInvestmentAmount: "", scheduledInvestment: !scheduledInvestment },
    };
    if (newData.investment.scheduledInvestment === false) {
      newData.investment.scheduledSalesCharge = "";
      newData.investment.scheduledInvestmentAmount = "";
      newData.investment.scheduledAmountError = undefined;
    }
    setData(newData);
  };

  const handleScheduledAmount = (value: string) => {
    setData({ ...data, investment: { ...investment, scheduledInvestmentAmount: value } });
  };

  const handleScheduledSalesCharge = (value: string) => {
    setData({ ...data, investment: { ...investment, scheduledSalesCharge: value } });
  };

  const showMulti = currencies.length > 1 || classes.length > 1 || (classes.length === 1 && classes[0].label !== "noClass");
  let minimumFpx = DICTIONARY_RECURRING_MINIMUM_FPX.ut;
  switch (fundDetails.fundType) {
    case "PRS":
      minimumFpx = DICTIONARY_RECURRING_MINIMUM_FPX.prs;
      break;
    case "AMP":
      minimumFpx = DICTIONARY_RECURRING_MINIMUM_FPX.amp;
      break;
    default:
      break;
  }
  return (
    <Fragment>
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <TextSpaceArea style={{ ...fs12BoldBlack2, width: sw360 }} text={INVESTMENT.LABEL_FUNDING_OPTION} />
          <RadioButtonGroup
            options={fundingOption}
            space={sh16}
            selected={fundPaymentMethod}
            selectedColor={radioColor}
            setSelected={handleFundingMethod}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        {masterClassList !== undefined && "" in masterClassList === true && masterClassList[""].length > 1 ? (
          <AdvancedDropdown handleChange={handleCurrency} items={currencies} label={INVESTMENT.LABEL_CURRENCY} value={fundCurrency!} />
        ) : null}
        {masterClassList !== undefined && "" in masterClassList === true && masterClassList[""].length === 1 ? (
          <LabeledTitle
            label={INVESTMENT.LABEL_CURRENCY}
            title={fundCurrency!}
            titleStyle={{ ...fs16BoldBlack2, ...px(sw16) }}
            style={{ width: sw360 }}
          />
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
      {showMulti === true ? (
        <Fragment>
          <View style={{ ...flexRow, ...px(sw24) }}>
            {classes.length > 1 || (classes.length === 1 && classes[0].label !== "noClass") ? (
              <Fragment>
                <AdvancedDropdown handleChange={handleClass} items={classes} label={INVESTMENT.LABEL_CLASS} value={fundClass!} />
                <CustomSpacer isHorizontal={true} space={sw64} />
              </Fragment>
            ) : null}
            <AdvancedDropdown handleChange={handleCurrency} items={currencies} label={INVESTMENT.LABEL_CURRENCY} value={fundCurrency!} />
          </View>
          <CustomSpacer space={sh24} />
        </Fragment>
      ) : null}
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <View style={flexRow}>
          <View>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs12BoldBlack2}>{INVESTMENT.LABEL_AMOUNT}</Text>
              <Text style={fs12RegBlack2}>{minNewSalesAmountLabel}</Text>
            </View>
            <CustomTextInput
              error={amountError}
              inputPrefix={fundCurrency}
              keyboardType="numeric"
              onBlur={checkInvestmentAmount}
              onChangeText={handleInvestmentAmount}
              prefixStyle={fs16RegBlack2}
              spaceToBottom={isScheduled === "Yes" ? sh12 : undefined}
              value={investmentAmount}
            />
            {isScheduled === "Yes" && fundPaymentMethod === "Cash" && fundCurrency === "MYR" ? (
              <CheckBox
                label={INVESTMENT.LABEL_RECURRING}
                labelStyle={fs12BoldBlack2}
                onPress={handleScheduled}
                spaceToLabel={sw12}
                style={px(sw16)}
                toggle={scheduledInvestment}
              />
            ) : null}
          </View>
          <CustomSpacer isHorizontal={true} space={sw64} />
          <View>
            <AdvancedDropdown
              items={salesChargeRange}
              handleChange={handleSalesCharge}
              label={INVESTMENT.LABEL_SALES_CHARGE}
              value={investmentSalesCharge}
            />
            <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={maxSalesChargeLabel} />
          </View>
        </View>
        {scheduledInvestment === true ? (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={flexRow}>
              <View>
                <View style={{ ...flexRow, ...centerVertical }}>
                  <Text style={fs12BoldBlack2}>{INVESTMENT.LABEL_AMOUNT}</Text>
                  <Text style={fs12RegBlack2}>{minTopUpAmountLabel}</Text>
                </View>
                <CustomTextInput
                  error={scheduledAmountError}
                  inputPrefix={DICTIONARY_RECURRING_CURRENCY}
                  onBlur={checkScheduledInvestmentAmount}
                  onChangeText={handleScheduledAmount}
                  value={scheduledInvestmentAmount}
                />
                <CustomSpacer space={sh8} />
                <View style={{ ...px(sw20) }}>
                  <Text style={{ ...fs12SemiBoldGray8, letterSpacing: -sw02 }}>{`${INVESTMENT.HINT_FPX} ${minimumFpx}`}</Text>
                  <Text style={{ ...fs12SemiBoldGray8, letterSpacing: -sw02 }}>{INVESTMENT.HINT_DDA}</Text>
                </View>
              </View>
              <CustomSpacer isHorizontal={true} space={sw64} />
              <View>
                <AdvancedDropdown
                  handleChange={handleScheduledSalesCharge}
                  items={salesChargeRange}
                  label={INVESTMENT.LABEL_RECURRING_SALES_CHARGE}
                  value={`${scheduledSalesCharge}`}
                />
                <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={maxSalesChargeLabel} />
              </View>
            </View>
          </Fragment>
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
    </Fragment>
  );
};
