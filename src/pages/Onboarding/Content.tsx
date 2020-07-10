import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

import { ONBOARDING_ROUTES } from "../../constants";
import { Acknowledgement } from "./Acknowledgement";
import { Address } from "./Address";
import { Declaration } from "./Declaration";
import { EmploymentDetails } from "./EmploymentDetails";
import { Payment } from "./Payment";
import { PersonalDetails } from "./PersonalDetails";
import { Products } from "./Products";
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
    case ONBOARDING_ROUTES.ProductRecommendation:
      return <Products {...props} />;
    case ONBOARDING_ROUTES.Address:
      return <Address {...props} />;
    case ONBOARDING_ROUTES.PersonalDetails:
      return <PersonalDetails {...props} />;
    case ONBOARDING_ROUTES.EmploymentDetails:
      return <EmploymentDetails {...props} />;
    case ONBOARDING_ROUTES.Declaration:
      return <Declaration {...props} />;
    case ONBOARDING_ROUTES.Acknowledgement:
      return <Acknowledgement {...props} />;
    case ONBOARDING_ROUTES.Payment:
      return <Payment {...props} />;
    default:
      return null;
  }
};
