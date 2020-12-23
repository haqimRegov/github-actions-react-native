import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { GlobalActionProps } from "../Global";
import { OnboardingActionProps } from "../Onboarding";
import { RootState } from "../rootReducer";
import { PersonalInfoActionProps } from "./actions";

export const PersonalInfoMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  personalInfo: state.personalInfo,
  riskScore: state.riskAssessment.riskScore,
});

export const PersonalInfoMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...PersonalInfoActionProps, ...OnboardingActionProps, ...ClientActionProps, ...GlobalActionProps }, dispatch);
};

export type PersonalInfoStoreProps = ReturnType<typeof PersonalInfoMapStateToProps> & ReturnType<typeof PersonalInfoMapDispatchToProps>;
