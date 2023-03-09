import React, { Fragment, FunctionComponent, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { CheckBox, ContentPage, CustomFlexSpacer, CustomSpacer, CustomTooltip } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_LINK_FULL_TERMS, PRS, TermsTransactions, UTAndAMP } from "../../data/dictionary";
import { IcoMoon } from "../../icons";
import { acknowledgementState } from "../../store";
import {
  alignItemsStart,
  alignSelfCenter,
  borderBottomBlue4,
  colorBlue,
  disabledOpacity5,
  disabledOpacity6,
  flexRow,
  fs12BoldBlue1,
  fs12BoldWhite1,
  fs14RegGray5,
  fs16RegBlack2,
  justifyContentEnd,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh32,
  sh4,
  sh456,
  sh6,
  sw10,
  sw14,
  sw24,
  sw265,
  sw4,
  sw800,
} from "../../styles";
import { TermsAccordionNew } from "../Onboarding";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

interface ITermsAndConditionsProps {
  agreeTerms: IAgreeTerms;
  fundTypeArray: string[];
  handleBack?: () => void;
  handleContinue: () => void;
  outsideRisk?: boolean;
  transactionType: TTransactionType;
  updateAgree: (state: acknowledgementState) => void;
}

export const TermsAndConditionsTemplate: FunctionComponent<ITermsAndConditionsProps> = ({
  agreeTerms,
  fundTypeArray,
  handleBack,
  handleContinue,
  outsideRisk,
  transactionType,
  updateAgree,
}: ITermsAndConditionsProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const handleAgree1 = () => {
    updateAgree({ agreeTerms: { ...agreeTerms, agree1: !agreeTerms.agree1 } });
  };

  const handleAgree2 = () => {
    updateAgree({ agreeTerms: { ...agreeTerms, agree2: !agreeTerms.agree2 } });
  };

  const handleAgree3 = () => {
    updateAgree({ agreeTerms: { ...agreeTerms, agree3: !agreeTerms.agree3 } });
  };

  const TERMS_AND_CONDITION_LIST: ITermsAccordionSection[] = [];

  if (transactionType === "Sales") {
    TERMS_AND_CONDITION_LIST.push(TermsTransactions);
  }

  if (
    transactionType !== "Sales" &&
    (fundTypeArray.includes("UTF") || fundTypeArray.includes("UT") || fundTypeArray.includes("AMP") || fundTypeArray.includes("WSF"))
  ) {
    TERMS_AND_CONDITION_LIST.push(UTAndAMP);
  }

  if (transactionType !== "Sales" && (fundTypeArray.includes("PRS") || fundTypeArray.includes("PRS Default"))) {
    TERMS_AND_CONDITION_LIST.push(PRS);
  }

  const GENERAL: ITermsAccordionSection = {
    title: TERMS_AND_CONDITIONS.LABEL_GENERAL_TERMS_AND_CONDITIONS,
    custom: (
      <View>
        <PDFView style={{ height: sh456 }} resource={DICTIONARY_LINK_FULL_TERMS} resourceType="url" />
        <CustomSpacer space={sh24} />
      </View>
    ),
  };

  TERMS_AND_CONDITION_LIST.push(GENERAL);

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    if (activeSections.length === TERMS_AND_CONDITION_LIST.length) {
      setActiveSections([]);
      setExpandAll(true);
    } else {
      const allActiveSections: number[] = [];
      TERMS_AND_CONDITION_LIST.forEach((_section, index) => {
        return allActiveSections.push(index);
      });
      setActiveSections(allActiveSections);
    }
  };

  const headerText =
    activeSections.length === TERMS_AND_CONDITION_LIST.length
      ? TERMS_AND_CONDITIONS.LABEL_COLLAPSE_ALL
      : TERMS_AND_CONDITIONS.LABEL_EXPAND_ALL;

  const termsHeader: ViewStyle = { ...flexRow, ...alignSelfCenter, zIndex: 2 };
  const disabled = !(agreeTerms.agree1 === true && agreeTerms.agree2 === true && agreeTerms.agree3 === true);

  return (
    <ContentPage
      continueDisabled={disabled}
      handleCancel={handleBack}
      handleContinue={handleContinue}
      labelContinue={TERMS_AND_CONDITIONS.BUTTON_AGREE}
      subheading={TERMS_AND_CONDITIONS.HEADING_TERMS}>
      {TERMS_AND_CONDITION_LIST.length === 0 ? null : (
        <Fragment>
          <View style={px(sw24)}>
            <CustomSpacer space={sh4} />
            <View style={termsHeader}>
              <View style={rowCenterVertical}>
                <Text style={fs14RegGray5}>{TERMS_AND_CONDITIONS.SUBHEADING_NEW}</Text>
                <CustomTooltip
                  arrowSize={{ width: sw10, height: sh6 }}
                  content={<Text style={fs12BoldWhite1}>{TERMS_AND_CONDITIONS.POPUP_TERMS}</Text>}
                  contentStyle={{ width: sw265 }}
                  theme="dark"
                />
              </View>
              <CustomFlexSpacer />
              <Pressable onPress={handleExpandAll} style={{ ...justifyContentEnd, ...rowCenterVertical }}>
                <View>
                  <IcoMoon color={colorBlue._1} name={expandAll ? "expand" : "collapse"} size={sw14} />
                </View>
                <CustomSpacer isHorizontal space={sw4} />
                <Text style={fs12BoldBlue1}>{headerText}</Text>
              </Pressable>
            </View>
            <CustomSpacer space={sh24} />
            <TermsAccordionNew
              activeSections={activeSections}
              expandMultiple={true}
              sections={TERMS_AND_CONDITION_LIST}
              setActiveSections={setActiveSections}
            />
            <CustomSpacer space={sh32} />
          </View>
          <View style={borderBottomBlue4} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_1_NEW}
              onPress={handleAgree1}
              toggle={agreeTerms.agree1}
              labelStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_2_NEW_SALES}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={handleAgree2}
              toggle={agreeTerms.agree2}
              labelStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_3_NEW_SALES}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={handleAgree3}
              toggle={agreeTerms.agree3}
              labelStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh16} />
            {outsideRisk === true ? (
              <Fragment>
                <CheckBox
                  checkboxStyle={disabledOpacity5}
                  label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_4}
                  style={{ ...alignItemsStart, width: sw800 }}
                  onPress={() => {}}
                  toggle={true}
                  labelStyle={{ ...fs16RegBlack2, ...disabledOpacity6 }}
                />
                <CustomSpacer space={sh16} />
              </Fragment>
            ) : null}
            <CheckBox
              checkboxStyle={disabledOpacity5}
              label={TERMS_AND_CONDITIONS.LABEL_CONSENT_NEW}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={() => {}}
              toggle={true}
              labelStyle={{ ...fs16RegBlack2, ...disabledOpacity6 }}
            />
          </View>
        </Fragment>
      )}
    </ContentPage>
  );
};
