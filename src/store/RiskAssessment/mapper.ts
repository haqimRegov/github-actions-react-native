import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { OnboardingActionProps } from "../Onboarding/actions";
import { ProductsActionProps } from "../Products/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { RiskAssessmentActionProps } from "./actions";

export const RiskMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  onboarding: state.onboarding,
  principalHolder: state.client.details?.principalHolder,
  questionnaire: state.riskAssessment.questionnaire,
  riskScore: state.riskAssessment.riskScore,
});

export const RiskMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...RiskAssessmentActionProps, ...ProductsActionProps, ...GlobalActionProps, ...OnboardingActionProps, ...SelectedFundActionProps },
    dispatch,
  );
};

export type RiskStoreProps = ReturnType<typeof RiskMapStateToProps> & ReturnType<typeof RiskMapDispatchToProps>;
