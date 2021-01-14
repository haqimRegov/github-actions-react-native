import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global";
import { OnboardingActionProps } from "../Onboarding";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { ProductsActionProps } from "./actions";

export const ProductsMapStateToProps = (state: RootState) => ({
  licenseType: state.global.agent!.licenseType,
  finishedSteps: state.onboarding.finishedSteps,
  ut: state.products.ut,
  prs: state.products.prs,
  prsDefault: state.products.prsDefault,
  amp: state.products.amp,
  products: state.products,
  productType: state.products.productType,
  investmentDetails: state.selectedFund.investmentDetails,
  riskProfile: state.riskAssessment.riskScore.appetite,
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
