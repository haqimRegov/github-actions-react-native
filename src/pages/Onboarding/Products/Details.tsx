import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

import {
  ButtonSelectionList,
  CustomSpacer,
  Dash,
  LabeledTitle,
  NewDropdown,
  SafeAreaPage,
  TextCard,
  TextCardProps,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import { RNInAppBrowser } from "../../../integrations";
import {
  borderBottomGray2,
  centerHV,
  centerVertical,
  colorGray,
  colorWhite,
  flexGrow,
  flexRow,
  fs10BoldGray6,
  fs16BoldGray6,
  fs16RegGray6,
  fs16SemiBoldGray6,
  fs24BoldGray6,
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
import { formatAmount } from "../../../utils";

const { PRODUCT_DETAILS } = Language.PAGE;

interface ProductDetailsProps {
  fund: IProduct;
  handleBack: () => void;
  handleShareDocuments: () => void;
}
export const ProductDetails: FunctionComponent<ProductDetailsProps> = ({ fund, handleBack }: ProductDetailsProps) => {
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
              return PRODUCT_DETAILS.TITLE_DOC_PROSPECTUS;
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

  const data: LabeledTitleProps[] = [
    { label: ampLabel, title: ampValue },
    { label: PRODUCT_DETAILS.LABEL_FUND_TYPE, title: fund.fundType, titleStyle: fsTransformNone },
    { label: PRODUCT_DETAILS.LABEL_RISK, title: fund.riskCategory },
    { label: PRODUCT_DETAILS.LABEL_SHARIAH, title: fund.isSyariah },
    { label: PRODUCT_DETAILS.LABEL_EPF, title: fund.isEpf },
    {
      label: PRODUCT_DETAILS.LABEL_SALES_CHARGE_CASH,
      title: `${PRODUCT_DETAILS.LABEL_UP_TO} ${salesCharge.cash.max}%`,
      titleStyle: fsTransformNone,
    },
    {
      label: PRODUCT_DETAILS.LABEL_MINIMUM_CASH,
      titlePrefix: inputCurrency,
      title: formatAmount(newSalesAmount.cash.min || 0),
    },
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
      label: PRODUCT_DETAILS.LABEL_SALES_CHARGE_EPF,
      title: `${PRODUCT_DETAILS.LABEL_UP_TO} ${salesCharge.epf.max}%`,
      titleStyle: fsTransformNone,
    });
  }

  if (!isAmp) {
    data.splice(-1, 0, { label: PRODUCT_DETAILS.LABEL_ANNUAL, title: `${fund.annualManagementFee}%` });
  }

  if (fund.isEpf === "Yes") {
    data.push({
      label: PRODUCT_DETAILS.LABEL_MINIMUM_EPF,
      titlePrefix: inputCurrency,
      title: formatAmount(newSalesAmount.epf.min),
    });
  }

  const textCardProps: TextCardProps = {
    data: data.filter((raw) => raw.label !== ""),
    itemsPerGroup: 5,
    itemStyle: { width: sw144 },
    labelStyle: fs10BoldGray6,
    spaceBetweenItem: width < 1080 ? 15 : 16,
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
        <View style={{ ...flexRow, ...px(sw24), width: sw832 }}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <View style={{ ...centerHV, height: sw30, width: sw30 }}>
              <IcoMoon name="arrow-left" size={sh24} />
            </View>
          </TouchableWithoutFeedback>
          <CustomSpacer isHorizontal={true} space={sw16} />
          <LabeledTitle
            label={fund.fundName}
            labelStyle={fs24BoldGray6}
            spaceToLabel={sh8}
            title={fund.issuingHouse}
            titleStyle={fs16SemiBoldGray6}
          />
        </View>
        <CustomSpacer space={sh24} />
        <View style={px(sw24)}>
          <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...py(sh24) }}>
            <View style={px(sw24)}>
              <Text style={fs16BoldGray6}>{PRODUCT_DETAILS.LABEL_FUND_OBJECTIVE}</Text>
              <TextSpaceArea spaceToTop={sh8} style={fs16RegGray6} text={fund.fundObjective} />
            </View>
            <CustomSpacer space={sw24} />
            <View style={borderBottomGray2} />
            {showMulti === true ? (
              <Fragment>
                <View style={{ ...flexRow, ...px(sw24), ...py(sh24) }}>
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
                <Dash />
              </Fragment>
            ) : null}
            <TextSpaceArea
              spaceToBottom={sh16}
              spaceToTop={sh24}
              style={{ ...fs16BoldGray6, ...px(sw24) }}
              text={PRODUCT_DETAILS.LABEL_FUND_FACTS}
            />
            <View style={px(sw24)}>
              <TextCard {...textCardProps} />
            </View>
            {/* <CustomSpacer space={sw24} />
          <View style={{ ...flexRow, borderColor: colorGray._2, borderWidth: sh05 }} />
          <ProductGraph fund={fund} layout={{ width: sw832 }} /> */}
            {/* <CustomSpacer space={sw24} /> */}
            {documentList.length > 0 ? (
              <Fragment>
                <View style={{ ...flexRow, borderColor: colorGray._2, borderWidth: sh05 }} />
                <View style={px(sw24)}>
                  <CustomSpacer space={sh24} />
                  <View style={{ ...flexRow, ...centerVertical }}>
                    <Text style={fs16BoldGray6}>{PRODUCT_DETAILS.LABEL_FUND_DOCUMENTS}</Text>
                    <CustomSpacer isHorizontal={true} space={sw12} />
                    {/* <TouchableWithoutFeedback onPress={handleShareDocuments}>
                  <IcoMoon name="share" color={colorBlue._8} size={sw16} />
                </TouchableWithoutFeedback> */}
                  </View>
                  <CustomSpacer space={sh14} />
                  <View style={flexRow}>
                    <ButtonSelectionList data={documentList} icon="file" onPress={handleViewDocument} spaceBetween={sw16} />
                  </View>
                </View>
              </Fragment>
            ) : null}
          </View>
        </View>
        <CustomSpacer space={sh56} />
      </ScrollView>
    </SafeAreaPage>
  );
};
