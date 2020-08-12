import { OnboardingAction } from "./actions";
import { onboardingInitialState, OnboardingState } from "./state";

export function onboardingReducer(state = onboardingInitialState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case "onboarding/ADD_ASSESSMENT":
      return {
        ...state,
        riskAssessment: { ...state.riskAssessment, ...action.payload },
      };
    case "onboarding/ADD_QUESTIONS":
      return {
        ...state,
        questionnaire: { ...state.questionnaire, ...action.payload },
      };
    case "client/RESET_ASSESSMENT":
      return {
        ...state,
        riskAssessment: undefined,
      };
    case "client/RESET_QUESTIONNAIRE":
      return {
        ...state,
        questionnaire: { ...onboardingInitialState.questionnaire },
      };

    default:
      return state;
  }
}
