import { typedAction } from "../actionCreator";

export const updateFinishedSteps = (steps: TypeOnboardingRoute[]) => {
  return typedAction("onboarding/UPDATE_STEPS", steps);
};

export type OnboardingStepsAction = ReturnType<typeof updateFinishedSteps>;
