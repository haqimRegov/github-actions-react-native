import React, { FunctionComponent, useState } from "react";
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

import { BasicCard, ButtonSelectionList, CustomSpacer, FileViewer, LabeledTitle, TextSpaceArea } from "../../../components";
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
  fs16BoldBlack2,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  fsCapitalize,
  fsUppercase,
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
  sw16,
  sw24,
  sw30,
  sw8,
  sw832,
} from "../../../styles";
import { ProductGraph } from "./ProductList";

const { PRODUCT_DETAILS } = Language.PAGE;

interface ProductDetailsProps {
  fund: IFund;
  handleBack: () => void;
  handleShareDocuments: () => void;
}
export const ProductDetails: FunctionComponent<ProductDetailsProps> = ({ fund, handleBack, handleShareDocuments }: ProductDetailsProps) => {
  // TODO Fund Facts design for AMP fund
  const [viewDocument, setViewDocument] = useState<FileBase64 | undefined>(undefined);
  const epf = fund.isEpf ? "Yes" : "No";
  const shariah = fund.isShariah ? "Yes" : "No";

  const documentList = fund.documents !== undefined ? fund.documents.map((document: IFundDocument) => document.name) : [];

  const handleViewDocument = (documentIndex: number) => {
    if (fund.documents !== undefined) {
      const document = fund.documents[documentIndex];
      const documentFile = {
        name: document.name,
        type: "application/pdf",
        url: document.link,
      };
      setViewDocument(documentFile);
    }
  };

  const handleCloseViewer = () => {
    setViewDocument(undefined);
  };

  return (
    <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
      <CustomSpacer space={sh32} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <View style={{ ...centerHV, height: sw30, width: sw30 }}>
            <IcoMoon name="arrow-left" size={sh24} />
          </View>
        </TouchableWithoutFeedback>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <LabeledTitle
          label={fund.name}
          labelStyle={{ ...fs24BoldBlack2, ...fsCapitalize }}
          spaceToLabel={sh8}
          title={fund.issuer}
          titleStyle={{ ...fs16SemiBoldBlack2, ...fsCapitalize }}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...py(sh24) }}>
          <View style={px(sw24)}>
            <Text style={fs16BoldBlack2}>{PRODUCT_DETAILS.LABEL_FUND_OBJECTIVE}</Text>
            <TextSpaceArea spaceToTop={sh8} style={fs16RegBlack2} text={fund.fundObjective!} />
          </View>
          <CustomSpacer space={sw24} />
          <View style={{ ...flexRow, borderColor: colorGray._1, borderWidth: sh05 }} />
          <View style={px(sw24)}>
            <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh24} style={fs16BoldBlack2} text={PRODUCT_DETAILS.LABEL_FUND_FACTS} />
            <BasicCard
              data={[
                {
                  label: PRODUCT_DETAILS.LABEL_FUND_CATEGORY,
                  title: fund.fundCategory,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_FUND_TYPE,
                  title: fund.fundType,
                  titleStyle: fsUppercase,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_RISK,
                  title: fund.riskCategory,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_SHARIAH,
                  title: shariah,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_EPF,
                  title: epf,
                },
              ]}
            />
            <CustomSpacer space={sw24} />
            <BasicCard
              data={[
                {
                  label: PRODUCT_DETAILS.LABEL_SALES_CASH,
                  title: `${fund.salesCharge.cash?.minimum} % - ${fund.salesCharge.cash?.maximum} %`,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_SALES_EPF,
                  title: `${fund.salesCharge.epf?.minimum} % - ${fund.salesCharge.epf?.maximum} %`,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_ANNUAL,
                  title: `${fund.annualManagementFee} %`,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_MINIMUM_CASH,
                  title: `${fund.salesCharge.cash?.maximum}`,
                  titlePrefix: fund.fundCurrency,
                },
                {
                  label: PRODUCT_DETAILS.LABEL_MINIMUM_EPF,
                  title: `${fund.newSalesAmount.epf?.minimum}`,
                  titlePrefix: fund.fundCurrency,
                },
              ]}
            />
          </View>
          <CustomSpacer space={sw24} />
          <View style={{ ...flexRow, borderColor: colorGray._1, borderWidth: sh05 }} />
          <ProductGraph fund={fund} layout={{ width: sw832 }} />
          <CustomSpacer space={sw24} />
          <View style={{ ...flexRow, borderColor: colorGray._1, borderWidth: sh05 }} />
          <View style={{ ...px(sw24) }}>
            <CustomSpacer space={sh24} />
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={{ ...fs16BoldBlack2 }}>{PRODUCT_DETAILS.LABEL_FUND_DOCUMENTS}</Text>
              <CustomSpacer isHorizontal={true} space={sw12} />
              <TouchableWithoutFeedback onPress={handleShareDocuments}>
                <IcoMoon name="share" color={colorBlue._1} size={sw16} />
              </TouchableWithoutFeedback>
            </View>
            <CustomSpacer space={sh14} />
            <View style={flexRow}>
              <ButtonSelectionList data={documentList} icon="file" onPress={handleViewDocument} spaceBetween={sw16} />
            </View>
            {viewDocument !== undefined ? (
              <FileViewer handleClose={handleCloseViewer} value={viewDocument} visible={viewDocument !== undefined} />
            ) : null}
          </View>
        </View>
      </View>
      <CustomSpacer space={sh56} />
    </ScrollView>
  );
};
