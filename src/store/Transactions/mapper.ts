import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { TransactionsActionProps } from "./actions";

export const TransactionsMapStateToProps = (state: RootState) => ({
  approved: state.transactions.approved,
  orderCount: state.transactions.orderCount,
  pending: state.transactions.pending,
  rejected: state.transactions.rejected,
  selectedOrders: state.transactions.selectedOrders,
});

export const TransactionsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(TransactionsActionProps, dispatch);
};

export type TransactionsStoreProps = ReturnType<typeof TransactionsMapStateToProps> & ReturnType<typeof TransactionsMapDispatchToProps>;
