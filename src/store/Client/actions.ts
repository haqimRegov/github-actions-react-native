import { typedAction } from "../actionCreator";

export const addAccountType = (accountType: TypeAccountChoices) => {
  return typedAction("client/ADD_ACCOUNT_TYPE", accountType);
};

export const addClientDetails = (details: IClientDetailsState) => {
  return typedAction("client/ADD_DETAILS", details);
};

export const resetClientDetails = () => {
  return typedAction("client/RESET_DETAILS");
};

export type ClientAction = ReturnType<typeof addAccountType | typeof addClientDetails | typeof resetClientDetails>;

export const ClientActionProps = {
  addAccountType,
  addClientDetails,
  resetClientDetails,
};

export type ClientActionsType = typeof ClientActionProps;
