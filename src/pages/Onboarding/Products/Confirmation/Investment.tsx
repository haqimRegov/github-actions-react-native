import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import {
  CheckBox,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  NewDropdown,
  NumberPicker,
  RadioButtonGroup,
  TextSpaceArea,
} from "../../../../components";
import { Language } from "../../../../constants/language";
import { DICTIONARY_RECURRING_CURRENCY, DICTIONARY_RECURRING_MINIMUM_FPX, ERROR } from "../../../../data/dictionary";
import {
  autoWidth,
  borderBottomBlue5,
  borderBottomGray2,
  centerVertical,
  colorBlack,
  colorBlue,
  colorWhite,
  flexRow,
  fs12BoldBlue8,
  fs12BoldGray6,
  fs12RegGray5,
  fs12RegGray6,
  fs12RegWhite1,
  fs16BoldBlack2,
  px,
  sh12,
  sh24,
  sh4,
  sh8,
  sw116,
  sw12,
  sw152,
  sw16,
  sw24,
  sw360,
  sw64,
} from "../../../../styles";
import { formatAmount, isAmount, parseAmount } from "../../../../utils";

const { INVESTMENT } = Language.PAGE;

interface InvestmentProps {
  accountType: TypeAccountChoices;
  agentCategory: TypeAgentCategory;
  data: IProductSales;
  handleScrollToFund?: () => void;
  setData: (data: IProductSales) => void;
  withEpf: boolean;
}

