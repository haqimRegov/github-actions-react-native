import React from "react";

import { ONBOARDING_ROUTES } from "../../constants";
import { Address } from "./Address";
import { Confirmation } from "./Confirmation";
import { ContactDetails } from "./ContactDetails";
import { Declaration } from "./Declaration";
import { EmploymentDetails } from "./EmploymentDetails";
import { FundingOptionsContent } from "./FundingOptions";
import { Payment } from "./Payment";
import { ProductRecommendation } from "./ProductRecommendation";
import { QuestionnaireContent } from "./Questionnaire";

interface OnboardingContentProps {
  route: string;
  handleNextStep: (route: string) => void;
}

export const OnboardingContent = ({ route, handleNextStep }: OnboardingContentProps) => {
  switch (route) {
    case ONBOARDING_ROUTES.Questionnaire:
      return <QuestionnaireContent handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.FundingOptions:
      return <FundingOptionsContent handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.ProductRecommendation:
      return <ProductRecommendation handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.Address:
      return <Address handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.ContactDetails:
      return <ContactDetails handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.EmploymentDetails:
      return <EmploymentDetails handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.Declaration:
      return <Declaration handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.Confirmation:
      return <Confirmation handleNextStep={handleNextStep} />;
    case ONBOARDING_ROUTES.Payment:
      return <Payment handleNextStep={handleNextStep} />;
    default:
      return null;
  }
};
