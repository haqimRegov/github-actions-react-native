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

export const updateForceUpdateDeclarations = (declarations: string[]) => {
  return typedAction("forceUpdate/UPDATE_FORCE_UPDATE_DECLARATIONS", declarations);
};

export const updateEmailVerified = (verified: boolean) => {
  return typedAction("forceUpdate/UPDATE_EMAIL_VERIFIED", verified);
};

export const updateShowOpenAccount = (show: boolean) => {
  return typedAction("forceUpdate/UPDATE_SHOW_OPEN_ACCOUNT", show);
};

export const resetForceUpdate = () => {
  return typedAction("forceUpdate/RESET_FORCE_UPDATE");
};

export type ForceUpdateAction = ReturnType<
  | typeof updateEmailVerified
  | typeof updateForceUpdate
  | typeof updateForceUpdateDeclarations
  | typeof updateFUDisabledSteps
  | typeof updateFUFinishedSteps
  | typeof updateShowOpenAccount
  | typeof resetForceUpdate
>;

export const ForceUpdateActionProps = {
  resetForceUpdate,
  updateEmailVerified,
  updateForceUpdate,
  updateForceUpdateDeclarations,
  updateFUDisabledSteps,
  updateFUFinishedSteps,
  updateShowOpenAccount,
};

export type ForceUpdateActionsType = typeof ForceUpdateActionProps;
