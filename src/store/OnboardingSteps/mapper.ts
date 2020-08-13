import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { OnboardingStepsActionProps } from "./actions";

export const OnboardingStepsMapStateToProps = (state: RootState) => ({
  finishedSteps: state.onboardingSteps.finishedSteps,
});

export const OnboardingStepsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(OnboardingStepsActionProps, dispatch);
};

export type OnboardingStepsStoreProps = ReturnType<typeof OnboardingStepsMapStateToProps> &
  ReturnType<typeof OnboardingStepsMapDispatchToProps>;
