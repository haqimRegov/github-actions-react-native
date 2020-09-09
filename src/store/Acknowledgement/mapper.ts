import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { OrderSummaryActionProps } from "./actions";

export const OrderSummaryMapStateToProps = (state: RootState) => ({
  orders: state.orderSummary.orders,
});

export const OrderSummaryMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(OrderSummaryActionProps, dispatch);
};

export type OrderSummaryStoreProps = ReturnType<typeof OrderSummaryMapStateToProps> & ReturnType<typeof OrderSummaryMapDispatchToProps>;
