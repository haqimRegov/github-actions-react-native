import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { OnboardingActionProps } from "../Onboarding/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund/actions";
import { ProductsActionProps } from "./actions";

export const ProductsMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  details: state.client.details,
  licenseType: state.global.agent!.licenseType,
  onboarding: state.onboarding,
  finishedSteps: state.onboarding.finishedSteps,
  global: state.global,
  ut: state.products.ut,
  prs: state.products.prs,
  prsDefault: state.products.prsDefault,
  loading: state.global.loading,
  amp: state.products.amp,
  products: state.products,
  productType: state.products.productType,
  investmentDetails: state.selectedFund.investmentDetails,
  riskScore: state.riskAssessment.riskScore,
  selectedFunds: state.selectedFund.funds,
  viewFund: state.selectedFund.viewFund,
});

export const ProductsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...OnboardingActionProps, ...PersonalInfoActionProps, ...ProductsActionProps, ...SelectedFundActionProps, ...GlobalActionProps },
    dispatch,
  );
};

export type ProductsStoreProps = ReturnType<typeof ProductsMapStateToProps> & ReturnType<typeof ProductsMapDispatchToProps>;
