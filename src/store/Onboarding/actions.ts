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

export const resetOnboarding = () => {
  return typedAction("onboarding/RESET_ONBOARDING");
};

export type OnboardingAction = ReturnType<
  typeof resetOnboarding | typeof updateFinishedSteps | typeof updateDisabledSteps | typeof updateOnboarding
>;

export const OnboardingActionProps = { resetOnboarding, updateDisabledSteps, updateFinishedSteps, updateOnboarding };

export type OnboardingActionsType = typeof OnboardingActionProps;
