import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement/actions";
import { ClientActionProps } from "../Client/actions";
import { GlobalActionProps } from "../Global/actions";
import { OnboardingActionProps } from "../Onboarding/actions";
import { RootState } from "../rootReducer";
import { PersonalInfoActionProps } from "./actions";

export const PersonalInfoMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  onboarding: state.onboarding,
  personalInfo: state.personalInfo,
  riskScore: state.riskAssessment.riskScore,
  productSales: state.selectedFund.investmentDetails,
});

export const PersonalInfoMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...PersonalInfoActionProps, ...OnboardingActionProps, ...ClientActionProps, ...GlobalActionProps, ...AcknowledgementActionProps },
    dispatch,
  );
};

export type PersonalInfoStoreProps = ReturnType<typeof PersonalInfoMapStateToProps> & ReturnType<typeof PersonalInfoMapDispatchToProps>;
