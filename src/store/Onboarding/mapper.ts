import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement";
import { ClientActionProps } from "../Client";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { ProductsActionProps } from "../Products";
import { RiskAssessmentActionProps } from "../RiskAssessment";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { OnboardingActionProps } from "./actions";

export const OnboardingMapStateToProps = (state: RootState) => ({
  disabledSteps: state.onboarding.disabledSteps,
  finishedSteps: state.onboarding.finishedSteps,
  // questionnaire: state.riskAssessment.questionnaire,
  // riskScore: state.riskAssessment.riskScore,
});

export const OnboardingMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...OnboardingActionProps,
      ...ClientActionProps,
      ...RiskAssessmentActionProps,
      ...ProductsActionProps,
      ...SelectedFundActionProps,
      ...PersonalInfoActionProps,
      ...AcknowledgementActionProps,
    },
    dispatch,
  );
};

export type OnboardingStoreProps = ReturnType<typeof OnboardingMapStateToProps> & ReturnType<typeof OnboardingMapDispatchToProps>;
