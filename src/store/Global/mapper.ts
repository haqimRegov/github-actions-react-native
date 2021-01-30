import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { TransactionsActionProps } from "../Transactions";
import { GlobalActionProps } from "./actions";

export const GlobalMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  config: state.global.config,
  isLoading: state.global.loading,
  unreadMessages: state.global.unreadMessages,
});

export const GlobalMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...GlobalActionProps, ...TransactionsActionProps }, dispatch);
};

export type GlobalStoreProps = ReturnType<typeof GlobalMapStateToProps> & ReturnType<typeof GlobalMapDispatchToProps>;
