import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

import {
  AdvancedDropdown,
  ButtonSelectionList,
  CardWrap,
  CardWrapProps,
  CustomSpacer,
  FileViewer,
  LabeledTitle,
  LabeledTitleProps,
  SafeAreaPage,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorGray,
  colorWhite,
  flexGrow,
  flexRow,
  fs10BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  fsTransformNone,
  px,
  py,
  sh05,
  sh14,
  sh16,
  sh24,
  sh32,
  sh56,
  sh8,
  sw12,
  sw144,
  sw16,
  sw24,
  sw30,
  sw64,
  sw8,
  sw832,
} from "../../../styles";

const { PRODUCT_DETAILS } = Language.PAGE;

interface ProductDetailsProps {
  fund: IProduct;
  handleBack: () => void;
  handleShareDocuments: () => void;
}
export const ProductDetails: FunctionComponent<ProductDetailsProps> = ({ fund, handleBack }: ProductDetailsProps) => {
  const [viewDocument, setViewDocument] = useState<FileBase64 | undefined>(undefined);
  const [masterClassList, setMasterClassList] = useState<IProductClasses | undefined>(undefined);
  const [inputCurrency, setInputCurrency] = useState<string>(fund.masterList[0].currency);
  const [inputClass, setInputClass] = useState<string>(fund.masterList[0].class);
  const [filteredCurrency, setFilteredCurrency] = useState<IProductMasterList>(fund.masterList[0]);

  const { salesCharge, newSalesAmount } = filteredCurrency;
  const isAmp = fund.fundType === "AMP";
  const fundNameLabel = fund.fundCurrencies.length > 1 ? fund.fundName : `${fund.fundName} (${inputCurrency})`;
  const documentList = fund.docs !== undefined ? fund.docs.map((document: IProductDocument) => document.name) : [];
  const ampLabel = isAmp ? PRODUCT_DETAILS.LABEL_LANDING_FUND : PRODUCT_DETAILS.LABEL_FUND_CATEGORY;
  const ampValue = isAmp ? fund.landingFund : fund.fundCategory;

  const handleViewDocument = (documentIndex: number) => {
    if (fund.docs !== undefined) {
      const document = fund.docs[documentIndex];
      const documentFile = {
        name: document.name,
        type: "application/pdf",
        url: document.url,
      };
      setViewDocument(documentFile);
    }
  };

  const handleCloseViewer = () => {
    setViewDocument(undefined);
  };

  const handleClass = (value: string) => {
    if (masterClassList !== undefined) {
      const newCurrency = masterClassList[value][0].currency;
      setInputCurrency(newCurrency);
      setFilteredCurrency(masterClassList[value][0]);
    }
    setInputClass(value);
  };

  const data: LabeledTitleProps[] = [
    { label: ampLabel, title: ampValue },
    { label: PRODUCT_DETAILS.LABEL_FUND_TYPE, title: fund.fundType, titleStyle: fsTransformNone },
    { label: PRODUCT_DETAILS.LABEL_RISK, title: fund.riskCategory },
    { label: PRODUCT_DETAILS.LABEL_SHARIAH, title: fund.isSyariah },
    { label: PRODUCT_DETAILS.LABEL_EPF, title: fund.isEpf },
    { label: PRODUCT_DETAILS.LABEL_SALES_CASH, title: `${salesCharge.cash.min}% - ${salesCharge.cash.max}%` },
    {
      label: PRODUCT_DETAILS.LABEL_MINIMUM_CASH,
      titlePrefix: inputCurrency,
      titlePrefixStyle: { lineHeight: sh24 },
      title: newSalesAmount.cash.min,
    },
  ];

  const ampFeeLabel: LabeledTitleProps = { label: PRODUCT_DETAILS.LABEL_AMP_FEE, title: `${fund.ampFee}%` };

  if (isAmp) {
    data.splice(1, 1);
    data.splice(4, 0, ampFeeLabel);
  }

  if (fund.isEpf === "Yes") {
    data.splice(-1, 0, { label: PRODUCT_DETAILS.LABEL_SALES_EPF, title: `${salesCharge.epf.min}% - ${salesCharge.epf.max}%` });
  }

  if (!isAmp) {
    data.splice(-1, 0, { label: PRODUCT_DETAILS.LABEL_ANNUAL, title: `${fund.annualManagementFee}%` });
  }

  if (fund.isEpf === "Yes") {
    data.push({
      label: PRODUCT_DETAILS.LABEL_MINIMUM_EPF,
      titlePrefix: inputCurrency,
      titlePrefixStyle: { lineHeight: sh24 },
      title: newSalesAmount.epf.min,
    });
  }

  const cardWrapProps: CardWrapProps = {
    data: data.filter((raw) => raw.label !== ""),
    spaceBetween: sw16,
    noInitialSpace: true,
    labelStyle: fs10BoldBlack2,
    itemStyle: { width: sw144 },
    titleStyle: fs16BoldBlack2,
  };

  const masterClassKeys = masterClassList !== undefined ? Object.keys(masterClassList) : [];

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

  useEffect(() => {
    let newMasterClassList: IProductClasses = {};
    fund.masterList.forEach((list: IProductMasterList) => {
      const classIndex = masterClassList !== undefined ? Object.keys(masterClassList).indexOf(list.class) : -1;
      if (classIndex === -1) {
        newMasterClassList = { ...newMasterClassList, [list.class]: [list] };
      } else {
        newMasterClassList[list.class].push(list);
      }
    });
    setMasterClassList(newMasterClassList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <CustomSpacer space={sh32} />
        <View style={{ ...flexRow, ...px(sw24), width: sw832 }}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <View style={{ ...centerHV, height: sw30, width: sw30 }}>
              <IcoMoon name="arrow-left" size={sh24} />
            </View>
          </TouchableWithoutFeedback>
          <CustomSpacer isHorizontal={true} space={sw16} />
          <LabeledTitle
            label={fundNameLabel}
            labelStyle={fs24BoldBlack2}
            spaceToLabel={sh8}
            title={fund.issuingHouse}
            titleStyle={fs16SemiBoldBlack2}
          />
        </View>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...py(sh24) }}>
            {masterClassList !== undefined && masterClassKeys.length > 0 ? (
              <Fragment>
                <View style={{ ...flexRow, ...px(sw24) }}>
                  {masterClassKeys.length > 1 || "" in masterClassList === false ? (
                    <Fragment>
                      <AdvancedDropdown handleChange={handleClass} items={classes} label={PRODUCT_DETAILS.LABEL_CLASS} value={inputClass} />
                      <CustomSpacer isHorizontal={true} space={sw64} />
                    </Fragment>
                  ) : null}
                  <AdvancedDropdown
                    handleChange={setInputCurrency}
                    items={currencies}
                    label={PRODUCT_DETAILS.LABEL_CURRENCY}
                    value={inputCurrency}
                  />
                </View>
                <CustomSpacer space={sh24} />
              </Fragment>
            ) : null}
            <View style={px(sw24)}>
              <Text style={fs16BoldBlack2}>{PRODUCT_DETAILS.LABEL_FUND_OBJECTIVE}</Text>
              <TextSpaceArea spaceToTop={sh8} style={fs16RegBlack2} text={fund.fundObjective!} />
            </View>
            <CustomSpacer space={sw24} />
            <View style={{ ...flexRow, borderColor: colorGray._1, borderWidth: sh05 }} />
            <TextSpaceArea
              spaceToBottom={sh16}
              spaceToTop={sh24}
              style={{ ...fs16BoldBlack2, ...px(sw24) }}
              text={PRODUCT_DETAILS.LABEL_FUND_FACTS}
            />
            <View style={flexRow}>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <CardWrap {...cardWrapProps} />
            </View>
            {/* <CustomSpacer space={sw24} />
          <View style={{ ...flexRow, borderColor: colorGray._1, borderWidth: sh05 }} />
          <ProductGraph fund={fund} layout={{ width: sw832 }} /> */}
            <CustomSpacer space={sw24} />
            <View style={{ ...flexRow, borderColor: colorGray._1, borderWidth: sh05 }} />
            <View style={{ ...px(sw24) }}>
              <CustomSpacer space={sh24} />
              <View style={{ ...flexRow, ...centerVertical }}>
                <Text style={{ ...fs16BoldBlack2 }}>{PRODUCT_DETAILS.LABEL_FUND_DOCUMENTS}</Text>
                <CustomSpacer isHorizontal={true} space={sw12} />
                {/* <TouchableWithoutFeedback onPress={handleShareDocuments}>
                  <IcoMoon name="share" color={colorBlue._1} size={sw16} />
                </TouchableWithoutFeedback> */}
              </View>
              <CustomSpacer space={sh14} />
              <View style={flexRow}>
                <ButtonSelectionList
                  color={colorBlue._2}
                  data={documentList}
                  icon="file"
                  onPress={handleViewDocument}
                  spaceBetween={sw16}
                />
              </View>
              {viewDocument !== undefined ? (
                <FileViewer handleClose={handleCloseViewer} resourceType="url" value={viewDocument} visible={viewDocument !== undefined} />
              ) : null}
            </View>
          </View>
        </View>
        <CustomSpacer space={sh56} />
      </ScrollView>
    </SafeAreaPage>
  );
};
