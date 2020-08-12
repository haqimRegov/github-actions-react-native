import { ClientAction } from "./actions";
import { clientInitialState, ClientState } from "./state";

export function clientReducer(state = clientInitialState, action: ClientAction): ClientState {
  switch (action.type) {
    case "client/ADD_DETAILS":
      return {
        ...state,
        details: { ...state.details, ...action.payload },
      };
    case "client/RESET_DETAILS":
      return {
        ...state,
        details: undefined,
      };

    default:
      return state;
  }
}
