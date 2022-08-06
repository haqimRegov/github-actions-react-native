import { bindActionCreators, Dispatch } from "redux";

import { ForceUpdateActionProps } from "../ForceUpdate";
import { GlobalActionProps } from "../Global/actions";
import { NewSalesActionProps } from "../NewSales";
import { OnboardingActionProps } from "../Onboarding/actions";
import { ProductsActionProps } from "../Products/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { RiskAssessmentActionProps } from "./actions";

export const RiskMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  client: state.client,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  forceUpdate: state.forceUpdate,
  isRiskUpdated: state.riskAssessment.isRiskUpdated,
  newSales: state.newSales,
  onboarding: state.onboarding,
  personalInfo: state.personalInfo,
  principalHolder: state.client.details?.principalHolder,
  questionnaire: state.riskAssessment.questionnaire,
  riskScore: state.riskAssessment.riskScore,
});

export const RiskMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...RiskAssessmentActionProps,
      ...ForceUpdateActionProps,
      ...NewSalesActionProps,
      ...ProductsActionProps,
      ...GlobalActionProps,
      ...OnboardingActionProps,
      ...SelectedFundActionProps,
    },
    dispatch,
  );
};

export type RiskStoreProps = ReturnType<typeof RiskMapStateToProps> & ReturnType<typeof RiskMapDispatchToProps>;
