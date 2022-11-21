import React, { Fragment, FunctionComponent, useState } from "react";
import { Dimensions, Text, View } from "react-native";

import {
  ColorCard,
  CustomFlexSpacer,
  CustomSpacer,
  FileViewer,
  IconButton,
  IconText,
  TextCard,
  TextCardProps,
} from "../../../../components";
import { Language } from "../../../../constants";
import { OPTIONS_CRS_TAX_RESIDENCY, OPTIONS_CRS_TIN_REASONS } from "../../../../data/dictionary";
import {
  border,
  borderBottomBlue4,
  circle,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  fs16BoldBlack2,
  fs16BoldBlue1,
  fsTransformNone,
  noBorder,
  px,
  rowCenterVertical,
  sh12,
  sh16,
  sh2,
  sh24,
  sh8,
  sw1,
  sw16,
  sw200,
  sw216,
  sw24,
  sw40,
  sw8,
} from "../../../../styles";

const { DECLARATIONS, DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationDetailsProps {
  address?: string;
  declarations: string[];
  handleEditCrs: () => void;
  handleEditFatca: () => void;
  summary: IDeclarationState;
}

export const DeclarationDetails: FunctionComponent<DeclarationDetailsProps> = ({
  address,
  declarations,
  handleEditCrs,
  handleEditFatca,
  summary,
}: DeclarationDetailsProps) => {
  const { width } = Dimensions.get("window");
  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);

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

  if (fatca!.usCitizen === 1) {
    fatcaSummary.splice(1, 0, { label: DECLARATION_SUMMARY.LABEL_US_BORN, title: fatca!.usBorn === 0 ? "Yes" : "No" });
    if (fatca!.usBorn === 0) {
      if (fatca!.certificate !== undefined) {
        fatcaSummary.push({
          label: DECLARATION_SUMMARY.LABEL_CERTIFICATE,
          title: fatca!.certificate.name,
          titleIcon: "file",
          spaceToIcon: sw8,
          titleStyle: { ...fsTransformNone, maxWidth: sw216 },
          onPress: handleView,
        });
      } else {
        fatcaSummary.push(
          { label: DECLARATION_SUMMARY.LABEL_CERTIFICATE, title: DECLARATION_SUMMARY.LABEL_CANT_UPLOAD, titleStyle: fsTransformNone },
          {
            label: DECLARATION_SUMMARY.LABEL_CERTIFICATE_REASON_NEW,
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
      if (fatca!.confirmAddress === 0) {
        fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_RESIDENT, title: address || "-", titleStyle: fsTransformNone });
      }
    }
  }

  if (fatca!.formW9 === true || fatca!.formW8Ben === true) {
    const form = fatca!.formW9 === true ? DECLARATION_SUMMARY.LABEL_FORM_W9_NEW : DECLARATION_SUMMARY.LABEL_FORM_W8_BEN_NEW;
    fatcaSummary.push({ label: DECLARATION_SUMMARY.LABEL_PHYSICAL, title: form, titleStyle: fsTransformNone });
  }
  let crsSummary: LabeledTitleProps[] = [];

  if (declarations.includes("crs")) {
    crsSummary = [
      {
        label: DECLARATION_SUMMARY.LABEL_JURISDICTION_NEW,
        labelStyle: { lineHeight: sh16, width: sw200 },
        spaceToLabel: sh2,
        title: OPTIONS_CRS_TAX_RESIDENCY[crs?.taxResident!].label,
      },
    ];
  }

  const scaledSpaceBetweenItem = width < 1080 ? 30 : 31;

  const textCardProps: Partial<TextCardProps> = {
    itemsPerGroup: 3,
    spaceBetweenItem: scaledSpaceBetweenItem,
  };

  return (
    <View>
      {declarations.includes("fatca") ? (
        <ColorCard
          containerStyle={noBorder}
          header="custom"
          customHeader={
            <View style={rowCenterVertical}>
              <CustomSpacer isHorizontal={true} space={sw24} />
              <Text style={fs16BoldBlue1}>{DECLARATION_SUMMARY.TITLE_FATCA}</Text>
              <CustomFlexSpacer />
              <IconButton
                color={colorBlue._1}
                name="pencil"
                onPress={handleEditFatca}
                style={circle(sw40)}
                withHover={{ color: colorBlue._2 }}
              />
              <CustomSpacer isHorizontal={true} space={sw16} />
            </View>
          }
          headerStyle={{ ...border(colorGray._2, sw1), backgroundColor: colorWhite._1, ...px(0) }}
          contentStyle={{ ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 }}
          content={<TextCard data={fatcaSummary} {...textCardProps} />}
        />
      ) : null}
      {declarations.includes("crs") ? (
        <Fragment>
          <CustomSpacer space={sh24} />
          <ColorCard
            containerStyle={noBorder}
            header="custom"
            customHeader={
              <View style={rowCenterVertical}>
                <CustomSpacer isHorizontal={true} space={sw24} />
                <Text style={fs16BoldBlue1}>{DECLARATION_SUMMARY.TITLE_CRS}</Text>
                <CustomFlexSpacer />
                <IconButton
                  color={colorBlue._1}
                  name="pencil"
                  onPress={handleEditCrs}
                  style={circle(sw40)}
                  withHover={{ color: colorBlue._2 }}
                />
                <CustomSpacer isHorizontal={true} space={sw16} />
              </View>
            }
            headerStyle={{ ...border(colorGray._2, sw1), backgroundColor: colorWhite._1, ...px(0) }}
            contentStyle={{ ...border(colorGray._2, sw1), ...px(sw24), paddingBottom: sh8 }}
            content={
              <View>
                <TextCard data={crsSummary} {...textCardProps} />
                {isTaxResident === false && crs!.tin ? (
                  <Fragment>
                    {crs!.tin.map((multiTin: ITinMultiple, multiTinIndex: number) => {
                      const tinSummary: LabeledTitleProps[] = [];
                      tinSummary.push(
                        {
                          label: `${DECLARATION_SUMMARY.LABEL_TIN_NEW} ${DECLARATION_SUMMARY.LABEL_RESIDENCE}`,
                          title: multiTin.country! || "-",
                        },
                        { label: `${DECLARATION_SUMMARY.LABEL_TIN_NUMBER}`, title: multiTin.tinNumber || "-" },
                      );

                      if (multiTin.noTin === true) {
                        const tinLabel =
                          multiTin.reason === 1
                            ? DECLARATION_SUMMARY.OPTION_NO_TIN_REQUIRED_NEW
                            : OPTIONS_CRS_TIN_REASONS[multiTin.reason!].label;
                        tinSummary.push({
                          label: `${DECLARATION_SUMMARY.LABEL_TIN_REMARKS}`,
                          title: multiTin.reason === 2 ? multiTin.explanation! : tinLabel,
                          titleStyle: fsTransformNone,
                        });
                      }
                      return (
                        <View key={multiTinIndex}>
                          <CustomSpacer space={sh8} />
                          <View style={rowCenterVertical}>
                            <IconText
                              name="tax-card"
                              iconSize={sw24}
                              text={`${DECLARATION_SUMMARY.LABEL_TAX_PAYER} ${multiTinIndex + 1}`}
                              textStyle={fs16BoldBlack2}
                            />
                            <CustomSpacer isHorizontal={true} space={sw16} />
                            <View style={{ ...borderBottomBlue4, ...flexChild }} />
                            <CustomSpacer isHorizontal={true} space={sw24} />
                          </View>
                          <CustomSpacer space={sh12} />
                          <TextCard data={tinSummary} {...textCardProps} />
                        </View>
                      );
                    })}
                  </Fragment>
                ) : null}
              </View>
            }
          />
        </Fragment>
      ) : null}
      {viewFile !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="base64" value={viewFile} visible={viewFile !== undefined} />
      ) : null}
    </View>
  );
};
