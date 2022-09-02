import { typedAction } from "../actionCreator";
import { productsState } from "./state";

export const updateProductType = (type: ProductType) => {
  return typedAction("products/UPDATE_PRODUCT_TYPE", type);
};

export const addUtFilters = (filters: IProductFilter) => {
  return typedAction("products/ADD_UT_FILTERS", filters);
};

export const updateUtPage = (page: string) => {
  return typedAction("products/UPDATE_UT_PAGE", page);
};

export const updatePrsPage = (page: string) => {
  return typedAction("products/UPDATE_PRS_PAGE", page);
};

export const updatePrsDefaultPage = (page: string) => {
  return typedAction("products/UPDATE_PRS_DEFAULT_PAGE", page);
};

export const updateAmpPage = (page: string) => {
  return typedAction("products/UPDATE_AMP_PAGE", page);
};

export const addUtSort = (sort: IProductSort[]) => {
  return typedAction("products/ADD_UT_SORT", sort);
};

export const addPrsSort = (sort: IProductSort[]) => {
  return typedAction("products/ADD_PRS_SORT", sort);
};

export const addPrsDefaultSort = (sort: IProductSort[]) => {
  return typedAction("products/ADD_PRS_DEFAULT_SORT", sort);
};

export const addAmpSort = (sort: IProductSort[]) => {
  return typedAction("products/ADD_AMP_SORT", sort);
};

export const updateUtShowBy = (showBy: ProductListShowByType) => {
  return typedAction("products/UPDATE_UT_SHOW_BY", showBy);
};

export const updatePrsShowBy = (showBy: ProductListShowByType) => {
  return typedAction("products/UPDATE_PRS_SHOW_BY", showBy);
};

export const updatePrsDefaultShowBy = (showBy: ProductListShowByType) => {
  return typedAction("products/UPDATE_PRS_DEFAULT_SHOW_BY", showBy);
};

export const updateAmpShowBy = (showBy: ProductListShowByType) => {
  return typedAction("products/UPDATE_AMP_SHOW_BY", showBy);
};

export const addUtRecommendedFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_UT_RECOMMENDED_FUNDS", funds);
};

export const addUtAllFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_UT_ALL_FUNDS", funds);
};

export const addUtSearch = (value: string) => {
  return typedAction("products/ADD_UT_SEARCH", value);
};

export const addPrsFilters = (filters: IProductFilter) => {
  return typedAction("products/ADD_PRS_FILTERS", filters);
};

export const addPrsAllFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_PRS_ALL_FUNDS", funds);
};

export const addPrsRecommendedFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_PRS_RECOMMENDED_FUNDS", funds);
};

export const addPrsSearch = (value: string) => {
  return typedAction("products/ADD_PRS_SEARCH", value);
};

export const addPrsDefaultFilters = (filters: IProductFilter) => {
  return typedAction("products/ADD_PRS_DEFAULT_FILTERS", filters);
};

export const addPrsDefaultAllFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_PRS_DEFAULT_ALL_FUNDS", funds);
};

export const addPrsDefaultRecommendedFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_PRS_DEFAULT_RECOMMENDED_FUNDS", funds);
};

export const addPrsDefaultSearch = (value: string) => {
  return typedAction("products/ADD_PRS_DEFAULT_SEARCH", value);
};

export const addAmpFilters = (filters: IProductFilter) => {
  return typedAction("products/ADD_AMP_FILTERS", filters);
};

export const addAmpAllFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_AMP_ALL_FUNDS", funds);
};

export const addAmpRecommendedFunds = (funds: IProductListResult) => {
  return typedAction("products/ADD_AMP_RECOMMENDED_FUNDS", funds);
};

export const addAmpSearch = (value: string) => {
  return typedAction("products/ADD_AMP_SEARCH", value);
};

export const updateProducts = (value: productsState) => {
  return typedAction("products/UPDATE_PRODUCTS", value);
};
export const resetUTFilter = () => {
  return typedAction("products/RESET_UT_FILTER");
};

