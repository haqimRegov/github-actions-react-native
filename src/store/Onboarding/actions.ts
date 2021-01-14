import { typedAction } from "../actionCreator";
import { OnboardingState } from "./state";

export const updateDisabledSteps = (steps: TypeOnboardingKey[]) => {
  return typedAction("onboarding/UPDATE_DISABLED_STEPS", steps);
};

export const updateFinishedSteps = (steps: TypeOnboardingKey[]) => {
  return typedAction("onboarding/UPDATE_STEPS", steps);
};

export const updateOnboarding = (onboarding: OnboardingState) => {
  return typedAction("onboarding/UPDATE_ONBOARDING", onboarding);
};

export const resetSteps = () => {
  return typedAction("onboarding/RESET_STEPS");
};

export type OnboardingAction = ReturnType<
  typeof resetSteps | typeof updateFinishedSteps | typeof updateDisabledSteps | typeof updateOnboarding
>;

export const OnboardingActionProps = { resetSteps, updateDisabledSteps, updateFinishedSteps, updateOnboarding };

export type OnboardingActionsType = typeof OnboardingActionProps;
