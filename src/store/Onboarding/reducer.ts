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
          "ProductsList",
          "ProductsConfirmation",
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
        toast: undefined,
      };

    case "onboarding/UPDATE_ONBOARDING_TOAST":
      return {
        ...state,
        toast: action.payload,
      };

    case "onboarding/RESET_ONBOARDING_TOAST":
      return {
        ...state,
        toast: undefined,
      };

    default:
      return state;
  }
}
