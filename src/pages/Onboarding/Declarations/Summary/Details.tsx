import React, { Fragment, FunctionComponent, useState } from "react";
import { Dimensions, Text, TextStyle, View, ViewStyle } from "react-native";

import { AccountHeader, CustomSpacer, FileViewer, TextCard } from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_CRS_TAX_RESIDENCY, OPTIONS_CRS_TIN_REASONS } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import {
  borderBottomGray2,
  borderBottomRed1,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs16BoldGray6,
  fs24BoldGray6,
  fsTransformNone,
  px,
  py,
  sh16,
  sh24,
  sh4,
  sh64,
  shadow12Black116,
  shadow12Blue104,
  sw16,
  sw200,
  sw24,
  sw8,
} from "../../../../styles";

const { DECLARATIONS, DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationDetailsProps {
  address?: string;
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
      <Text style={{ ...fs16BoldGray6, ...titleStyle }}>{title}</Text>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <IcoMoon color={colorBlue._8} name="edit" onPress={onPress} size={sh24} suppressHighlighting={true} />
    </View>
  );
};

export const DeclarationDetails: FunctionComponent<DeclarationDetailsProps> = ({
  address,
  accountHolder,
  accountType,
  handleNextStep,
  // isFea,
  name,
  summary,
}: DeclarationDetailsProps) => {
  const { width } = Dimensions.get("window");
  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const handleEditFatca = () => {
    handleNextStep("FATCADeclaration");
  };

  const handleEditCrs = () => {
    handleNextStep("CRSDeclaration");
  };

  // const handleEditFea = () => {
  //   handleNextStep("FEADeclaration");
  // };
  const { fatca, crs } = summary;

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

  // const feaSummary: LabeledTitleProps[] =
  //   isFea === true
  //     ? [
  //         { label: DECLARATION_SUMMARY.LABEL_MALAYSIAN_RESIDENT, title: fea?.resident === 0 ? "Yes" : "No" },
  //         { label: DECLARATION_SUMMARY.LABEL_FACILITY, title: fea?.facility === 0 ? "Yes" : "No" },
  //         { label: DECLARATION_SUMMARY.LABEL_BALANCE, title: fea?.balance !== "" ? formatAmount(fea?.balance!) : "-" },
  //       ]
  //     : [];

  if (fatca!.usCitizen === 1) {
    fatcaSummary.splice(1, 0, { label: DECLARATION_SUMMARY.LABEL_US_BORN, title: fatca!.usBorn === 0 ? "Yes" : "No" });
    if (fatca!.usBorn === 0) {
      fatcaSummary.push({
        label: DECLARATION_SUMMARY.LABEL_RESIDENT,
        title: fatca!.confirmAddress === 0 && address !== undefined ? address : "-",
      });
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
      fatcaSummary.push({
        label: DECLARATION_SUMMARY.LABEL_CORRESPONDENCE,
        title: fatca!.confirmAddress === 0 ? "Yes" : "No",
        titleStyle: fsTransformNone,
      });
    }
  }

  if (fatca!.formW9 === true) {
    fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_FORM_W9, title: "Yes" });
  }

  if (fatca!.formW8Ben === true) {
    fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_FORM_W8_BEN, title: "Yes" });
  }

  const crsSummary: LabeledTitleProps[] = [
    {
      label: DECLARATION_SUMMARY.LABEL_JURISDICTION,
      labelStyle: { width: sw200 },
      spaceToLabel: sh4,
      title: OPTIONS_CRS_TAX_RESIDENCY[crs?.taxResident!].label,
    },
  ];

  if (isTaxResident === false && crs!.tin) {
    crs!.tin.forEach((multiTin, index) => {
      const countLabel = crs!.tin!.length > 1 ? ` ${index + 1}` : "";
      crsSummary.push(
        { label: `${DECLARATION_SUMMARY.LABEL_TIN_COUNTRY}${countLabel}`, title: multiTin.country! || "-" },
        { label: `${DECLARATION_SUMMARY.LABEL_TIN_NUMBER}${countLabel}`, title: multiTin.tinNumber || "-" },
      );

      if (multiTin.noTin === true) {
        const tinLabel =
          multiTin.reason === 1 ? DECLARATION_SUMMARY.OPTION_NO_TIN_REQUIRED : OPTIONS_CRS_TIN_REASONS[multiTin.reason!].label;
        crsSummary.push({
          label: `${DECLARATION_SUMMARY.LABEL_TIN_REMARKS}${countLabel}`,
          title: multiTin.reason === 2 ? multiTin.explanation! : tinLabel,
          titleStyle: fsTransformNone,
        });
      }
    });
  }

  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...borderBottomRed1,
    ...shadow12Blue104,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh64,
    position: "relative",
    zIndex: 1,
  };

  const headerTitle = accountHolder === "Principal" ? DECLARATION_SUMMARY.TITLE_PRINCIPAL : DECLARATION_SUMMARY.TITLE_JOINT;
  const scaledSpaceBetweenItem = width < 1080 ? 30 : 32;

  return (
    <Fragment>
      <View style={px(sw24)}>
        <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...shadow12Black116 }}>
          {accountType === "Individual" ? (
            <View style={headerStyle}>
              <Text style={fs24BoldGray6}>{name}</Text>
            </View>
          ) : (
            <AccountHeader headerStyle={{ height: sh64 }} spaceToBottom={0} subtitle={headerTitle} title={name} />
          )}
          <View style={borderBottomGray2}>
            <TitleIcon onPress={handleEditFatca} title={DECLARATION_SUMMARY.TITLE_FATCA} />
            <View style={px(sw24)}>
              <TextCard data={fatcaSummary} itemsPerGroup={3} spaceBetweenItem={scaledSpaceBetweenItem} />
            </View>
          </View>
          <View>
            <TitleIcon onPress={handleEditCrs} title={DECLARATION_SUMMARY.TITLE_CRS} />
            <View style={px(sw24)}>
              <TextCard data={crsSummary} itemsPerGroup={3} spaceBetweenItem={scaledSpaceBetweenItem} />
            </View>
          </View>
          {/* {feaSummary.length !== 0 ? (
            <View>
              <TitleIcon onPress={handleEditFea} title={DECLARATION_SUMMARY.TITLE_FEA} />
              <View style={px(sw24)}>
                <TextCard data={feaSummary} itemsPerGroup={3} spaceBetweenItem={sw32} />
              </View>
            </View>
          ) : null} */}
        </View>
      </View>
      {viewFile !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </Fragment>
  );
};
