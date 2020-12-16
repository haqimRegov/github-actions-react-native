import { OnboardingAction } from "./actions";
import { onboardingInitialState, OnboardingState } from "./state";

export function onboardingReducer(state = onboardingInitialState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case "onboarding/UPDATE_STEPS":
      return {
        ...state,
        finishedSteps: [...action.payload],
      };

    case "onboarding/RESET_STEPS":
      return {
        ...onboardingInitialState,
      };

    default:
      return state;
  }
}
