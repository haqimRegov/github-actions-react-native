import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { OnboardingActionProps } from "../Onboarding/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { ProductsActionProps } from "../Products/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "./actions";

export const SelectedFundMapStateToProps = (state: RootState) => ({
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  selectedFunds: state.selectedFund.funds,
  viewFund: state.selectedFund.viewFund,
  loading: state.global.loading,
});

export const SelectedFundMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...OnboardingActionProps, ...PersonalInfoActionProps, ...ProductsActionProps, ...SelectedFundActionProps, ...GlobalActionProps },
    dispatch,
  );
};

export type SelectedFundStoreProps = ReturnType<typeof SelectedFundMapStateToProps> & ReturnType<typeof SelectedFundMapDispatchToProps>;
