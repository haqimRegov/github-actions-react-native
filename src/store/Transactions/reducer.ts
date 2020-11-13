import { TransactionsAction } from "./actions";
import { transactionsInitialState, transactionsState } from "./state";

export function transactionsReducer(state = transactionsInitialState, action: TransactionsAction): transactionsState {
  switch (action.type) {
    case "transactions/ADD_APPROVED_ORDERS":
      return {
        ...state,
        approved: {
          ...action.payload.approved!,
        },
        orderCount: {
          ...action.payload.count,
        },
      };
    case "transactions/ADD_PENDING_ORDERS":
      return {
        ...state,
        pending: {
          ...action.payload.pending!,
        },
        orderCount: {
          ...action.payload.count,
        },
      };
    case "transactions/ADD_REJECTED_ORDERS":
      return {
        ...state,
        rejected: {
          ...action.payload.rejected!,
        },
        orderCount: {
          ...action.payload.count,
        },
      };
    case "transactions/ADD_SELECTED_ORDERS":
      return {
        ...state,
        selectedOrders: action.payload,
      };

    case "transactions/RESET_TRANSACTIONS":
      return {
        ...transactionsInitialState,
      };

    case "transactions/VIEW_ORDER":
      return {
        ...state,
        viewOrder: action.payload,
      };

    default:
      return state;
  }
}
