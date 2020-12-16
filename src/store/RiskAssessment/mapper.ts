import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global";
import { OnboardingActionProps } from "../Onboarding";
import { RootState } from "../rootReducer";
import { RiskAssessmentActionProps } from "./actions";

export const RiskMapStateToProps = (state: RootState) => ({
  finishedSteps: state.onboarding.finishedSteps,
  principalHolder: state.client.details?.principalHolder,
  questionnaire: state.riskAssessment.questionnaire,
  riskScore: state.riskAssessment.riskScore,
});

export const RiskMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...RiskAssessmentActionProps, ...GlobalActionProps, ...OnboardingActionProps }, dispatch);
};

export type RiskStoreProps = ReturnType<typeof RiskMapStateToProps> & ReturnType<typeof RiskMapDispatchToProps>;
