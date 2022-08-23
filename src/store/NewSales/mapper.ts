import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement/actions";
import { ClientActionProps } from "../Client/actions";
import { ForceUpdateActionProps } from "../ForceUpdate";
import { InvestorsActionProps } from "../Investors";
import { OnboardingActionProps } from "../Onboarding";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { ProductsActionProps } from "../Products";
import { RiskAssessmentActionProps } from "../RiskAssessment/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { TransactionsActionProps } from "../Transactions";
import { NewSalesActionProps } from "./actions";

export const NewSalesMapStateToProps = (state: RootState) => ({
  accountDetails: state.newSales.accountDetails,
  accountHolder: state.client.details?.accountHolder,
  client: state.client,
  newSales: state.newSales,
  personalInfo: state.personalInfo,
  riskAssessment: state.riskAssessment,
  riskScore: state.riskAssessment.riskScore,
  transactionType: state.newSales.transactionType,
  transactions: state.transactions,
});

export const NewSalesMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...NewSalesActionProps,
      ...AcknowledgementActionProps,
      ...ClientActionProps,
      ...ForceUpdateActionProps,
      ...InvestorsActionProps,
      ...OnboardingActionProps,
      ...PersonalInfoActionProps,
      ...ProductsActionProps,
      ...RiskAssessmentActionProps,
      ...SelectedFundActionProps,
      ...TransactionsActionProps,
    },
    dispatch,
  );
};

export type NewSalesStoreProps = ReturnType<typeof NewSalesMapStateToProps> & ReturnType<typeof NewSalesMapDispatchToProps>;
