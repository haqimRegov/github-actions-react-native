import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../data/dictionary";
import { ClientAction } from "./actions";
import { clientInitialState, ClientState } from "./state";

export function clientReducer(state = clientInitialState, action: ClientAction): ClientState {
  switch (action.type) {
    case "client/ADD_ACCOUNT_TYPE":
      return {
        ...state,
        accountType: action.payload,
      };
    case "client/ADD_PRINCIPAL_INFO":
      return {
        ...state,
        details: { ...state.details, principalHolder: { ...action.payload } },
      };
    case "client/ADD_JOINT_INFO":
      return {
        ...state,
        details: { ...state.details, jointHolder: { ...action.payload } },
      };
    case "client/ADD_DETAILS":
      return {
        ...state,
        details: { ...state.details, ...action.payload },
      };
    case "client/RESET_DETAILS":
      return {
        accountList: [],
        accountType: undefined,
        details: {
          principalHolder: {
            name: "",
            country: "",
            dateOfBirth: "",
            id: "",
            idType: DICTIONARY_ID_TYPE[0],
            isEtb: false,
            otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
          },
          jointHolder: {
            name: "",
            country: "",
            dateOfBirth: "",
            id: "",
            idType: DICTIONARY_ID_TYPE[0],
            isEtb: false,
            otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
          },
          verified: false,
          initId: undefined,
          accountHolder: undefined,
        },
        directToAccountOpening: false,
        isForceUpdate: false,
        isNewFundPurchase: false,
        isNewSales: false,
      };

    case "client/ADD_CLIENT_FORCE_UPDATE":
      return {
        ...state,
        isForceUpdate: action.payload,
      };

    case "client/ADD_CLIENT_NEW_FUND":
      return {
        ...state,
        isNewFundPurchase: action.payload,
      };

    case "client/ADD_CLIENT_NEW_SALES":
      return {
        ...state,
        isNewSales: action.payload,
      };

    case "client/ADD_CLIENT_DIRECT_TO_ACCOUNT_OPENING":
      return {
        ...state,
        directToAccountOpening: action.payload,
      };
    case "client/UPDATE_CLIENT":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
