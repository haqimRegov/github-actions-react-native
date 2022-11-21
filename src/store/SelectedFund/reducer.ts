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
        funds: [],
        investmentDetails: [],
        viewFund: undefined,
        outsideRisk: false,
      };

    case "selectedFund/VIEW_FUND":
      return {
        ...state,
        viewFund: action.payload,
      };

    case "selectedFund/RESET_INVESTMENT_DETAILS":
      return {
        ...state,
        investmentDetails: [],
      };
    case "selectedFund/UPDATE_OUTSIDE_RISK":
      return {
        ...state,
        outsideRisk: action.payload,
      };

    default:
      return state;
  }
}
