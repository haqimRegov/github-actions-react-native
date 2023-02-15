import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";
import { connect } from "react-redux";

import { CheckBox, ContentPage, CustomFlexSpacer, CustomSpacer, CustomTooltip, LinkText } from "../../../components";
import { Language } from "../../../constants/language";
import { CRS, DICTIONARY_LINK_FULL_TERMS, FATCA, PRS, UTAndAMP } from "../../../data/dictionary";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  alignItemsStart,
  alignSelfCenter,
  borderBottomGray2,
  disabledOpacity5,
  flexRow,
  fs12BoldWhite1,
  fs12SemiBoldBlue1,
  fs16SemiBoldGray6,
  justifyContentEnd,
  px,
  sh16,
  sh24,
  sh32,
  sh456,
  sh8,
  sw12,
  sw24,
  sw265,
  sw7,
  sw800,
} from "../../../styles";
import { TermsAccordion } from "../../../templates";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

interface TermsAndConditionsProps extends OnboardingContentProps, AcknowledgementStoreProps {}

const TermsAndConditionsComponent: FunctionComponent<TermsAndConditionsProps> = ({
  agreeTerms,
  handleNextStep,
  orders,
  onboarding,
  outsideRisk,
  updateAgree,
  updateOnboarding,
}: TermsAndConditionsProps) => {
  const { disabledSteps } = onboarding;
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

  const handleBack = () => {
    handleNextStep("OrderSummary");
  };

  const handleContinue = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findSignatures = updatedDisabledSteps.indexOf("Signatures");
    if (findSignatures !== -1) {
      updatedDisabledSteps.splice(findSignatures, 1);
    }
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
    handleNextStep("Signatures");
  };

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  const fundTypeArray: string[] =
    orders !== undefined
      ? orders.orders.map((order: IOrder) => order.investments.map((investment: IOrderInvestment) => investment.fundType)).flat()
      : [];

  const TERMS_AND_CONDITION_LIST: ITermsAccordionSection[] = [FATCA, CRS];
  if (fundTypeArray.includes("UTF") || fundTypeArray.includes("UT") || fundTypeArray.includes("AMP") || fundTypeArray.includes("WSF")) {
    TERMS_AND_CONDITION_LIST.push(UTAndAMP);
  }

  if (fundTypeArray.includes("PRS") || fundTypeArray.includes("PRS Default")) {
    TERMS_AND_CONDITION_LIST.push(PRS);
  }

  const GENERAL: ITermsAccordionSection = {
    title: "General Terms and Conditions",
    custom: (
      <View>
        <PDFView style={{ height: sh456 }} resource={DICTIONARY_LINK_FULL_TERMS} resourceType="url" />
        <CustomSpacer space={sh24} />
      </View>
    ),
  };

  TERMS_AND_CONDITION_LIST.push(GENERAL);

  const headerText = expandAll === true ? TERMS_AND_CONDITIONS.LABEL_COLLAPSE_ALL : TERMS_AND_CONDITIONS.LABEL_EXPAND_ALL;

  const termsHeader: ViewStyle = { ...flexRow, ...alignSelfCenter, zIndex: 2 };
  const disabled = !(agreeTerms.agree1 === true && agreeTerms.agree2 === true && agreeTerms.agree3 === true);

  if (!disabledSteps.includes("Signatures") && disabled === true) {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps, "Signatures"];
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
  }

  return (
    <ContentPage
      continueDisabled={disabled}
      handleCancel={handleBack}
      handleContinue={handleContinue}
      labelContinue={TERMS_AND_CONDITIONS.BUTTON_AGREE}
      subheading={TERMS_AND_CONDITIONS.HEADING}
      spaceToHeading={0}>
      {TERMS_AND_CONDITION_LIST.length === 0 ? null : (
        <Fragment>
          <View style={px(sw24)}>
            <CustomSpacer space={sh8} />
            <View style={termsHeader}>
              <Text style={fs16SemiBoldGray6}>{TERMS_AND_CONDITIONS.SUBHEADING}</Text>
              <CustomSpacer isHorizontal={true} space={sw12} />
              <CustomTooltip
                arrowSize={{ width: sw12, height: sw7 }}
                content={<Text style={fs12BoldWhite1}>{TERMS_AND_CONDITIONS.POPUP_TERMS}</Text>}
                contentStyle={{ width: sw265 }}
              />
              <CustomFlexSpacer />
              <View style={justifyContentEnd}>
                <LinkText onPress={handleExpandAll} style={fs12SemiBoldBlue1} text={headerText} />
              </View>
            </View>
            <CustomSpacer space={sh24} />
            <TermsAccordion expandAll={expandAll} expandMultiple={true} sections={TERMS_AND_CONDITION_LIST} />
            <CustomSpacer space={sh32} />
          </View>
          <View style={borderBottomGray2} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_1}
              labelStyle={{ fontSize: sh16 }}
              onPress={handleAgree1}
              toggle={agreeTerms.agree1}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_2}
              labelStyle={{ fontSize: sh16 }}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={handleAgree2}
              toggle={agreeTerms.agree2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_3}
              labelStyle={{ fontSize: sh16 }}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={handleAgree3}
              toggle={agreeTerms.agree3}
            />
            <CustomSpacer space={sh16} />
            {outsideRisk === true ? (
              <Fragment>
                <CheckBox
                  checkboxStyle={disabledOpacity5}
                  label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_4}
                  labelStyle={{ fontSize: sh16 }}
                  onPress={() => {}}
                  toggle={true}
                />
                <CustomSpacer space={sh16} />
              </Fragment>
            ) : null}
            <CheckBox
              checkboxStyle={disabledOpacity5}
              label={TERMS_AND_CONDITIONS.LABEL_CONSENT}
              labelStyle={{ fontSize: sh16 }}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={() => {}}
              toggle={true}
            />
          </View>
        </Fragment>
      )}
    </ContentPage>
  );
};

export const TermsAndConditions = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(TermsAndConditionsComponent);
