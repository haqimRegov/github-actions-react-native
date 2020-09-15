import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { RootState } from "../rootReducer";
import { OnboardingStepsActionProps } from "./actions";

export const OnboardingStepsMapStateToProps = (state: RootState) => ({
  finishedSteps: state.onboardingSteps.finishedSteps,
  cancelOnboarding: state.personalInfo.cancelOnboarding,
});

export const OnboardingStepsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...OnboardingStepsActionProps, ...PersonalInfoActionProps, ...ClientActionProps }, dispatch);
};

export type OnboardingStepsStoreProps = ReturnType<typeof OnboardingStepsMapStateToProps> &
  ReturnType<typeof OnboardingStepsMapDispatchToProps>;
