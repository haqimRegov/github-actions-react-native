import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "./actions";

export const SelectedFundMapStateToProps = (state: RootState) => ({
  selectedFunds: state.selectedFund.funds,
});

export const SelectedFundMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(SelectedFundActionProps, dispatch);
};

export type SelectedFundStoreProps = ReturnType<typeof SelectedFundMapStateToProps> & ReturnType<typeof SelectedFundMapDispatchToProps>;
