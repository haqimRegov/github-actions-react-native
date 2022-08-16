import { ProductsAction } from "./actions";
import { productsInitialState, productsState } from "./state";

export function productsReducer(state = productsInitialState, action: ProductsAction): productsState {
  switch (action.type) {
    case "products/ADD_UT_FILTERS":
      return {
        ...state,
        ut: { ...state.ut, filters: action.payload, page: "1" },
      };
    case "products/ADD_UT_SORT":
      return {
        ...state,
        ut: { ...state.ut, sort: action.payload },
      };
    case "products/UPDATE_UT_PAGE":
      return {
        ...state,
        ut: { ...state.ut, page: action.payload },
      };
    case "products/UPDATE_PRS_PAGE":
      return {
        ...state,
        prs: { ...state.prs, page: action.payload },
      };
    case "products/UPDATE_PRS_DEFAULT_PAGE":
      return {
        ...state,
        prsDefault: { ...state.prsDefault, page: action.payload },
      };
    case "products/UPDATE_AMP_PAGE":
      return {
        ...state,
        amp: { ...state.amp, page: action.payload },
      };
    case "products/ADD_PRS_SORT":
      return {
        ...state,
        prs: { ...state.prs, sort: action.payload },
      };
    case "products/ADD_PRS_DEFAULT_SORT":
      return {
        ...state,
        prsDefault: { ...state.prsDefault, sort: action.payload },
      };
    case "products/ADD_AMP_SORT":
      return {
        ...state,
        amp: { ...state.amp, sort: action.payload },
      };
    case "products/ADD_UT_RECOMMENDED_FUNDS":
      return {
        ...state,
        ut: {
          ...state.ut,
          recommended: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_UT_ALL_FUNDS":
      return {
        ...state,
        ut: {
          ...state.ut,
          all: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_UT_SEARCH":
      return {
        ...state,
        ut: { ...state.ut, search: action.payload },
      };
    case "products/UPDATE_UT_SHOW_BY":
      return {
        ...state,
        ut: { ...state.ut, showBy: action.payload },
      };
    case "products/UPDATE_PRS_SHOW_BY":
      return {
        ...state,
        prs: { ...state.prs, showBy: action.payload },
      };
    case "products/UPDATE_PRS_DEFAULT_SHOW_BY":
      return {
        ...state,
        prsDefault: { ...state.prsDefault, showBy: action.payload },
      };
    case "products/UPDATE_AMP_SHOW_BY":
      return {
        ...state,
        amp: { ...state.amp, showBy: action.payload },
      };
    case "products/ADD_PRS_FILTERS":
      return {
        ...state,
        prs: { ...state.prs, filters: action.payload, page: "1" },
      };
    case "products/ADD_PRS_RECOMMENDED_FUNDS":
      return {
        ...state,
        prs: {
          ...state.prs,
          recommended: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_PRS_ALL_FUNDS":
      return {
        ...state,
        prs: {
          ...state.prs,
          all: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_PRS_SEARCH":
      return {
        ...state,
        prs: { ...state.prs, search: action.payload },
      };
    case "products/ADD_PRS_DEFAULT_FILTERS":
      return {
        ...state,
        prsDefault: { ...state.prsDefault, filters: action.payload, page: "1" },
      };
    case "products/ADD_PRS_DEFAULT_RECOMMENDED_FUNDS":
      return {
        ...state,
        prsDefault: {
          ...state.prsDefault,
          recommended: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_PRS_DEFAULT_ALL_FUNDS":
      return {
        ...state,
        prsDefault: {
          ...state.prsDefault,
          all: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_PRS_DEFAULT_SEARCH":
      return {
        ...state,
        prsDefault: { ...state.prsDefault, search: action.payload },
      };
    case "products/ADD_AMP_FILTERS":
      return {
        ...state,
        amp: { ...state.amp, filters: action.payload, page: "1" },
      };
    case "products/ADD_AMP_RECOMMENDED_FUNDS":
      return {
        ...state,
        amp: {
          ...state.amp,
          recommended: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_AMP_ALL_FUNDS":
      return {
        ...state,
        amp: {
          ...state.amp,
          all: action.payload.products,
          page: action.payload.page,
          pages: action.payload.pages,
          totalCount: action.payload.totalCount,
        },
      };
    case "products/ADD_AMP_SEARCH":
      return {
        ...state,
        amp: { ...state.amp, search: action.payload },
      };
    case "products/UPDATE_PRODUCTS":
      return {
        ...state,
        ...action.payload,
      };
    case "products/UPDATE_PRODUCT_TYPE":
      return {
        ...state,
        productType: action.payload,
      };
    case "products/RESET_UT_FILTER":
      return {
        ...state,
        ut: {
          ...state.ut,
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
        },
      };
    case "products/RESET_PRS_FILTER":
      return {
        ...state,
        prs: {
          ...state.prs,
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
        },
      };
    case "products/RESET_PRS_DEFAULT_FILTER":
      return {
        ...state,
        prsDefault: {
          ...state.prsDefault,
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
        },
      };
    case "products/RESET_AMP_FILTER":
      return {
        ...state,
        amp: {
          ...state.amp,
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: ["KENANGA INVESTORS BERHAD"],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
        },
      };
    case "products/UPDATE_AVAILABLE_FILTERS":
      return {
        ...state,
        availableFilters: {
          ...state.availableFilters,
          ...action.payload,
        },
      };
    case "products/RESET_PRODUCTS":
      return {
        ut: {
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
          search: "",
          showBy: "recommended",
          all: [],
          recommended: [],
          page: "1",
          pages: "",
          sort: [
            { column: "fundAbbr", value: "" },
            { column: "fundName", value: "" },
            { column: "riskCategory", value: "" },
          ],
          totalCount: {
            all: "",
            recommended: "",
          },
        },
        prs: {
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
          search: "",
          showBy: "recommended",
          all: [],
          recommended: [],
          page: "1",
          pages: "",
          sort: [
            { column: "fundAbbr", value: "" },
            { column: "fundName", value: "" },
            { column: "riskCategory", value: "" },
          ],
          totalCount: {
            all: "",
            recommended: "",
          },
        },
        prsDefault: {
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
          search: "",
          showBy: "recommended",
          all: [],
          recommended: [],
          page: "1",
          pages: "",
          sort: [
            { column: "fundAbbr", value: "" },
            { column: "fundName", value: "" },
            { column: "riskCategory", value: "" },
          ],
          totalCount: {
            all: "",
            recommended: "",
          },
        },
        amp: {
          filters: {
            epfApproved: [],
            fundCurrency: [],
            fundType: [],
            issuingHouse: [],
            riskCategory: [],
            shariahApproved: [],
            conventional: [],
          },
          search: "",
          showBy: "recommended",
          all: [],
          recommended: [],
          page: "1",
          pages: "",
          sort: [
            { column: "fundAbbr", value: "" },
            { column: "fundName", value: "" },
            { column: "riskCategory", value: "" },
          ],
          totalCount: {
            all: "",
            recommended: "",
          },
        },
        availableFilters: {
          fundCurrency: [],
          fundCategory: [],
          issuingHouse: [],
          riskCategory: [],
        },
        productType: "ut",
      };

    default:
      return state;
  }
}
