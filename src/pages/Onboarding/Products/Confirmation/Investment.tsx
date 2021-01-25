import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
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
import { ERROR } from "../../../../data/dictionary";
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
import { isAmount } from "../../../../utils";

const { INVESTMENT } = Language.PAGE;

interface InvestmentProps {
  data: IProductSales;
  setData: (data: IProductSales) => void;
  withEpf: boolean;
}

export const Investment: FunctionComponent<InvestmentProps> = ({ data, setData, withEpf }: InvestmentProps) => {
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

  const { isEpf, isScheduled, masterList } = fundDetails;
  const [filteredCurrency, setFilteredCurrency] = useState<IProductMasterList>(masterList[0]);
  const [cashSalesCharges, setCashSalesCharges] = useState<TypeLabelValue[]>([]);
  const [epfSalesCharges, setEpfSalesCharges] = useState<TypeLabelValue[]>([]);
  const { salesCharge, newSalesAmount, topUpAmount } = filteredCurrency;

  const fundingMethod = fundPaymentMethod === "Cash" ? "cash" : "epf";
  const radioColor = isEpf === "Yes" ? undefined : colorBlack._1;
  const fundingOption = [INVESTMENT.QUESTION_1_OPTION_1];
  if (isEpf === "Yes" && withEpf === true) {
    fundingOption.push(INVESTMENT.QUESTION_1_OPTION_2);
  }

  const setAmountError = (value?: string) => {
    setData({ ...data, investment: { ...investment, amountError: value } });
  };

  const setScheduledAmountError = (value?: string) => {
    setData({ ...data, investment: { ...investment, scheduledAmountError: value } });
  };
  const salesCharges = fundPaymentMethod === "Cash" ? cashSalesCharges : epfSalesCharges;
  const maxSalesChargelabel = `${INVESTMENT.LABEL_MAX_SALES_CHARGE} ${salesCharge[fundingMethod].max}%`;
  const minNewSalesAmount = newSalesAmount[fundingMethod].min;
  const minTopUpAmount = topUpAmount[fundingMethod].min;
  const minNewSalesAmountLabel = ` (${INVESTMENT.LABEL_MINIMUM} ${fundCurrency} ${minNewSalesAmount})`;
  const minTopUpAmountLabel = ` (${INVESTMENT.LABEL_MINIMUM} ${fundCurrency} ${minTopUpAmount})`;

  const masterClassKeys = Object.keys(masterClassList);

  const currencies =
    masterClassList !== undefined
      ? masterClassList[fundClass!].map((value) => {
          return { label: value.currency, value: value.currency };
        })
      : [];

  const classes =
    masterClassList !== undefined
      ? masterClassKeys.map((value) => {
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
    if (isAmount(value) === false) {
      return ERROR.INVESTMENT_INVALID_AMOUNT;
    }
    if (parseInt(value, 10) > parseInt(filteredCurrency[amountType][fundingMethod].max, 10)) {
      return ERROR.INVESTMENT_MAX_AMOUNT;
    }
    if (parseInt(value, 10) < parseInt(filteredCurrency[amountType][fundingMethod].min, 10)) {
      return ERROR.INVESTMENT_MIN_AMOUNT;
    }
    return undefined;
  };

  const checkInvestmentAmount = () => {
    setAmountError(validateAmount(investmentAmount, "newSalesAmount"));
  };

  const checkScheduledInvestmentAmount = () => {
    setScheduledAmountError(validateAmount(scheduledInvestmentAmount!, "topUpAmount"));
  };

  const handleCurrency = (value: string) => {
    setData({ ...data, investment: { ...investment, fundCurrency: value } });
  };

  const handleClass = (value: string) => {
    const newCurrency = masterClassList[value][0].currency;
    setFilteredCurrency(masterClassList[value][0]);
    setData({ ...data, investment: { ...investment, fundClass: value, fundCurrency: newCurrency } });
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
    }
    setScheduledAmountError(undefined);
    setData(newData);
  };

  const handleScheduledAmount = (value: string) => {
    setData({ ...data, investment: { ...investment, scheduledInvestmentAmount: value } });
  };

  const handleScheduledSalesCharge = (value: string) => {
    setData({ ...data, investment: { ...investment, scheduledSalesCharge: value } });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted === true) {
      const cashSalesChargesTmp: TypeLabelValue[] = [];
      const epfSalesChargesTmp: TypeLabelValue[] = [];
      const dirtyData =
        parseFloat(salesCharge.cash.min) > parseFloat(salesCharge.cash.max) ||
        salesCharge.cash.min === null ||
        salesCharge.cash.max ||
        (isEpf === "Yes" && salesCharge.epf.min === null) ||
        salesCharge.epf.max === null ||
        (epfSalesCharges.length === 0 && parseFloat(salesCharge.epf.min) > parseFloat(salesCharge.epf.max));
      if (dirtyData === true) {
        Alert.alert(
          "There seems to be an issue in the Fund (e.g Sales Charge Minimum is greater than Maximum). If you wish to proceed, please use another fund. Otherwise, please contact support.",
        );
      } else {
        if (cashSalesCharges.length === 0 && salesCharge && salesCharge.cash && salesCharge.cash.min && salesCharge.cash.max) {
          for (
            let index = parseFloat(salesCharge.cash.min);
            index <= parseFloat(salesCharge.cash.max);
            index += fundPaymentMethod === "Cash" ? 0.5 : parseFloat(salesCharge.cash.min) - parseFloat(salesCharge.cash.max)
          ) {
            const element: TypeLabelValue = { label: `${index}`, value: `${index}` };
            cashSalesChargesTmp.push(element);
          }
          setCashSalesCharges(cashSalesChargesTmp);
        }
        if (
          isEpf === "Yes" &&
          epfSalesCharges.length === 0 &&
          salesCharge &&
          salesCharge.epf &&
          salesCharge.epf.min &&
          salesCharge.epf.max
        ) {
          for (
            let index = parseFloat(salesCharge.epf.min);
            index <= parseFloat(salesCharge.epf.max);
            index += fundPaymentMethod === "Cash" ? 0.5 : parseFloat(salesCharge.epf.min) - parseFloat(salesCharge.epf.max)
          ) {
            const element: TypeLabelValue = { label: `${index}`, value: `${index}` };
            epfSalesChargesTmp.push(element);
          }
          setEpfSalesCharges(epfSalesChargesTmp);
        }
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {masterClassList !== undefined && masterClassKeys.length > 0 && "null" in masterClassList === false ? (
        <Fragment>
          <View style={{ ...flexRow, ...px(sw24) }}>
            {masterClassKeys.length > 1 || "null" in masterClassList === false ? (
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
            {isScheduled === "Yes" && fundPaymentMethod === "Cash" ? (
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
              items={salesCharges}
              handleChange={handleSalesCharge}
              label={INVESTMENT.LABEL_SALES_CHARGE}
              value={investmentSalesCharge}
            />
            <TextSpaceArea spaceToTop={sh8} style={{ ...fs12SemiBoldGray8, ...px(sw16) }} text={maxSalesChargelabel} />
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
                  inputPrefix={fundCurrency}
                  onBlur={checkScheduledInvestmentAmount}
                  onChangeText={handleScheduledAmount}
                  value={scheduledInvestmentAmount}
                />
                <CustomSpacer space={sh8} />
                <View style={{ ...px(sw20) }}>
                  <Text style={{ ...fs12SemiBoldGray8, letterSpacing: -sw02 }}>{INVESTMENT.HINT_FPX}</Text>
                  <Text style={{ ...fs12SemiBoldGray8, letterSpacing: -sw02 }}>{INVESTMENT.HINT_DDA}</Text>
                </View>
              </View>
              <CustomSpacer isHorizontal={true} space={sw64} />
              <View>
                <AdvancedDropdown
                  handleChange={handleScheduledSalesCharge}
                  items={salesCharges}
                  label={INVESTMENT.LABEL_RECURRING_SALES_CHARGE}
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
