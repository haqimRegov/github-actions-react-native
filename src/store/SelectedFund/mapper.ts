import { bindActionCreators, Dispatch } from "redux";

import { OnboardingStepsActionProps } from "../OnboardingSteps";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { ProductsActionProps } from "../Products";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "./actions";

export const SelectedFundMapStateToProps = (state: RootState) => ({
  filters: state.products.filters,
  finishedSteps: state.onboardingSteps.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  selectedFunds: state.selectedFund.funds,
});

export const SelectedFundMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...OnboardingStepsActionProps, ...PersonalInfoActionProps, ...ProductsActionProps, ...SelectedFundActionProps },
    dispatch,
  );
};

export type SelectedFundStoreProps = ReturnType<typeof SelectedFundMapStateToProps> & ReturnType<typeof SelectedFundMapDispatchToProps>;
