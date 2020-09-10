import { bindActionCreators, Dispatch } from "redux";

import { ProductsActionProps } from "../Products";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "./actions";

export const SelectedFundMapStateToProps = (state: RootState) => ({
  filters: state.products.filters,
  investmentDetails: state.selectedFund.investmentDetails,
  selectedFunds: state.selectedFund.funds,
});

export const SelectedFundMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...SelectedFundActionProps, ...ProductsActionProps }, dispatch);
};

export type SelectedFundStoreProps = ReturnType<typeof SelectedFundMapStateToProps> & ReturnType<typeof SelectedFundMapDispatchToProps>;
