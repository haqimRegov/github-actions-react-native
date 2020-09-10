import { typedAction } from "../actionCreator";

export const addFilters = (filters: IProductFilter) => {
  return typedAction("products/ADD_FILTERS", filters);
};

export const resetFilters = () => {
  return typedAction("products/RESET_FILTERS");
};

export type ProductsAction = ReturnType<typeof addFilters | typeof resetFilters>;

export const ProductsActionProps = { addFilters, resetFilters };

export type ProductsActionTypes = typeof ProductsActionProps;
