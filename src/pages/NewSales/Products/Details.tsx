import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  ButtonSelectionList,
  CustomFlexSpacer,
  CustomSpacer,
  LabeledTitle,
  NewDropdown,
  RoundedButton,
  SafeAreaPage,
  TextCard,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import { RNInAppBrowser } from "../../../integrations";
import {
  borderBottomBlue4,
  centerHV,
  colorBlack,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs12BoldGray5,
  fs12BoldWhite1,
  fs12RegBlack2,
  fs14RegGray5,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs18BoldGray6,
  fsTransformNone,
  px,
  py,
  rowCenterVertical,
  sh14,
  sh16,
  sh24,
  sh32,
  sh4,
  sh56,
  sh8,
  sw12,
  sw16,
  sw168,
  sw20,
  sw24,
  sw240,
  sw30,
  sw64,
  sw8,
} from "../../../styles";
import { formatAmount } from "../../../utils";

const { PRODUCT_DETAILS } = Language.PAGE;

interface ProductDetailsProps {
  fund: IProduct;
  handleBack: () => void;
  handleShareDocuments: () => void;
  selectedFunds: IProduct[];
  setSelectedFund: (data: IProduct[]) => void;
  setViewFund: (data: IProduct | undefined) => void;
}
export const ProductDetails: FunctionComponent<ProductDetailsProps> = ({
  fund,
  handleBack,
  selectedFunds,
  setSelectedFund,
  setViewFund,
}: ProductDetailsProps) => {
  const { width } = Dimensions.get("window");
  const [masterClassList, setMasterClassList] = useState<IProductClasses | undefined>(undefined);
  const [inputCurrency, setInputCurrency] = useState<string>(fund.masterList[0].currency);
  const [inputClass, setInputClass] = useState<string>(fund.masterList[0].class === null ? "No Class" : fund.masterList[0].class);
  const [filteredCurrency, setFilteredCurrency] = useState<IProductMasterList>(fund.masterList[0]);

  const { salesCharge, newSalesAmount } = filteredCurrency;
  const isAmp = fund.fundType === "AMP";

  const documentList =
    fund.docs !== undefined
      ? fund.docs.map(({ name }: IProductDocument) => {
          switch (name) {
            case "fact":
              return PRODUCT_DETAILS.TITLE_DOC_FACT;
            case "prospectus":
              return PRODUCT_DETAILS.TITLE_DOC_DISCLOSURE;
            case "annual":
              return PRODUCT_DETAILS.TITLE_DOC_ANNUAL;
            case "highlights":
              return PRODUCT_DETAILS.TITLE_DOC_HIGHLIGHTS;

            default:
              return name;
          }
        })
      : [];
  const ampLabel = isAmp ? PRODUCT_DETAILS.LABEL_LANDING_FUND : PRODUCT_DETAILS.LABEL_FUND_CATEGORY;
  const ampValue = isAmp ? fund.landingFund : fund.fundCategory;

  const handleViewDocument = (documentIndex: number) => {
    if (fund.docs !== undefined) {
      const link = fund.docs[documentIndex].url;
      RNInAppBrowser.openLink(link);
    }
  };

  const handleCurrency = (value: string) => {
    if (masterClassList !== undefined) {
      const indexOfCurrency = masterClassList[inputClass].findIndex(({ currency }) => currency === value);
      setInputCurrency(value);
      setFilteredCurrency(masterClassList[inputClass][indexOfCurrency]);
    }
  };

  const handleClass = (value: string) => {
    if (masterClassList !== undefined) {
      const newCurrency = masterClassList[value][0].currency;
      setInputCurrency(newCurrency);
      setFilteredCurrency(masterClassList[value][0]);
    }
    setInputClass(value);
  };

  const handleSelect = () => {
    const updatedFunds = [...selectedFunds];
    const checkFundExisting = updatedFunds.findIndex((eachFund: IProduct) => eachFund.fundName === fund.fundName);
    if (checkFundExisting === -1) {
      updatedFunds.push(fund);
      setSelectedFund(updatedFunds);
    }
    setViewFund(undefined);
  };

  const data: LabeledTitleProps[] = [
    { label: ampLabel, title: ampValue },
    { label: PRODUCT_DETAILS.LABEL_FUND_TYPE, title: fund.fundType, titleStyle: fsTransformNone },
    { label: PRODUCT_DETAILS.LABEL_RISK, title: fund.riskCategory },
    { label: PRODUCT_DETAILS.LABEL_SHARIAH, title: fund.isSyariah },
    { label: PRODUCT_DETAILS.LABEL_EPF, title: fund.isEpf },
  ];

  const transactionInfo: LabeledTitleProps[] = [
    {
      label: PRODUCT_DETAILS.LABEL_MIN_INITIAL_INVESTMENT,
      title: `${filteredCurrency.currency} ${formatAmount(newSalesAmount.cash.min)}`,
      titleStyle: fsTransformNone,
    },
    {
      label: PRODUCT_DETAILS.LABEL_MIN_ADDITIONAL_INVESTMENT,
      title: `${filteredCurrency.currency} ${parseFloat(filteredCurrency.topUpAmount.cash.min)}`,
      titleStyle: fsTransformNone,
    },
    {
      label: PRODUCT_DETAILS.LABEL_SALES_CHARGE_CASH,
      title: `${salesCharge.cash.max}%`,
      titleStyle: fsTransformNone,
    },
    {
      label: PRODUCT_DETAILS.LABEL_ANNUAL,
      title: `${fund.annualManagementFee}%`,
      titleStyle: fsTransformNone,
    },
    // TODO 2 other values left. Will add after after BE comes back
  ];

  if (fund.isEpfOnly === "Yes") {
    data.splice(-1, 1);
  }

  const ampFeeLabel: LabeledTitleProps = { label: PRODUCT_DETAILS.LABEL_AMP_FEE, title: `${fund.ampFee}%` };

  if (isAmp) {
    data.splice(1, 1);
    data.splice(4, 0, ampFeeLabel);
  }

  if (fund.isEpf === "Yes") {
    data.splice(-1, 0, {
      label: PRODUCT_DETAILS.LABEL_SALES_EPF,
      title: `${PRODUCT_DETAILS.LABEL_UP_TO} ${salesCharge.epf.max}%`,
      titleStyle: fsTransformNone,
    });
  }

  // if (!isAmp) {
  //   data.splice(-1, 0, { label: PRODUCT_DETAILS.LABEL_ANNUAL, title: `${fund.annualManagementFee}%` });
  // }

  if (fund.isEpf === "Yes") {
    data.push({
      label: PRODUCT_DETAILS.LABEL_MINIMUM_EPF,
      titlePrefix: inputCurrency,
      title: formatAmount(newSalesAmount.epf.min),
    });
  }

  const fundData = data.filter((raw) => raw.label !== "");
  const transactionData = transactionInfo.filter((raw) => raw.label !== "");

  const textCardProps = {
    itemsPerGroup: 5,
    itemStyle: { width: sw240, marginBottom: sh16 },
    labelStyle: fs12BoldGray5,
    spaceBetweenItem: width < 1080 ? 15 : 16,
    titleStyle: fs16BoldBlack2,
  };

  const currencies =
    masterClassList !== undefined
      ? masterClassList[inputClass].map((value) => {
          return { label: value.currency, value: value.currency };
        })
      : [];

  const classes =
    masterClassList !== undefined
      ? Object.keys(masterClassList).map((value) => {
          return { label: value, value: value };
        })
      : [];

  const showMulti = currencies.length > 1 || classes.length > 1 || (classes.length === 1 && classes[0].label !== "No Class");
  const buttonStyle: ViewStyle = {
    width: sw168,
    height: sh32,
  };

  useEffect(() => {
    let newMasterClassList: IProductClasses = {};
    fund.masterList.forEach((list: IProductMasterList) => {
      const dump = { class: list.class !== null ? list.class : "No Class", currency: list.currency };
      const findClassIndex = Object.keys(newMasterClassList).indexOf(dump.class);
      if (findClassIndex === -1) {
        newMasterClassList = { ...newMasterClassList, [dump.class]: [list] };
      } else {
        newMasterClassList[dump.class].push(list);
      }
      return dump;
    });
    setMasterClassList(newMasterClassList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <CustomSpacer space={sh32} />
        <View style={{ ...flexRow, ...px(sw24), ...flexChild }}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <View style={{ ...centerHV, height: sw30, width: sw30 }}>
              <IcoMoon name="arrow-left" size={sh24} />
            </View>
          </TouchableWithoutFeedback>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <LabeledTitle
            label={fund.fundName}
            labelStyle={fs18BoldGray6}
            spaceToLabel={sh4}
            title={fund.issuingHouse}
            titleStyle={fs14RegGray5}
          />
          <CustomFlexSpacer />
          <RoundedButton
            buttonStyle={buttonStyle}
            icon="check"
            onPress={handleSelect}
            text={PRODUCT_DETAILS.LABEL_SELECT_THIS_FUND}
            textStyle={fs12BoldWhite1}
          />
        </View>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8 }}>
            <CustomSpacer space={sh24} />
            <View style={px(sw24)}>
              <View style={rowCenterVertical}>
                <IcoMoon name="objective" size={sw20} color={colorBlack._2} />
                <CustomSpacer isHorizontal={true} space={sw12} />
                <Text style={fs16BoldBlack2}>{PRODUCT_DETAILS.LABEL_INVESTMENT_OBJECTIVE}</Text>
                <CustomSpacer isHorizontal={true} space={sw12} />
                <View style={flexChild}>
                  <View style={borderBottomBlue4} />
                </View>
              </View>
              <TextSpaceArea spaceToTop={sh8} style={fs16RegBlack2} text={fund.fundObjective} />
              <CustomSpacer space={sh32} />
              <View style={rowCenterVertical}>
                <IcoMoon name="fund-facts" size={sw20} color={colorBlack._2} />
                <CustomSpacer isHorizontal={true} space={sw12} />
                <Text style={fs16BoldBlack2}>{PRODUCT_DETAILS.LABEL_FUND_FACTS} </Text>
                <CustomSpacer isHorizontal={true} space={sw12} />
                <View style={flexChild}>
                  <View style={borderBottomBlue4} />
                </View>
              </View>
              <CustomSpacer space={sh8} />
              <TextCard data={fundData} noLastIndexSpace={true} {...textCardProps} />
            </View>
          </View>
          <CustomSpacer space={sh24} />
          <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...py(sh24), ...px(sw24) }}>
            {showMulti === true ? (
              <Fragment>
                <View style={flexRow}>
                  {classes.length > 1 || (classes.length === 1 && classes[0].label !== "No Class") ? (
                    <Fragment>
                      <NewDropdown handleChange={handleClass} items={classes} label={PRODUCT_DETAILS.LABEL_CLASS} value={inputClass} />
                      <CustomSpacer isHorizontal={true} space={sw64} />
                    </Fragment>
                  ) : null}
                  <NewDropdown
                    handleChange={handleCurrency}
                    items={currencies}
                    label={PRODUCT_DETAILS.LABEL_CURRENCY}
                    value={inputCurrency}
                  />
                </View>
                <CustomSpacer space={sh24} />
              </Fragment>
            ) : null}
            <View style={rowCenterVertical}>
              <IcoMoon name="transaction-info" size={sw20} color={colorBlack._2} />
              <CustomSpacer isHorizontal={true} space={sw12} />
              <Text style={fs16BoldBlack2}>{PRODUCT_DETAILS.LABEL_TRANSACTION_INFO} </Text>
              <CustomSpacer isHorizontal={true} space={sw12} />
              <View style={flexChild}>
                <View style={borderBottomBlue4} />
              </View>
            </View>
            <CustomSpacer space={sh8} />
            <TextCard data={transactionData} {...textCardProps} />
            {documentList.length > 0 ? (
              <Fragment>
                <View style={rowCenterVertical}>
                  <IcoMoon name="file" size={sw16} color={colorBlack._2} />
                  <CustomSpacer isHorizontal={true} space={sw12} />
                  <Text style={fs16BoldBlack2}>{PRODUCT_DETAILS.LABEL_DOCUMENTS}</Text>
                  <CustomSpacer isHorizontal={true} space={sw12} />
                  <View style={flexChild}>
                    <View style={borderBottomBlue4} />
                  </View>
                </View>
                <CustomSpacer space={sh14} />
                <View style={flexRow}>
                  <ButtonSelectionList data={documentList} icon="file" onPress={handleViewDocument} spaceBetween={sw16} />
                </View>
                <CustomSpacer space={sh32} />
              </Fragment>
            ) : null}
            <Text style={fs12RegBlack2}>{PRODUCT_DETAILS.LABEL_DISCLAIMER}</Text>
          </View>
        </View>
        <CustomSpacer space={sh56} />
      </ScrollView>
    </SafeAreaPage>
  );
};
