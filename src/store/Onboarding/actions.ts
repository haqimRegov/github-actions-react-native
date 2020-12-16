import { typedAction } from "../actionCreator";

export const updateFinishedSteps = (steps: TypeOnboardingKey[]) => {
  return typedAction("onboarding/UPDATE_STEPS", steps);
};

export const resetSteps = () => {
  return typedAction("onboarding/RESET_STEPS");
};

export type OnboardingAction = ReturnType<typeof resetSteps | typeof updateFinishedSteps>;

export const OnboardingActionProps = { resetSteps, updateFinishedSteps };

export type OnboardingActionsType = typeof OnboardingActionProps;