export const partialResetUTProducts = (filters?: IProductFilter) => {
  return typedAction("products/PARTIAL_RESET_UT_PRODUCTS", filters);
};

export const resetPRSFilter = () => {
  return typedAction("products/RESET_PRS_FILTER");
};

export const partialResetPRSProducts = (filters?: IProductFilter) => {
  return typedAction("products/PARTIAL_RESET_PRS_PRODUCTS", filters);
};

export const resetPRSDefaultFilter = () => {
  return typedAction("products/RESET_PRS_DEFAULT_FILTER");
};

export const partialResetPRSDefaultProducts = (filters?: IProductFilter) => {
  return typedAction("products/PARTIAL_RESET_PRS_DEFAULT_PRODUCTS", filters);
};

export const resetAMPFilter = () => {
  return typedAction("products/RESET_AMP_FILTER");
};

export const resetProducts = () => {
  return typedAction("products/RESET_PRODUCTS");
};
export const updateAvailableFilters = (availableFilters: IProductAvailableFilter) => {
  return typedAction("products/UPDATE_AVAILABLE_FILTERS", availableFilters);
};

export type ProductsAction = ReturnType<
  | typeof addAmpAllFunds
  | typeof addAmpFilters
  | typeof addAmpRecommendedFunds
  | typeof addAmpSearch
  | typeof addPrsAllFunds
  | typeof addPrsDefaultAllFunds
  | typeof addPrsDefaultFilters
  | typeof addPrsDefaultRecommendedFunds
  | typeof addPrsDefaultSearch
  | typeof addPrsFilters
  | typeof addPrsRecommendedFunds
  | typeof addPrsSearch
  | typeof addUtAllFunds
  | typeof addUtFilters
  | typeof addUtRecommendedFunds
  | typeof addUtSearch
  | typeof updateUtShowBy
  | typeof updatePrsShowBy
  | typeof updatePrsDefaultShowBy
  | typeof updateAmpShowBy
  | typeof updateProducts
  | typeof resetProducts
  | typeof resetUTFilter
  | typeof partialResetUTProducts
  | typeof resetPRSFilter
  | typeof partialResetPRSProducts
  | typeof resetPRSDefaultFilter
  | typeof partialResetPRSDefaultProducts
  | typeof resetAMPFilter
  | typeof addUtSort
  | typeof addPrsSort
  | typeof addPrsDefaultSort
  | typeof addAmpSort
  | typeof updateUtPage
  | typeof updatePrsPage
  | typeof updatePrsDefaultPage
  | typeof updateAmpPage
  | typeof updateProductType
  | typeof updateAvailableFilters
>;

export const ProductsActionProps = {
  addAmpAllFunds,
  addAmpFilters,
  addAmpRecommendedFunds,
  addAmpSearch,
  addPrsAllFunds,
  addPrsDefaultAllFunds,
  addPrsDefaultFilters,
  addPrsDefaultRecommendedFunds,
  addPrsDefaultSearch,
  addPrsFilters,
  addPrsRecommendedFunds,
  addPrsSearch,
  addUtAllFunds,
  addUtFilters,
  addUtRecommendedFunds,
  addUtSearch,
  updateUtShowBy,
  updatePrsShowBy,
  updatePrsDefaultShowBy,
  updateAmpShowBy,
  updateProducts,
  partialResetUTProducts,
  partialResetPRSProducts,
  resetProducts,
  partialResetPRSDefaultProducts,
  resetUTFilter,
  resetPRSFilter,
  resetPRSDefaultFilter,
  resetAMPFilter,
  updateAvailableFilters,
  addUtSort,
  addPrsSort,
  addPrsDefaultSort,
  addAmpSort,
  updateUtPage,
  updatePrsPage,
  updatePrsDefaultPage,
  updateAmpPage,
  updateProductType,
};

export type ProductsActionTypes = typeof ProductsActionProps;
