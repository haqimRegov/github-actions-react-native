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
        ...clientInitialState,
      };

    default:
      return state;
  }
}
