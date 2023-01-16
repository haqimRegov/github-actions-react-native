import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement/actions";
import { ClientActionProps } from "../Client/actions";
import { ForceUpdateActionProps } from "../ForceUpdate";
import { GlobalActionProps } from "../Global/actions";
import { NewSalesActionProps } from "../NewSales";
import { OnboardingActionProps } from "../Onboarding/actions";
import { RootState } from "../rootReducer";
import { PersonalInfoActionProps } from "./actions";

export const PersonalInfoMapStateToProps = (state: RootState) => ({
  accountHolder: state.client.details?.accountHolder,
  accountType: state.client.accountType,
  client: state.client,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  forceUpdate: state.forceUpdate,
  investmentDetails: state.selectedFund.investmentDetails,
  newSales: state.newSales,
  onboarding: state.onboarding,
  personalInfo: state.personalInfo,
  productSales: state.selectedFund.investmentDetails,
  questionnaire: state.riskAssessment.questionnaire,
  riskScore: state.riskAssessment.riskScore,
});

export const PersonalInfoMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...PersonalInfoActionProps,
      ...ForceUpdateActionProps,
      ...NewSalesActionProps,
      ...OnboardingActionProps,
      ...ClientActionProps,
      ...GlobalActionProps,
      ...AcknowledgementActionProps,
    },
    dispatch,
  );
};

export type PersonalInfoStoreProps = ReturnType<typeof PersonalInfoMapStateToProps> & ReturnType<typeof PersonalInfoMapDispatchToProps>;
