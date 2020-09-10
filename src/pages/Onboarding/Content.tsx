import React from "react";

import { ONBOARDING_ROUTES } from "../../constants";
import { Declaration } from "./Declaration";
import { EmailVerification } from "./EmailVerification";
import { EmploymentDetails } from "./EmploymentDetails";
import { IdentityConfirmation } from "./IdentityVerification";
import { OrderSummary } from "./OrderSummary";
import { Payment } from "./Payment";
import { PersonalDetails } from "./PersonalDetails";
import { Products } from "./Products";
import { QuestionnaireContent } from "./Questionnaire";
import { Summary } from "./Summary";
import { TermsAndConditions } from "./TermsAndConditions";

export const OnboardingContent = (props: OnboardingContentProps) => {
  switch (props.route) {
    case ONBOARDING_ROUTES.Questionnaire:
      return <QuestionnaireContent {...props} />;
    case ONBOARDING_ROUTES.ProductRecommendation:
      return <Products {...props} />;
    case ONBOARDING_ROUTES.EmailVerification:
      return <EmailVerification {...props} />;
    case ONBOARDING_ROUTES.IdentityVerification:
      return <IdentityConfirmation {...props} />;
    case ONBOARDING_ROUTES.PersonalDetails:
      return <PersonalDetails {...props} />;
    case ONBOARDING_ROUTES.EmploymentDetails:
      return <EmploymentDetails {...props} />;
    case ONBOARDING_ROUTES.Declaration:
      return <Declaration {...props} />;
    case ONBOARDING_ROUTES.OrderSummary:
      return <OrderSummary {...props} />;
    case ONBOARDING_ROUTES.TermsAndConditions:
      return <TermsAndConditions {...props} />;
    case ONBOARDING_ROUTES.Summary:
      return <Summary {...props} />;
    case ONBOARDING_ROUTES.Payment:
      return <Payment {...props} />;
    default:
      return null;
  }
};
