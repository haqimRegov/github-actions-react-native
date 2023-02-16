import { OnboardingAction } from "./actions";
import { onboardingInitialState, OnboardingState } from "./state";

export function onboardingReducer(state = onboardingInitialState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case "onboarding/ADD_RISK_INFO":
      return {
        ...state,
        riskInfo: { ...action.payload },
      };

    case "onboarding/UPDATE_STEPS":
      return {
        ...state,
        finishedSteps: [...action.payload],
      };
    case "onboarding/UPDATE_DISABLED_STEPS":
      return {
        ...state,
        disabledSteps: [...action.payload],
      };
    case "onboarding/UPDATE_ONBOARDING":
      return {
        ...state,
        ...action.payload,
      };

    case "onboarding/RESET_ONBOARDING":
      return {
        disabledSteps: [
          "RiskAssessment",
          "Products",
          "PersonalInformation",
          "EmailVerification",
          "IdentityVerification",
          "ContactDetails",
          "EmploymentDetails",
          "AdditionalDetails",
          "PersonalInfoSummary",
          "Declarations",
          "FATCADeclaration",
          "CRSDeclaration",
          "DeclarationSummary",
          "Acknowledgement",
          "OrderSummary",
          "TermsAndConditions",
          "Signatures",
          "Payment",
        ],
        finishedSteps: [],
        riskInfo: {
          appetite: "",
          profile: "",
          expectedRange: "",
          fundSuggestion: "",
          hnwStatus: "",
          type: "",
        },
      };

    default:
      return state;
  }
}
