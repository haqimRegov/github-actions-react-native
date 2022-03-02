import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import {
  CheckBox,
  CustomSpacer,
  CustomTextInput,
  LabeledTitle,
  NewDropdown,
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
  flexRow,
  fs12BoldBlue8,
  fs12BoldGray6,
  fs12RegGray5,
  fs12RegGray6,
  fs12RegWhite1,
  px,
  sh12,
  sh24,
  sh4,
  sh8,
  sw116,
  sw12,
  sw152,
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
  handleScrollToFund?: () => void;
  setData: (data: IProductSales) => void;
  withEpf: boolean;
}

export const Investment: FunctionComponent<InvestmentProps> = ({
  accountType,
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
    scheduledAmountError,
    scheduledInvestment,
    scheduledInvestmentAmount,
    scheduledSalesCharge,
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
    const currentSalesCharge = option === fundPaymentMethod ? investmentSalesCharge : "";
    const newData: IProductSales =
      option === "Cash"
        ? {
            ...data,
            investment: { ...investment, investmentSalesCharge: currentSalesCharge, fundPaymentMethod: "Cash" },
          }
        : {
            ...data,
            investment: {
              ...investment,
              investmentSalesCharge: currentSalesCharge,
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

  return (
    <Fragment>
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <TextSpaceArea style={{ width: sw360 }} spaceToBottom={sh8} text={INVESTMENT.LABEL_FUNDING_OPTION} />
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
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        {multiClass === false && currencies.length > 1 ? (
          <NewDropdown handleChange={handleCurrency} items={currencies} label={INVESTMENT.LABEL_CURRENCY} value={fundCurrency!} />
        ) : null}
        {multiClass === false && currencies.length === 1 ? (
          <LabeledTitle label={INVESTMENT.LABEL_CURRENCY} title={fundCurrency!} spaceToLabel={sh8} style={{ width: sw360 }} />
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
            <NewDropdown
              items={salesChargeRange}
              handleChange={handleSalesCharge}
              label={INVESTMENT.LABEL_SALES_CHARGE}
              value={investmentSalesCharge}
            />
            <TextSpaceArea spaceToTop={sh8} style={{ ...fs12RegGray5, ...px(sw16) }} text={maxSalesChargeLabel} />
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
                <View style={{ ...px(sw20) }}>
                  <Text style={fs12RegGray5}>{`${INVESTMENT.HINT_FPX} ${minimumFpx}`}</Text>
                  <Text style={fs12RegGray5}>{INVESTMENT.HINT_DDA}</Text>
                </View>
              </View>
              <CustomSpacer isHorizontal={true} space={sw64} />
              <View>
                <NewDropdown
                  handleChange={handleScheduledSalesCharge}
                  items={salesChargeRange}
                  label={INVESTMENT.LABEL_RECURRING_SALES_CHARGE}
                  value={`${scheduledSalesCharge}`}
                />
                <TextSpaceArea spaceToTop={sh8} style={{ ...fs12RegGray5, ...px(sw16) }} text={maxSalesChargeLabel} />
              </View>
            </View>
          </Fragment>
        ) : null}
      </View>
      <CustomSpacer space={sh24} />
    </Fragment>
  );
};
