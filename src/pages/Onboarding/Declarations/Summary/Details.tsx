import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { AccountHeader, CardWrap, CustomSpacer, FileViewer, LabeledTitleProps } from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_CRS_TAX_RESIDENCY, OPTIONS_CRS_TIN_REASONS } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import {
  borderBottomBlack21,
  borderBottomRed4,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs16BoldBlack2,
  fs24BoldBlack2,
  fsTransformNone,
  px,
  py,
  sh16,
  sh24,
  sh64,
  shadowBlack116,
  shadowBlue204,
  sw16,
  sw200,
  sw24,
  sw8,
} from "../../../../styles";

const { DECLARATIONS, DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationDetailsProps {
  address: string;
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  isFea: boolean;
  name: string;
  summary: IDeclarationState;
}

interface TitleIconProps {
  title: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
}

const TitleIcon = ({ onPress, title, titleStyle }: TitleIconProps) => {
  return (
    <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16) }}>
      <Text style={{ ...fs16BoldBlack2, ...titleStyle }}>{title}</Text>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <IcoMoon color={colorBlue._1} name="edit" onPress={onPress} size={sh24} />
    </View>
  );
};

export const DeclarationDetails: FunctionComponent<DeclarationDetailsProps> = ({
  address,
  accountHolder,
  accountType,
  handleNextStep,
  isFea,
  name,
  summary,
}: DeclarationDetailsProps) => {
  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const handleEditFatca = () => {
    handleNextStep("FATCADeclaration");
  };

  const handleEditCrs = () => {
    handleNextStep("CRSDeclaration");
  };

  const handleEditFea = () => {
    handleNextStep("FEADeclaration");
  };
  const { fatca, fea, crs } = summary;

  const handleView = () => {
    setViewFile(fatca!.certificate);
  };

  const handleCloseViewer = () => {
    setViewFile(undefined);
  };

  const isTaxResident = crs!.taxResident! === 0;

  const fatcaSummary: LabeledTitleProps[] = [
    { label: DECLARATION_SUMMARY.LABEL_CITIZENSHIP, title: fatca!.usCitizen === 0 ? "Yes" : "No" },
  ];

  const crsPartial: LabeledTitleProps[] = [
    { label: DECLARATION_SUMMARY.LABEL_JURISDICTION, labelStyle: { width: sw200 }, title: OPTIONS_CRS_TAX_RESIDENCY[crs?.taxResident!] },
  ];

  const feaSummary: LabeledTitleProps[] =
    isFea === true
      ? [
          { label: DECLARATION_SUMMARY.LABEL_MALAYSIAN_RESIDENT, title: fea?.resident === 0 ? "Yes" : "No" },
          { label: DECLARATION_SUMMARY.LABEL_FACILITY, title: fea?.facility === 0 ? "Yes" : "No" },
          { label: DECLARATION_SUMMARY.LABEL_BALANCE, title: fea?.balance !== "" ? fea?.balance! : "-" },
        ]
      : [];

  if (fatca!.usCitizen === 1) {
    fatcaSummary.splice(1, 0, { label: DECLARATION_SUMMARY.LABEL_US_BORN, title: fatca!.usBorn === 0 ? "Yes" : "No" });
    if (fatca!.usBorn === 0) {
      fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_RESIDENT, title: fatca!.confirmAddress === 0 ? "Yes" : "No" });
      if (fatca!.certificate !== undefined) {
        fatcaSummary.push({
          label: DECLARATION_SUMMARY.LABEL_CERTIFICATE,
          title: fatca!.certificate.name,
          titleIcon: "file",
          titleStyle: fsTransformNone,
          onPress: handleView,
        });
      } else {
        fatcaSummary.push(
          { label: DECLARATION_SUMMARY.LABEL_CERTIFICATE, title: "-" },
          {
            label: DECLARATION_SUMMARY.LABEL_CERTIFICATE_REASON,
            title: fatca!.reason === 1 ? fatca!.explanation! : DECLARATIONS.LABEL_REASON_LOST,
            titleStyle: fsTransformNone,
          },
        );
      }
      if (fatca!.confirmAddress === 0) {
        fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_CORRESPONDENCE, title: address, titleStyle: fsTransformNone });
      }
    }
  }

  if (fatca!.formW9 === true) {
    fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_FORM_W9, title: "Yes" });
  }

  if (fatca!.formW8Ben === true) {
    fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_FORM_W8_BEN, title: "Yes" });
  }

  const crsSummary = isTaxResident
    ? crsPartial
    : crsPartial.concat([
        { label: DECLARATION_SUMMARY.LABEL_TIN_COUNTRY, title: crs!.country !== "" ? crs!.country! : "-" },
        { label: DECLARATION_SUMMARY.LABEL_TIN_NUMBER, title: crs!.tinNumber !== "" ? crs!.tinNumber! : "-" },
      ]);

  if (crs!.noTin === true) {
    const tinLabel = crs!.reason === 1 ? DECLARATION_SUMMARY.OPTION_NO_TIN_REQUIRED : OPTIONS_CRS_TIN_REASONS[crs!.reason!];
    crsSummary.push({
      label: DECLARATION_SUMMARY.LABEL_TIN_REMARKS,
      title: crs!.reason === 2 ? crs!.explanation! : tinLabel,
      titleStyle: fsTransformNone,
    });
  }

  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...borderBottomRed4,
    ...shadowBlue204,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh64,
    position: "relative",
    zIndex: 1,
  };

  const headerTitle = accountHolder === "Principal" ? DECLARATION_SUMMARY.TITLE_PRINCIPAL : DECLARATION_SUMMARY.TITLE_JOINT;

  return (
    <Fragment>
      <View style={px(sw24)}>
        <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...shadowBlack116 }}>
          {accountType === "Individual" ? (
            <View style={headerStyle}>
              <Text style={fs24BoldBlack2}>{name}</Text>
            </View>
          ) : (
            <AccountHeader headerStyle={{ height: sh64 }} spaceToBottom={0} subtitle={headerTitle} title={name} />
          )}
          <View style={borderBottomBlack21}>
            <TitleIcon onPress={handleEditFatca} title={DECLARATION_SUMMARY.TITLE_FATCA} />
            <CardWrap data={fatcaSummary} />
          </View>
          <View>
            <TitleIcon onPress={handleEditCrs} title={DECLARATION_SUMMARY.TITLE_CRS} />
            <CardWrap data={crsSummary} />
          </View>
          {feaSummary.length !== 0 ? (
            <View>
              <TitleIcon onPress={handleEditFea} title={DECLARATION_SUMMARY.TITLE_FEA} />
              <CardWrap data={feaSummary} />
            </View>
          ) : null}
        </View>
      </View>
      {viewFile !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="file" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </Fragment>
  );
};