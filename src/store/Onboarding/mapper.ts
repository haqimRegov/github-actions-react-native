import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement/actions";
import { ClientActionProps } from "../Client/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { ProductsActionProps } from "../Products/actions";
import { RiskAssessmentActionProps } from "../RiskAssessment/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund/actions";
import { TransactionsActionProps } from "../Transactions";
import { OnboardingActionProps } from "./actions";

export const OnboardingMapStateToProps = (state: RootState) => ({
  disabledSteps: state.onboarding.disabledSteps,
  finishedSteps: state.onboarding.finishedSteps,
  personalInfo: state.personalInfo,
  riskInfo: state.onboarding.riskInfo,
  transactions: state.transactions,
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
      ...TransactionsActionProps,
    },
    dispatch,
  );
};

export type OnboardingStoreProps = ReturnType<typeof OnboardingMapStateToProps> & ReturnType<typeof OnboardingMapDispatchToProps>;
