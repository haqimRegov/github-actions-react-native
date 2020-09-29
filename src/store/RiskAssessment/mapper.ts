import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global";
import { RootState } from "../rootReducer";
import { RiskAssessmentActionProps } from "./actions";

export const RiskMapStateToProps = (state: RootState) => ({
  clientDetails: state.client.details,
  questionnaire: state.riskAssessment.questionnaire,
  riskScore: state.riskAssessment.riskScore,
});

export const RiskMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...RiskAssessmentActionProps, ...GlobalActionProps }, dispatch);
};

export type RiskStoreProps = ReturnType<typeof RiskMapStateToProps> & ReturnType<typeof RiskMapDispatchToProps>;
