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

export const updateOnboardingToast = (toast: string | undefined) => {
  return typedAction("onboarding/UPDATE_ONBOARDING_TOAST", toast);
};

export const resetOnboardingToast = () => {
  return typedAction("onboarding/RESET_ONBOARDING_TOAST");
};

export type OnboardingAction = ReturnType<
  | typeof addOnboardingRiskInfo
  | typeof resetOnboarding
  | typeof resetOnboardingToast
  | typeof updateDisabledSteps
  | typeof updateFinishedSteps
  | typeof updateOnboarding
  | typeof updateOnboardingToast
>;

export const OnboardingActionProps = {
  addOnboardingRiskInfo,
  resetOnboarding,
  resetOnboardingToast,
  updateDisabledSteps,
  updateFinishedSteps,
  updateOnboarding,
  updateOnboardingToast,
};

export type OnboardingActionsType = typeof OnboardingActionProps;