export const Investment: FunctionComponent<InvestmentProps> = ({
  accountType,
  agentCategory,
  data,
  handleScrollToFund,
  setData,
  withEpf,
}: InvestmentProps) => {
  const { allowEpf, investment, fundDetails, masterClassList } = data;

  const {
    amountError,
    fundClass,
    fundCurrency,
    fundPaymentMethod,
    investmentAmount,
    investmentSalesCharge,
    investmentSalesChargeError,
    scheduledAmountError,
    scheduledInvestment,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
    scheduledSalesChargeError,
  } = investment;

  const { isEpf, isScheduled } = fundDetails;

  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const isRecurring = isScheduled === "Yes" && fundPaymentMethod === "Cash" && fundCurrency === "MYR";
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
  const salesChargeDifference = maxSalesCharge - minSalesCharge;
  const salesChargeInterval = agentCategory === "external" && fundPaymentMethod === "EPF" ? salesChargeDifference : undefined;

  const salesChargeHintText =
    salesChargeDifference === 0
      ? `${INVESTMENT.LABEL_FIXED_SALES_CHARGE} ${formatAmount(maxSalesCharge)}%`
      : `${INVESTMENT.LABEL_MAX_SALES_CHARGE} ${formatAmount(maxSalesCharge)}%`;

  const innerContainer: ViewStyle = salesChargeDifference === 0 ? { backgroundColor: colorWhite._1 } : {};

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
    const currentSalesCharge = option === fundPaymentMethod ? investmentSalesCharge : "";
    const newData: IProductSales =
      option === "Cash"
        ? {
            ...data,
            investment: {
              ...investment,
              fundPaymentMethod: "Cash",
              investmentSalesCharge: currentSalesCharge,
              investmentSalesChargeError: undefined,
              scheduledSalesChargeError: undefined,
            },
          }
        : {
            ...data,
            investment: {
              ...investment,
              fundPaymentMethod: "EPF",
              investmentSalesCharge: currentSalesCharge,
              investmentSalesChargeError: undefined,
              scheduledInvestment: false,
              scheduledSalesCharge: undefined,
              scheduledSalesChargeError: undefined,
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
        amountError: undefined,
        fundCurrency: value,
        fundId: newFundId,
        investmentAmount: "",
        scheduledInvestment: false,
        scheduledSalesCharge: "",
        scheduledInvestmentAmount: "",
        scheduledAmountError: undefined,
      },
    });
  };

  const handleClass = (value: string) => {
    const newCurrency = masterClassList[value][0].currency;
    const newFundId = masterClassList[value][0].fundId;
    setData({
      ...data,
      investment: {
        ...investment,
        amountError: undefined,
        fundClass: value,
        fundCurrency: newCurrency,
        fundId: newFundId,
        investmentAmount: "",
      },
    });
  };

  const handleSalesCharge = (value: string) => {
    setData({ ...data, investment: { ...investment, investmentSalesCharge: value } });
  };

  const handleScheduledSalesCharge = (value: string) => {
    setData({ ...data, investment: { ...investment, scheduledSalesCharge: value } });
  };

  const validateSalesCharge = (value: string) => {
    let errorMessage: string | undefined;
    const salesChargeInvalid = isAmount(value) === false;
    if (agentCategory === "internal") {
      if (parseAmount(value) < minSalesCharge || parseAmount(value) > maxSalesCharge || salesChargeInvalid === true) {
        errorMessage = INVESTMENT.ERROR_RANGE;
      }
    } else if (agentCategory === "external" && fundPaymentMethod === "Cash") {
      if (parseAmount(value) % 0.5 !== 0) {
        errorMessage = INVESTMENT.ERROR_INCREMENT;
      } else if (parseAmount(value) < minSalesCharge || parseAmount(value) > maxSalesCharge || salesChargeInvalid === true) {
        errorMessage = INVESTMENT.ERROR_RANGE;
      }
    } else if (agentCategory === "external" && fundPaymentMethod === "EPF") {
      if (parseAmount(value) % 0.5 !== 0) {
        errorMessage = INVESTMENT.ERROR_INCREMENT;
      } else if ((parseAmount(value) > minSalesCharge && parseAmount(value) < maxSalesCharge) || salesChargeInvalid === true) {
        errorMessage = INVESTMENT.ERROR_ALLOWED;
      } else if (parseAmount(value) < minSalesCharge || parseAmount(value) > maxSalesCharge) {
        errorMessage = `${INVESTMENT.ERROR_PLEASE} ${formatAmount(minSalesCharge)}% or ${formatAmount(maxSalesCharge)}%`;
      }
    }
    return errorMessage;
  };

  const onBlurSalesCharge = () => {
    const errorMessage = validateSalesCharge(investmentSalesCharge);
    const formattedSalesCharge = errorMessage !== undefined ? investmentSalesCharge : formatAmount(investmentSalesCharge);
    setData({
      ...data,
      investment: { ...investment, investmentSalesCharge: formattedSalesCharge, investmentSalesChargeError: errorMessage },
    });
  };

  const onBlurScheduledSalesCharge = () => {
    if (scheduledSalesCharge !== undefined) {
      const errorMessage = validateSalesCharge(scheduledSalesCharge);
      const formattedSalesCharge = errorMessage !== undefined ? scheduledSalesCharge : formatAmount(scheduledSalesCharge);
      setData({
        ...data,
        investment: { ...investment, scheduledSalesCharge: formattedSalesCharge, scheduledSalesChargeError: errorMessage },
      });
    }
  };

  const handleScheduled = () => {
    const newData: IProductSales = {
      ...data,
      investment: {
        ...investment,
        scheduledSalesCharge: salesChargeDifference === 0 ? formatAmount(maxSalesCharge) : "",
        scheduledInvestmentAmount: "",
        scheduledInvestment: !scheduledInvestment,
      },
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

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const handleScroll = () => {
    setTooltipVisible(false);
    if (handleScrollToFund !== undefined) {
      handleScrollToFund();
    }
  };

  const multiClass = classes.length > 1 || (classes.length === 1 && classes[0].label !== "No Class");
  const epfIndex = fundingOption.findIndex((eachFundingOption) => eachFundingOption === INVESTMENT.QUESTION_1_OPTION_2);
  const disableEpf = allowEpf !== undefined && allowEpf === false ? [epfIndex] : [];

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

  const checkSpaceToLabel = fundingOption.length > 1 ? sh8 : 0;

  // same sales charge are not being saved on initial render due to redux state issue for multiple funds hence we are only saving it when any data in the investment details has been updated
  useEffect(() => {
    if (salesChargeDifference === 0 && investmentSalesCharge === "") {
      handleSalesCharge(formatAmount(maxSalesCharge));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const initialSalesCharge = salesChargeDifference === 0 && investmentSalesCharge === "" ? `${maxSalesCharge}` : investmentSalesCharge;
  const initialRecurringSalesCharge =
    salesChargeDifference === 0 && scheduledInvestment === true && scheduledSalesCharge === "" ? `${maxSalesCharge}` : scheduledSalesCharge;

  return (
    <Fragment>
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <TextSpaceArea style={{ width: sw360 }} spaceToBottom={checkSpaceToLabel} text={INVESTMENT.LABEL_FUNDING_OPTION} />
          {fundingOption.length > 1 ? (
            <RadioButtonGroup
              direction="row"
              disabledIndex={disableEpf}
              disabledTooltip={true}
              labelStyle={autoWidth}
              options={fundingOption}
              optionStyle={{ width: sw116 }}
              space={sw64}
              selected={fundPaymentMethod}
              selectedColor={radioColor}
              setSelected={handleFundingMethod}
              tooltipContent={
                <View>
                  <Text style={fs12RegWhite1}>{INVESTMENT.EPF_DISABLED}</Text>
                  <CustomSpacer space={sh12} />
                  <TouchableWithoutFeedback onPress={handleScroll}>
                    <View style={{ ...borderBottomBlue5, borderBottomColor: colorBlue._8, width: sw152 }}>
                      <Text style={fs12BoldBlue8}>{INVESTMENT.EPF_DISABLED_SUB}</Text>
                      <CustomSpacer space={sh4} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              }
              showTooltip={tooltipVisible}
              setShowTooltip={handleTooltip}
            />
          ) : (
            <Text style={fs16BoldBlack2}>{fundingOption[0]}</Text>
          )}
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        {multiClass === false && currencies.length > 1 ? (
          <NewDropdown handleChange={handleCurrency} items={currencies} label={INVESTMENT.LABEL_CURRENCY} value={fundCurrency!} />
        ) : null}
        {multiClass === false && currencies.length === 1 ? (
          <LabeledTitle label={INVESTMENT.LABEL_CURRENCY} title={fundCurrency} spaceToLabel={checkSpaceToLabel} style={{ width: sw360 }} />
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
      {multiClass === true ? (
        <Fragment>
          <View style={{ ...flexRow, ...px(sw24) }}>
            <NewDropdown handleChange={handleClass} items={classes} label={INVESTMENT.LABEL_CLASS} value={fundClass!} />
            <CustomSpacer isHorizontal={true} space={sw64} />
            <NewDropdown handleChange={handleCurrency} items={currencies} label={INVESTMENT.LABEL_CURRENCY} value={fundCurrency!} />
          </View>
          <CustomSpacer space={sh24} />
        </Fragment>
      ) : null}
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <View style={flexRow}>
          <View>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs12BoldGray6}>{INVESTMENT.LABEL_AMOUNT}</Text>
              <Text style={fs12RegGray6}>{minNewSalesAmountLabel}</Text>
            </View>
            <CustomTextInput
              error={amountError}
              inputPrefix={fundCurrency}
              keyboardType="numeric"
              onBlur={checkInvestmentAmount}
              onChangeText={handleInvestmentAmount}
              placeholder="0.00"
              spaceToBottom={isRecurring === true ? sh12 : undefined}
              spaceToTop={sh4}
              value={investmentAmount}
            />
            {isRecurring === true ? (
              <CheckBox
                label={INVESTMENT.LABEL_RECURRING}
                onPress={handleScheduled}
                spaceToLabel={sw12}
                style={px(sw16)}
                toggle={scheduledInvestment}
              />
            ) : null}
          </View>
          <CustomSpacer isHorizontal={true} space={sw64} />
          <View>
            <NumberPicker
              disabled={salesChargeDifference === 0}
              error={investmentSalesChargeError}
              innerContainerStyle={innerContainer}
              interval={salesChargeInterval}
              label={INVESTMENT.LABEL_SALES_CHARGE}
              onBlur={onBlurSalesCharge}
              maxValue={maxSalesCharge}
              minValue={minSalesCharge}
              setValue={handleSalesCharge}
              value={initialSalesCharge}
            />
            {investmentSalesChargeError !== undefined ? null : (
              <TextSpaceArea spaceToTop={sh4} style={fs12RegGray5} text={salesChargeHintText} />
            )}
          </View>
        </View>
        {scheduledInvestment === true ? (
          <Fragment>
            <CustomSpacer space={sh24} />
            <View style={flexRow}>
              <View>
                <View style={{ ...flexRow, ...centerVertical }}>
                  <Text style={fs12BoldGray6}>{INVESTMENT.LABEL_AMOUNT}</Text>
                  <Text style={fs12RegGray6}>{minTopUpAmountLabel}</Text>
                </View>
                <CustomTextInput
                  error={scheduledAmountError}
                  inputPrefix={DICTIONARY_RECURRING_CURRENCY}
                  keyboardType="numeric"
                  onBlur={checkScheduledInvestmentAmount}
                  onChangeText={handleScheduledAmount}
                  placeholder="0.00"
                  spaceToTop={sh4}
                  value={scheduledInvestmentAmount}
                />
                <CustomSpacer space={sh8} />
                <View style={{ ...px(sw16) }}>
                  <Text style={fs12RegGray5}>{`${INVESTMENT.HINT_FPX} ${minimumFpx}`}</Text>
                  <Text style={fs12RegGray5}>{INVESTMENT.HINT_DDA}</Text>
                </View>
              </View>
              <CustomSpacer isHorizontal={true} space={sw64} />
              <View>
                <NumberPicker
                  disabled={salesChargeDifference === 0}
                  error={scheduledSalesChargeError}
                  innerContainerStyle={innerContainer}
                  interval={salesChargeInterval}
                  label={INVESTMENT.LABEL_RECURRING_SALES_CHARGE}
                  onBlur={onBlurScheduledSalesCharge}
                  maxValue={maxSalesCharge}
                  minValue={minSalesCharge}
                  setValue={handleScheduledSalesCharge}
                  value={`${initialRecurringSalesCharge}`}
                />
                {investmentSalesChargeError !== undefined ? null : (
                  <TextSpaceArea spaceToTop={sh4} style={fs12RegGray5} text={salesChargeHintText} />
                )}
              </View>
            </View>
          </Fragment>
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
    </Fragment>
  );
};
