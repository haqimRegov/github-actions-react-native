import { Dispatch } from "react";
import { AnyAction } from "redux";

import { SAMPLE_CLIENTS } from "../../mocks";
import { typedAction } from "../actionCreator";

export const addClientDetails = (details: IClientDetails) => {
  return typedAction("client/ADD_DETAILS", details);
};

// Action creator returning a thunk!
export const loadClient = (details: IClientDetails) => {
  return (dispatch: Dispatch<AnyAction>) => {
    // TODO integration
    if (details) {
      // TODO
    }
    setTimeout(() => {
      const results = SAMPLE_CLIENTS[0];
      // Pretend to load an item
      if (results) {
        dispatch(addClientDetails(results));
      }
    }, 500);
  };
};

export const resetClientDetails = () => {
  return typedAction("client/RESET_DETAILS");
};

export type ClientAction = ReturnType<typeof addClientDetails | typeof resetClientDetails>;
