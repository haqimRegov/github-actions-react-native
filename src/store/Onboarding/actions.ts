import { typedAction } from "../actionCreator";
import { OnboardingState } from "./state";

export const addOnboardingRiskInfo = (value: IRiskProfile) => {
  return typedAction("onboarding/ADD_RISK_INFO", value);
};

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
  typeof addOnboardingRiskInfo | typeof resetOnboarding | typeof updateFinishedSteps | typeof updateDisabledSteps | typeof updateOnboarding
>;

export const OnboardingActionProps = { addOnboardingRiskInfo, resetOnboarding, updateDisabledSteps, updateFinishedSteps, updateOnboarding };

export type OnboardingActionsType = typeof OnboardingActionProps;
