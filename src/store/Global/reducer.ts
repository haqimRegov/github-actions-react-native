import { GlobalAction } from "./actions";
import { globalInitialState, GlobalState } from "./state";

export const globalReducer = (state = globalInitialState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case "global/ADD_AGENT":
      return {
        ...state,
        agent: action.payload,
      };
    case "global/ADD_CONFIG":
      return {
        ...state,
        config: action.payload,
      };
    case "global/ADD_GLOBAL":
      return {
        ...state,
        ...action.payload,
      };
    case "global/RESET_AGENT":
      return {
        ...state,
        agent: undefined,
      };
    case "global/RESET_GLOBAL":
      return {
        ...globalInitialState,
      };
    case "global/RESET_ORDERS":
      return {
        ...state,
        config: undefined,
      };
    case "global/SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
