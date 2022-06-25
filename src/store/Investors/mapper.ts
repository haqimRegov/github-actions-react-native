import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { GlobalActionProps } from "../Global/actions";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { RootState } from "../rootReducer";
import { InvestorsActionProps } from "./actions";

export const InvestorsMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  all: state.investors.all,
  client: state.client,
  config: state.global.config,
  currentInvestor: state.investors.currentInvestor,
  investors: state.investors,
  loading: state.global.loading,
  personalInfo: state.personalInfo,
  search: state.investors.search,
  unreadMessages: state.global.unreadMessages,
});

export const InvestorsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...InvestorsActionProps, ...PersonalInfoActionProps, ...ClientActionProps, ...GlobalActionProps }, dispatch);
};

export type InvestorsStoreProps = ReturnType<typeof InvestorsMapStateToProps> & ReturnType<typeof InvestorsMapDispatchToProps>;
