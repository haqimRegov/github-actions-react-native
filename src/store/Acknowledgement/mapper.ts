import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global";
import { OnboardingActionProps } from "../Onboarding";
import { RootState } from "../rootReducer";
import { AcknowledgementActionProps } from "./actions";

export const AcknowledgementMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  orders: state.acknowledgement.orders,
  receipts: state.acknowledgement.receipts,
  personalInfo: state.personalInfo,
  paymentSummary: state.acknowledgement.paymentSummary,
});

export const AcknowledgementMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...AcknowledgementActionProps, ...GlobalActionProps, ...OnboardingActionProps }, dispatch);
};

export type AcknowledgementStoreProps = ReturnType<typeof AcknowledgementMapStateToProps> &
  ReturnType<typeof AcknowledgementMapDispatchToProps>;
