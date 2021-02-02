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
        ...transactionsInitialState,
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
        pending: {
          ...state.pending,
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
        pending: {
          ...state.pending,
          filter: {
            ...state.pending.filter,
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

    default:
      return state;
  }
}
