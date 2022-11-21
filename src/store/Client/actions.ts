import { typedAction } from "../actionCreator";
import { ClientState } from "./state";

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

export const addClientNewFund = (newSales: boolean) => {
  return typedAction("client/ADD_CLIENT_NEW_FUND", newSales);
};

export const addClientNewSales = (newSales: boolean) => {
  return typedAction("client/ADD_CLIENT_NEW_SALES", newSales);
};

export const addClientDirectToAccountOpening = (accountOpening: boolean) => {
  return typedAction("client/ADD_CLIENT_DIRECT_TO_ACCOUNT_OPENING", accountOpening);
};

export const resetClientDetails = () => {
  return typedAction("client/RESET_DETAILS");
};

export const updateClient = (client: ClientState) => {
  return typedAction("client/UPDATE_CLIENT", client);
};

export type ClientAction = ReturnType<
  | typeof addAccountType
  | typeof addClientDetails
  | typeof addClientDirectToAccountOpening
  | typeof addClientForceUpdate
  | typeof addClientNewFund
  | typeof addClientNewSales
  | typeof addPrincipalInfo
  | typeof addJointInfo
  | typeof resetClientDetails
  | typeof updateClient
>;

export const ClientActionProps = {
  addAccountType,
  addClientDetails,
  addClientDirectToAccountOpening,
  addClientForceUpdate,
  addClientNewFund,
  addClientNewSales,
  addJointInfo,
  addPrincipalInfo,
  resetClientDetails,
  updateClient,
};

export type ClientActionsType = typeof ClientActionProps;
