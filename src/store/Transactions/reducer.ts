import { TransactionsAction } from "./actions";
import { transactionsInitialState, transactionsState } from "./state";

export function transactionsReducer(state = transactionsInitialState, action: TransactionsAction): transactionsState {
  switch (action.type) {
    case "transactions/UPDATE_TRANSACTIONS":
      return {
        ...state,
        ...action.payload,
      };
    case "transactions/RESET_SELECTED_ORDER":
      return {
        ...state,
        selectedOrders: [],
      };
    case "transactions/RESET_TRANSACTIONS":
      return {
        approved: {
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
        incomplete: {
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
          pill: "pending",
          sort: [{ value: "descending", column: "lastUpdated" }],
        },
        rejected: {
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
        availableFilters: {
          transactionType: [],
          accountType: [],
          orderStatus: [],
        },
        approvedCount: 0,
        currentOrder: undefined,
        downloadInitiated: false,
        incompleteCount: 0,
        pendingCount: 0,
        rejectedCount: 0,
        reroutedCount: 0,
        search: "",
        selectedOrders: [],
        submittedCount: 0,
      };
    case "transactions/RESET_APPROVED_FILTER":
      return {
        ...state,
        approved: {
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
    case "transactions/RESET_REJECTED_FILTER":
      return {
        ...state,
        rejected: {
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
          sort: [],
        },
      };
    case "transactions/RESET_PENDING_FILTER":
      return {
        ...state,
        incomplete: {
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
          pill: action.payload !== undefined ? action.payload : "pending",
          sort: [],
        },
      };
    case "transactions/UPDATE_SELECTED_ORDER":
      return {
        ...state,
        selectedOrders: action.payload,
      };
    case "transactions/UPDATE_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "transactions/VIEW_ORDER":
      return {
        ...state,
        currentOrder: action.payload,
      };
    case "transactions/UPDATE_PENDING_SORT":
      return {
        ...state,
        incomplete: {
          ...state.incomplete,
          page: 1,
          sort: action.payload,
        },
      };
    case "transactions/UPDATE_APPROVED_SORT":
      return {
        ...state,
        approved: {
          ...state.approved,
          page: 1,
          sort: action.payload,
        },
      };
    case "transactions/UPDATE_REJECTED_SORT":
      return {
        ...state,
        rejected: {
          ...state.rejected,
          page: 1,
          sort: action.payload,
        },
      };
    case "transactions/UPDATE_PENDING_FILTER":
      return {
        ...state,
        incomplete: {
          ...state.incomplete,
          filter: {
            ...state.incomplete.filter,
            ...action.payload,
          },
        },
      };
    case "transactions/UPDATE_APPROVED_FILTER":
      return {
        ...state,
        approved: {
          ...state.approved,
          filter: {
            ...state.approved.filter,
            ...action.payload,
          },
        },
      };
    case "transactions/UPDATE_REJECTED_FILTER":
      return {
        ...state,
        rejected: {
          ...state.rejected,
          filter: {
            ...state.rejected.filter,
            ...action.payload,
          },
        },
      };
    case "transactions/UPDATE_PILL":
      return {
        ...state,
        incomplete: {
          ...state.incomplete,
          pill: action.payload,
        },
      };
    case "transactions/UPDATE_AVAILABLE_FILTER":
      return {
        ...state,
        availableFilters: action.payload,
      };
    case "transactions/UPDATE_DOWNLOAD_INITIATED":
      return {
        ...state,
        downloadInitiated: action.payload,
      };

    default:
      return state;
  }
}
