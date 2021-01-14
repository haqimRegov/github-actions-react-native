import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global";
import { OnboardingActionProps } from "../Onboarding";
import { ProductsActionProps } from "../Products";
import { RootState } from "../rootReducer";
import { RiskAssessmentActionProps } from "./actions";

export const RiskMapStateToProps = (state: RootState) => ({
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  onboarding: state.onboarding,
  principalHolder: state.client.details?.principalHolder,
  questionnaire: state.riskAssessment.questionnaire,
  riskScore: state.riskAssessment.riskScore,
});

export const RiskMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...RiskAssessmentActionProps, ...ProductsActionProps, ...GlobalActionProps, ...OnboardingActionProps },
    dispatch,
  );
};

export type RiskStoreProps = ReturnType<typeof RiskMapStateToProps> & ReturnType<typeof RiskMapDispatchToProps>;
