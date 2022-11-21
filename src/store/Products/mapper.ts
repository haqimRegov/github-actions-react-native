import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement";
import { GlobalActionProps } from "../Global/actions";
import { NewSalesActionProps } from "../NewSales";
import { OnboardingActionProps } from "../Onboarding/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund/actions";
import { ProductsActionProps } from "./actions";

export const ProductsMapStateToProps = (state: RootState) => ({
  accountDetails: state.newSales.accountDetails,
  accountType: state.client.accountType,
  amp: state.products.amp,
  client: state.client,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  global: state.global,
  investmentDetails: state.selectedFund.investmentDetails,
  licenseType: state.global.agent!.licenseType,
  loading: state.global.loading,
  newSales: state.newSales,
  onboarding: state.onboarding,
  personalInfo: state.personalInfo,
  products: state.products,
  productType: state.products.productType,
  prs: state.products.prs,
  prsDefault: state.products.prsDefault,
  riskAssessment: state.riskAssessment,
  riskScore: state.riskAssessment.riskScore,
  selectedFunds: state.selectedFund.funds,
  ut: state.products.ut,
  viewFund: state.selectedFund.viewFund,
});

export const ProductsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...OnboardingActionProps,
      ...PersonalInfoActionProps,
      ...ProductsActionProps,
      ...NewSalesActionProps,
      ...SelectedFundActionProps,
      ...GlobalActionProps,
      ...AcknowledgementActionProps,
    },
    dispatch,
  );
};

export type ProductsStoreProps = ReturnType<typeof ProductsMapStateToProps> & ReturnType<typeof ProductsMapDispatchToProps>;
