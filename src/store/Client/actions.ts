import { typedAction } from "../actionCreator";

export const addClientDetails = (details: IClientDetailsState) => {
  return typedAction("client/ADD_DETAILS", details);
};

export const resetClientDetails = () => {
  return typedAction("client/RESET_DETAILS");
};

export type ClientAction = ReturnType<typeof addClientDetails | typeof resetClientDetails>;

export const ClientActionProps = {
  addClientDetails,
  resetClientDetails,
};

export type ClientActionsType = typeof ClientActionProps;
