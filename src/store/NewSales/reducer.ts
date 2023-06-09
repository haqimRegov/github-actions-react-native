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
    case "newSales/ADD_BANK_DETAILS":
      return {
        ...state,
        accountDetails: {
          ...state.accountDetails,
          bankDetails: {
            ...action.payload,
          },
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
          authorisedSignatory: "",
          ampDetails: undefined,
          bankDetails: undefined,
          fundType: "ut",
          isBankDetailsRequired: false,
          isEpf: undefined,
          isRecurring: undefined,
          isSyariah: false,
          riskScore: "",
        },
        disabledSteps: [
          "RiskSummary",
          "RiskAssessment",
          "Products",
          "ProductsList",
          "ProductsConfirmation",
          "AccountInformation",
          "IdentityVerification",
          "AdditionalDetails",
          "Summary",
          "Acknowledgement",
          "OrderPreview",
          "TermsAndConditions",
          "Signatures",
          "Payment",
        ],
        emailVerified: false,
        finishedSteps: [],
        investorProfile: {
          principalClientId: undefined,
          jointClientId: undefined,
        },
        riskInfo: {
          appetite: "",
          profile: "",
          expectedRange: "",
          hnwStatus: "",
          type: "",
        },
        toast: undefined,
        transactionType: undefined,
      };
    case "newSales/UPDATE_TOAST_TEXT":
      return {
        ...state,
        toast: action.payload,
      };
    case "newSales/RESET_TOAST_TEXT":
      return {
        ...state,
        toast: undefined,
      };
    case "newSales/UPDATE_TRANSACTION_TYPE":
      return {
        ...state,
        transactionType: action.payload,
      };

    default:
      return state;
  }
}
