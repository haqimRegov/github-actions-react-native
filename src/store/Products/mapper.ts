import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { ProductsActionProps } from "./actions";

export const ProductsMapStateToProps = (state: RootState) => ({
  filters: state.products.filters,
});

export const ProductsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(ProductsActionProps, dispatch);
};

export type ProductsStoreProps = ReturnType<typeof ProductsMapStateToProps> & ReturnType<typeof ProductsMapDispatchToProps>;
