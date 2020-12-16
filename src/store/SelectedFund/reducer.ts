import { SelectedFundAction } from "./actions";
import { selectedFundInitialState, SelectedFundState } from "./state";

export function selectedFundReducer(state = selectedFundInitialState, action: SelectedFundAction): SelectedFundState {
  switch (action.type) {
    case "selectedFund/ADD_FUND":
      return {
        ...state,
        funds: action.payload,
      };

    case "selectedFund/ADD_INVESTMENT_DETAILS":
      return {
        ...state,
        investmentDetails: action.payload,
      };

    case "selectedFund/RESET_SELECTED_FUND":
      return {
        ...selectedFundInitialState,
      };

    case "selectedFund/VIEW_FUND":
      return {
        ...state,
        viewFund: action.payload,
      };

    case "selectedFund/RESET_VIEW_FUND":
      return {
        ...state,
        viewFund: undefined,
      };

    case "selectedFund/RESET_INVESTMENT_DETAILS":
      return {
        ...state,
        investmentDetails: [],
      };

    default:
      return state;
  }
}
