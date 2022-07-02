import { ForceUpdateAction } from "./actions";
import { forceUpdateInitialState, ForceUpdateState } from "./state";

export function forceUpdateReducer(state = forceUpdateInitialState, action: ForceUpdateAction): ForceUpdateState {
  switch (action.type) {
    case "forceUpdate/UPDATE_STEPS":
      return {
        ...state,
        finishedSteps: [...action.payload],
      };
    case "forceUpdate/UPDATE_DISABLED_STEPS":
      return {
        ...state,
        disabledSteps: [...action.payload],
      };
    case "forceUpdate/UPDATE_FORCE_UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    case "forceUpdate/UPDATE_EMAIL_VERIFIED":
      return {
        ...state,
        emailVerified: action.payload,
      };

    case "forceUpdate/RESET_STEPS":
      return {
        disabledSteps: [
          "ContactSummary",
          "RiskAssessment",
          "Declarations",
          "FATCADeclaration",
          "CRSDeclaration",
          "DeclarationSummary",
          "Acknowledgement",
          "TermsAndConditions",
          "Signatures",
        ],
        finishedSteps: [],
      };

    case "forceUpdate/RESET_FORCE_UPDATE":
      return {
        disabledSteps: [
          "ContactSummary",
          "RiskAssessment",
          "Declarations",
          "FATCADeclaration",
          "CRSDeclaration",
          "DeclarationSummary",
          "Acknowledgement",
          "TermsAndConditions",
          "Signatures",
        ],
        finishedSteps: [],
        emailVerified: false,
      };

    default:
      return state;
  }
}
