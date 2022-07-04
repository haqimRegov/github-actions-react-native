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
        currentAccount: undefined,
        currentInvestor: undefined,
        currentOrderHistory: undefined,
        orderHistory: {
          filter: {
            dateSorting: "",
            startDate: undefined,
            endDate: new Date(),
            transactionsType: [],
            accountType: [],
            orderStatus: [],
          },
          orders: [],
          page: 1,
          pages: 1,
          sort: [{ value: "descending", column: "lastUpdated" }],
        },
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
    case "investors/UPDATE_CURRENT_ACCOUNT":
      return {
        ...state,
        currentAccount: action.payload,
      };
    case "investors/UPDATE_CURRENT_INVESTOR":
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
    case "investors/ADD_ORDER_HISTORY":
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
          ...action.payload,
        },
      };
    case "investors/UPDATE_ORDER_HISTORY_SORT":
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
          page: 1,
          sort: action.payload,
        },
      };
    default:
      return state;
  }
}
