import { typedAction } from "../actionCreator";

export const addSelectedFund = (fund: IFund[]) => {
  return typedAction("selectedFund/ADD_FUND", fund);
};

export const resetSelectedFund = () => {
  return typedAction("selectedFund/RESET_FUND");
};

export type SelectedFundAction = ReturnType<typeof addSelectedFund | typeof resetSelectedFund>;

export const SelectedFundActionProps = { addSelectedFund, resetSelectedFund };

export type SelectedFundActionsType = typeof SelectedFundActionProps;
