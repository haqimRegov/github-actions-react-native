import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement/actions";
import { ClientActionProps } from "../Client/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RiskAssessmentActionProps } from "../RiskAssessment/actions";
import { RootState } from "../rootReducer";
import { NewSalesActionProps } from "./actions";

export const NewSalesMapStateToProps = (state: RootState) => ({
  accountDetails: state.newSales.accountDetails,
  accountHolder: state.client.details?.accountHolder,
  client: state.client,
  newSales: state.newSales,
});

export const NewSalesMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...NewSalesActionProps,
      ...ClientActionProps,
      ...RiskAssessmentActionProps,
      ...PersonalInfoActionProps,
      ...AcknowledgementActionProps,
    },
    dispatch,
  );
};

export type NewSalesStoreProps = ReturnType<typeof NewSalesMapStateToProps> & ReturnType<typeof NewSalesMapDispatchToProps>;
