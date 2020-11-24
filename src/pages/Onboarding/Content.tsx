import { CommonActions } from "@react-navigation/native";
import React, { Fragment, useState } from "react";
import { Text, View } from "react-native";

import { ConfirmationModal } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { fs16BoldBlack2 } from "../../styles";
import { CrsDeclaration, DeclarationSummary, FatcaDeclaration, FeaDeclaration } from "./Declarations";
import { EmailVerification } from "./EmailVerification";
import { EmploymentDetails } from "./EmploymentDetails";
import { IdentityConfirmation } from "./IdentityVerification";
import { OrderSummary } from "./OrderSummary";
import { Payment } from "./Payment";
import { PersonalDetails } from "./PersonalDetails";
import { Products } from "./Products";
import { QuestionnaireContent } from "./Questionnaire";
import { Summary } from "./Summary";
import { TermsAndConditionsPages } from "./TermsAndConditions";

const { ONBOARDING } = Language.PAGE;

export const OnboardingContent = (props: OnboardingProps) => {
  const { navigation, resetClientDetails, resetPersonalInfo } = props;
  const [cancelOnboarding, setCancelOnboarding] = useState<boolean>(false);

  const handleCancelOnboarding = () => {
    setCancelOnboarding(!cancelOnboarding);
  };

  const handleResetOnboarding = () => {
    setCancelOnboarding(false);
    resetClientDetails();
    resetPersonalInfo();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      }),
    );
  };

  const newProps = {
    ...props,
    handleCancelOnboarding: handleCancelOnboarding,
  };

  let content: JSX.Element = <View />;

  switch (newProps.route) {
    case ONBOARDING_ROUTES.RiskAssessment:
      content = <QuestionnaireContent {...newProps} />;
      break;
    case ONBOARDING_ROUTES.ProductRecommendation:
      content = <Products {...newProps} />;
      break;
    case ONBOARDING_ROUTES.EmailVerification:
      content = <EmailVerification {...newProps} />;
      break;
    case ONBOARDING_ROUTES.IdentityVerification:
      content = <IdentityConfirmation {...newProps} />;
      break;
    case ONBOARDING_ROUTES.PersonalDetails:
      content = <PersonalDetails {...newProps} />;
      break;
    case ONBOARDING_ROUTES.EmploymentDetails:
      content = <EmploymentDetails {...newProps} />;
      break;
    case ONBOARDING_ROUTES.FATCADeclarations:
      content = <FatcaDeclaration {...newProps} />;
      break;
    case ONBOARDING_ROUTES.CRSDeclaration:
      content = <CrsDeclaration {...newProps} />;
      break;
    case ONBOARDING_ROUTES.FEADeclarations:
      content = <FeaDeclaration {...newProps} />;
      break;
    case ONBOARDING_ROUTES.DeclarationSummary:
      content = <DeclarationSummary {...newProps} />;
      break;
    case ONBOARDING_ROUTES.OrderSummary:
      content = <OrderSummary {...newProps} />;
      break;
    case ONBOARDING_ROUTES.TermsAndConditions:
      content = <TermsAndConditionsPages {...newProps} />;
      break;
    case ONBOARDING_ROUTES.Summary:
      content = <Summary {...newProps} />;
      break;
    case ONBOARDING_ROUTES.Payment:
      content = <Payment {...newProps} />;
      break;
    default:
      content = <View />;
      break;
  }
  return (
    <Fragment>
      {content}
      <ConfirmationModal
        handleCancel={handleCancelOnboarding!}
        handleContinue={handleResetOnboarding}
        labelCancel={ONBOARDING.BUTTON_NO}
        labelContinue={ONBOARDING.BUTTON_YES}
        title={ONBOARDING.EDIT_TITLE}
        visible={cancelOnboarding!}>
        <Text style={fs16BoldBlack2}>{ONBOARDING.EDIT_LABEL}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};
