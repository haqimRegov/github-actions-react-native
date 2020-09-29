import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { GlobalActionProps } from "./actions";

export const GlobalMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  config: state.global.config,
  isLoading: state.global.loading,
});

export const GlobalMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(GlobalActionProps, dispatch);
};

export type GlobalStoreProps = ReturnType<typeof GlobalMapStateToProps> & ReturnType<typeof GlobalMapDispatchToProps>;
