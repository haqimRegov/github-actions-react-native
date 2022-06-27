import { typedAction } from "../actionCreator";

export const addAccountType = (accountType: TypeAccountChoices) => {
  return typedAction("client/ADD_ACCOUNT_TYPE", accountType);
};

export const addClientDetails = (details: IClientDetailsState) => {
  return typedAction("client/ADD_DETAILS", details);
};

export const addPrincipalInfo = (info: IClientBasicInfo) => {
  return typedAction("client/ADD_PRINCIPAL_INFO", info);
};

export const addJointInfo = (info: IClientBasicInfo) => {
  return typedAction("client/ADD_JOINT_INFO", info);
};

export const addClientForceUpdate = (forceUpdate: boolean) => {
  return typedAction("client/ADD_CLIENT_FORCE_UPDATE", forceUpdate);
};

export const resetClientDetails = () => {
  return typedAction("client/RESET_DETAILS");
};

export type ClientAction = ReturnType<
  | typeof addAccountType
  | typeof addClientDetails
  | typeof addClientForceUpdate
  | typeof addPrincipalInfo
  | typeof addJointInfo
  | typeof resetClientDetails
>;

export const ClientActionProps = {
  addAccountType,
  addClientDetails,
  addClientForceUpdate,
  addJointInfo,
  addPrincipalInfo,
  resetClientDetails,
};

export type ClientActionsType = typeof ClientActionProps;
