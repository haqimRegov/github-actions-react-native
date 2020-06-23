import { StackNavigationProp } from "@react-navigation/stack";
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
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const OnboardingContent = (props: OnboardingContentProps) => {
  switch (props.route) {
    case ONBOARDING_ROUTES.Questionnaire:
      return <QuestionnaireContent {...props} />;
    case ONBOARDING_ROUTES.FundingOptions:
      return <FundingOptionsContent {...props} />;
    case ONBOARDING_ROUTES.ProductRecommendation:
      return <ProductRecommendation {...props} />;
    case ONBOARDING_ROUTES.Address:
      return <Address {...props} />;
    case ONBOARDING_ROUTES.ContactDetails:
      return <ContactDetails {...props} />;
    case ONBOARDING_ROUTES.EmploymentDetails:
      return <EmploymentDetails {...props} />;
    case ONBOARDING_ROUTES.Declaration:
      return <Declaration {...props} />;
    case ONBOARDING_ROUTES.Confirmation:
      return <Confirmation {...props} />;
    case ONBOARDING_ROUTES.Payment:
      return <Payment {...props} />;
    default:
      return null;
  }
};
