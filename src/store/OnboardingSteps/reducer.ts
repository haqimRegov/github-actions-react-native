import { OnboardingStepsAction } from "./actions";
import { onboardingStepsInitialState, OnboardingStepsState } from "./state";

export function onboardingStepsReducer(state = onboardingStepsInitialState, action: OnboardingStepsAction): OnboardingStepsState {
  switch (action.type) {
    case "onboarding/UPDATE_STEPS":
      return {
        ...state,
        finishedStep: [...action.payload],
      };

    default:
      return state;
  }
}
