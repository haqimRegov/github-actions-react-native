import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { ClientActionProps } from "./actions";

export const ClientMapStateToProps = (state: RootState) => ({
  details: state.client.details,
});

export const ClintMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(ClientActionProps, dispatch);
};

export type ClientStoreProps = ReturnType<typeof ClientMapStateToProps> & ReturnType<typeof ClintMapDispatchToProps>;
