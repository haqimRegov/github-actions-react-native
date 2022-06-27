import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement/actions";
import { ClientActionProps } from "../Client/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RiskAssessmentActionProps } from "../RiskAssessment/actions";
import { RootState } from "../rootReducer";
import { ForceUpdateActionProps } from "./actions";

export const ForceUpdateMapStateToProps = (state: RootState) => ({
  accountHolder: state.client.details?.accountHolder,
  disabledSteps: state.forceUpdate.disabledSteps,
  finishedSteps: state.forceUpdate.finishedSteps,
});

export const ForceUpdateMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...ForceUpdateActionProps,
      ...ClientActionProps,
      ...RiskAssessmentActionProps,
      ...PersonalInfoActionProps,
      ...AcknowledgementActionProps,
    },
    dispatch,
  );
};

export type ForceUpdateStoreProps = ReturnType<typeof ForceUpdateMapStateToProps> & ReturnType<typeof ForceUpdateMapDispatchToProps>;
