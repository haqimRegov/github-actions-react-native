import { NewSalesAction } from "./actions";
import { newSalesInitialState, NewSalesState } from "./state";

export function newSalesReducer(state = newSalesInitialState, action: NewSalesAction): NewSalesState {
  switch (action.type) {
    case "newSales/ADD_ACCOUNT_DETAILS":
      return {
        ...state,
        accountDetails: {
          ...state.accountDetails,
          ...action.payload,
        },
      };
    case "newSales/ADD_RISK_INFO":
      return {
        ...state,
        riskInfo: action.payload,
      };
    case "newSales/UPDATE_STEPS":
      return {
        ...state,
        finishedSteps: [...action.payload],
      };
    case "newSales/UPDATE_DISABLED_STEPS":
      return {
        ...state,
        disabledSteps: [...action.payload],
      };
    case "newSales/UPDATE_NEW_SALES":
      return {
        ...state,
        ...action.payload,
      };

    case "newSales/RESET_NEW_SALES":
      return {
        accountDetails: {
          accountNo: "",
          fundType: "ut",
          isEpf: undefined,
          isRecurring: undefined,
          riskScore: "",
        },
        disabledSteps: [
          "Acknowledgement",
          "AdditionalDetails",
          "IdentityVerification",
          "OrderPreview",
          "Payment",
          "ProductsList",
          "ProductsConfirmation",
          "RiskAssessment",
          "Signatures",
          "Summary",
          "TermsAndConditions",
        ],
        emailVerified: false,
        finishedSteps: [],
        toast: {
          toastVisible: false,
          toastText: "All changes saved",
        },
      };
    case "newSales/UPDATE_TOAST_TEXT":
      return {
        ...state,
        toast: {
          ...state.toast,
          ...action.payload,
        },
      };
    case "newSales/UPDATE_TOAST_VISIBLE":
      return {
        ...state,
        toast: {
          ...state.toast,
          toastVisible: action.payload,
        },
      };

    default:
      return state;
  }
}
