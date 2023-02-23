import { bindActionCreators, Dispatch } from "redux";

import { ForceUpdateActionProps } from "../ForceUpdate";
import { GlobalActionProps } from "../Global/actions";
import { InvestorsActionProps } from "../Investors";
import { NewSalesActionProps } from "../NewSales";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RiskAssessmentActionProps } from "../RiskAssessment";
import { RootState } from "../rootReducer";
import { ClientActionProps } from "./actions";

export const ClientMapStateToProps = (state: RootState) => ({
  accountList: state.client.accountList,
  accountType: state.client.accountType,
  agent: state.global.agent,
  client: state.client,
  details: state.client.details,
  forceUpdate: state.client.isForceUpdate,
  investors: state.investors,
  newSales: state.newSales,
  risk: state.riskAssessment,
  showOpenAccount: state.forceUpdate.showOpenAccount,
  isNewFundPurchase: state.client.isNewFundPurchase,
  personalInfo: state.personalInfo,
});

export const ClientMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...ClientActionProps,
      ...ForceUpdateActionProps,
      ...PersonalInfoActionProps,
      ...RiskAssessmentActionProps,
      ...NewSalesActionProps,
      ...GlobalActionProps,
      ...InvestorsActionProps,
    },
    dispatch,
  );
};

export type ClientStoreProps = ReturnType<typeof ClientMapStateToProps> & ReturnType<typeof ClientMapDispatchToProps>;
