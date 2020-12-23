import { bindActionCreators, Dispatch } from "redux";

import { RootState } from "../rootReducer";
import { AcknowledgementActionProps } from "./actions";

export const AcknowledgementMapStateToProps = (state: RootState) => ({
  investmentDetails: state.selectedFund.investmentDetails,
  orders: state.acknowledgement.orders,
  personalInfo: state.personalInfo,
});

export const AcknowledgementMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(AcknowledgementActionProps, dispatch);
};

export type AcknowledgementStoreProps = ReturnType<typeof AcknowledgementMapStateToProps> &
  ReturnType<typeof AcknowledgementMapDispatchToProps>;
