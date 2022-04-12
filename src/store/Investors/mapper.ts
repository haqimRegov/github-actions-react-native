import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { RootState } from "../rootReducer";
import { InvestorsActionProps } from "./actions";

export const InvestorsMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  all: state.investors.all,
  config: state.global.config,
  currentInvestor: state.investors.currentInvestor,
  investors: state.investors,
  loading: state.global.loading,
  search: state.investors.search,
  unreadMessages: state.global.unreadMessages,
});

export const InvestorsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...InvestorsActionProps, ...GlobalActionProps }, dispatch);
};

export type InvestorsStoreProps = ReturnType<typeof InvestorsMapStateToProps> & ReturnType<typeof InvestorsMapDispatchToProps>;
