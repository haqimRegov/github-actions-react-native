import { AcknowledgementAction } from "./actions";
import { acknowledgementInitialState, acknowledgementState } from "./state";

export function acknowledgementReducer(state = acknowledgementInitialState, action: AcknowledgementAction): acknowledgementState {
  switch (action.type) {
    case "acknowledgement/ADD_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "acknowledgement/RESET_ORDERS":
      return {
        ...state,
        orders: undefined,
      };
    case "acknowledgement/UPDATE_RECEIPTS":
      return {
        ...state,
        receipts: action.payload,
      };

    case "acknowledgement/RESET_RECEIPTS":
      return {
        ...state,
        receipts: [],
      };

    case "acknowledgement/UPDATE_PAYMENT_SUMMARY":
      return {
        ...state,
        paymentSummary: action.payload,
      };

    case "acknowledgement/RESET_PAYMENT_SUMMARY":
      return {
        ...state,
        paymentSummary: undefined,
      };

    case "acknowledgement/UPDATE_AGREE":
      return {
        ...state,
        ...action.payload,
      };

    case "acknowledgement/RESET_ACKNOWLEDGEMENT":
      return {
        agreeTerms: {
          agree1: false,
          agree2: false,
          agree3: false,
        },
        orders: undefined,
        paymentSummary: undefined,
        receipts: [],
      };

    default:
      return state;
  }
}
