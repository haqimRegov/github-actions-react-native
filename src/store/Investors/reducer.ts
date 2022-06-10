import { InvestorsAction } from "./actions";
import { investorsInitialState, investorsState } from "./state";

export function investorsReducer(state = investorsInitialState, action: InvestorsAction): investorsState {
  switch (action.type) {
    case "investors/UPDATE_INVESTORS":
      return {
        ...state,
        ...action.payload,
      };
    case "investors/RESET_INVESTORS":
      return {
        all: {
          filter: {
            riskProfile: [],
          },
          investors: [],
          page: 1,
          pages: 1,
          sort: [{ value: "ascending", column: "name" }],
        },

        allCount: 0,
        search: "",
        currentInvestor: undefined,
      };
    case "investors/RESET_ALL_FILTER":
      return {
        ...state,
        all: {
          filter: {
            riskProfile: [],
          },
          investors: [],
          page: 1,
          pages: 1,
          sort: [{ value: "ascending", column: "name" }],
        },
      };
    case "investors/UPDATE_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "investors/VIEW_INVESTOR":
      return {
        ...state,
        currentInvestor: action.payload,
      };
    case "investors/UPDATE_ALL_SORT":
      return {
        ...state,
        all: {
          ...state.all,
          page: 1,
          sort: action.payload,
        },
      };
    case "investors/UPDATE_ALL_FILTER":
      return {
        ...state,
        all: {
          ...state.all,
          filter: {
            ...state.all.filter,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
}
