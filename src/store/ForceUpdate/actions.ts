import { typedAction } from "../actionCreator";
import { ForceUpdateState } from "./state";

export const updateFUDisabledSteps = (steps: TypeForceUpdateKey[]) => {
  return typedAction("forceUpdate/UPDATE_DISABLED_STEPS", steps);
};

export const updateFUFinishedSteps = (steps: TypeForceUpdateKey[]) => {
  return typedAction("forceUpdate/UPDATE_STEPS", steps);
};

export const updateForceUpdate = (forceUpdate: ForceUpdateState) => {
  return typedAction("forceUpdate/UPDATE_FORCE_UPDATE", forceUpdate);
};

export const updateEmailVerified = (verified: boolean) => {
  return typedAction("forceUpdate/UPDATE_EMAIL_VERIFIED", verified);
};

export const resetFUSteps = () => {
  return typedAction("forceUpdate/RESET_STEPS");
};

export type ForceUpdateAction = ReturnType<
  typeof resetFUSteps | typeof updateEmailVerified | typeof updateForceUpdate | typeof updateFUDisabledSteps | typeof updateFUFinishedSteps
>;

export const ForceUpdateActionProps = {
  resetFUSteps,
  updateEmailVerified,
  updateForceUpdate,
  updateFUDisabledSteps,
  updateFUFinishedSteps,
};

export type ForceUpdateActionsType = typeof ForceUpdateActionProps;
