import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { OnboardingMapDispatchToProps, OnboardingMapStateToProps, OnboardingStoreProps } from "../../store";
import { fs16RegGray6 } from "../../styles";
import { OrderSummary, Signatures, TermsAndConditions } from "./Acknowledgement";
import { CrsDeclaration, DeclarationSummary, FatcaDeclaration, FeaDeclaration } from "./Declarations";
import { EmailVerification } from "./EmailVerification";
import { EmploymentDetails } from "./EmploymentDetails";
import { IdentityConfirmation } from "./IdentityVerification";
import { Payment } from "./Payment";
import { PersonalDetails } from "./PersonalDetails";
import { PersonalInfoSummary } from "./PersonalInfoSummary";
import { Products } from "./Products";
import { QuestionnaireContent } from "./Questionnaire";

const { ONBOARDING } = Language.PAGE;
interface OnboardingProps extends OnboardingContentProps, OnboardingStoreProps {
  navigation: IStackNavigationProp;
  route: string;
}

const OnboardingContentComponent = ({ handleCancelOnboarding, handleResetOnboarding, cancelOnboarding, ...props }: OnboardingProps) => {
  const newProps = {
    ...props,
    handleCancelOnboarding: handleCancelOnboarding,
    handleResetOnboarding: handleResetOnboarding,
  };

  let content: JSX.Element;
  let backToDashboardLabel = ONBOARDING.LABEL_BACK_ONBOARDING;

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
    case ONBOARDING_ROUTES.FATCADeclaration:
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
    case ONBOARDING_ROUTES.Signatures:
      content = <Signatures {...newProps} />;
      break;
    case ONBOARDING_ROUTES.TermsAndConditions:
      content = <TermsAndConditions {...newProps} />;
      break;
    case ONBOARDING_ROUTES.PersonalInfoSummary:
      content = <PersonalInfoSummary {...newProps} />;
      break;
    case ONBOARDING_ROUTES.Payment:
      content = <Payment {...newProps} />;
      backToDashboardLabel = ONBOARDING.LABEL_BACK_PAYMENT;
      break;
    default:
      content = <View />;
      break;
  }
  return (
    <Fragment>
      {content}
      <ConfirmationModal
        handleCancel={handleCancelOnboarding}
        handleContinue={handleResetOnboarding}
        labelCancel={ONBOARDING.BUTTON_NO}
        labelContinue={ONBOARDING.BUTTON_YES}
        title={ONBOARDING.EDIT_TITLE}
        visible={cancelOnboarding!}>
        <Text style={fs16RegGray6}>{backToDashboardLabel}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};
export const OnboardingContent = connect(OnboardingMapStateToProps, OnboardingMapDispatchToProps)(OnboardingContentComponent);
