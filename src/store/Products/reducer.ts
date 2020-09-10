import { ProductsAction } from "./actions";
import { productsInitialState, productsState } from "./state";

export function productsReducer(state = productsInitialState, action: ProductsAction): productsState {
  switch (action.type) {
    case "products/ADD_FILTERS":
      return {
        filters: action.payload,
      };

    case "products/RESET_FILTERS":
      return {
        filters: productsInitialState.filters,
      };

    default:
      return state;
  }
}
