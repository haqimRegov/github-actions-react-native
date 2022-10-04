import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { RootState } from "../rootReducer";
import { EDDActionProps } from "./actions";

export const EDDMapStateToProps = (state: RootState) => ({
  config: state.global.config,
  currentCase: state.edd.currentCase,
  global: state.global,
  loading: state.global.loading,
  new: state.edd.new,
  history: state.edd.history,
  search: state.edd.search,
  edd: state.edd,
});

export const EDDMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...EDDActionProps, ...GlobalActionProps }, dispatch);
};

export type EDDStoreProps = ReturnType<typeof EDDMapStateToProps> & ReturnType<typeof EDDMapDispatchToProps>;
