import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";
import { connect } from "react-redux";

import { CheckBox, ContentPage, CustomAccordion, CustomFlexSpacer, CustomPopup, CustomSpacer, LinkText } from "../../../components";
import { Language } from "../../../constants/language";
import { CRS, DICTIONARY_LINK_FULL_TERMS, FATCA, FEA, PRS, UTAndAMP } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  alignItemsStart,
  alignSelfCenter,
  borderBottomBlack21,
  disabledOpacity,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldBlue2,
  fs16SemiBoldBlack2,
  justifyContentEnd,
  px,
  sh16,
  sh24,
  sh32,
  sh456,
  sh5,
  sh8,
  sw12,
  sw24,
  sw800,
} from "../../../styles";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

interface TermsAndConditionsProps extends OnboardingContentProps, AcknowledgementStoreProps {}

const TermsAndConditionsComponent: FunctionComponent<TermsAndConditionsProps> = ({
  handleNextStep,
  orders,
  onboarding,
  outsideRisk,
  updateOnboarding,
}: TermsAndConditionsProps) => {
  const [agree1, setAgree1] = useState<boolean>(false);
  const [agree2, setAgree2] = useState<boolean>(false);
  const [agree3, setAgree3] = useState<boolean>(false);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const handleAgree1 = () => {
    setAgree1(!agree1);
  };

  const handleAgree2 = () => {
    setAgree2(!agree2);
  };

  const handleAgree3 = () => {
    setAgree3(!agree3);
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

  const TERMS_AND_CONDITION_LIST: ICustomAccordionSection[] = [FATCA, CRS, FEA];
  if (fundTypeArray.includes("UTF") || fundTypeArray.includes("UT") || fundTypeArray.includes("AMP") || fundTypeArray.includes("WSF")) {
    TERMS_AND_CONDITION_LIST.push(UTAndAMP);
  }

  if (fundTypeArray.includes("PRS")) {
    TERMS_AND_CONDITION_LIST.push(PRS);
  }

  const GENERAL: ICustomAccordionSection = {
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
  const disabled = !(agree1 === true && agree2 === true && agree3 === true);

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
              <Text style={fs16SemiBoldBlack2}>{TERMS_AND_CONDITIONS.SUBHEADING}</Text>
              <CustomSpacer isHorizontal={true} space={sw12} />
              <CustomPopup popupText={TERMS_AND_CONDITIONS.POPUP_TERMS}>
                <IcoMoon name="info" size={sw24} />
              </CustomPopup>
              <CustomFlexSpacer />
              <View style={justifyContentEnd}>
                <LinkText onPress={handleExpandAll} style={{ ...fs12SemiBoldBlue2, lineHeight: sh16 }} text={headerText} />
              </View>
            </View>
            <CustomSpacer space={sh24} />
            <CustomAccordion expandAll={expandAll} expandMultiple={true} sections={TERMS_AND_CONDITION_LIST} />
            <CustomSpacer space={sh32} />
          </View>
          <View style={borderBottomBlack21} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <CheckBox label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_1} labelStyle={fs12BoldBlack2} onPress={handleAgree1} toggle={agree1} />
            <CustomSpacer space={sh16} />
            <CheckBox
              checkboxStyle={{ paddingTop: sh5 }}
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_2}
              labelStyle={fs12BoldBlack2}
              style={{ ...fs12BoldBlack2, ...alignItemsStart }}
              onPress={handleAgree2}
              toggle={agree2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              checkboxStyle={{ paddingTop: sh5 }}
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_3}
              labelStyle={fs12BoldBlack2}
              style={{ ...fs12BoldBlack2, ...alignItemsStart, width: sw800 }}
              onPress={handleAgree3}
              toggle={agree3}
            />
            <CustomSpacer space={sh16} />
            {outsideRisk === true ? (
              <Fragment>
                <CheckBox
                  checkboxStyle={{ ...disabledOpacity, paddingTop: sh5 }}
                  label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_4}
                  labelStyle={fs12BoldBlack2}
                  onPress={() => {}}
                  toggle={true}
                />
                <CustomSpacer space={sh16} />
              </Fragment>
            ) : null}
            <CheckBox
              checkboxStyle={{ ...disabledOpacity, paddingTop: sh5 }}
              label={TERMS_AND_CONDITIONS.POPUP_CONSENT}
              labelStyle={fs12BoldBlack2}
              style={{ ...fs12BoldBlack2, ...alignItemsStart, width: sw800 }}
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
