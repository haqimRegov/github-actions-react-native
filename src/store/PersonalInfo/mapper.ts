import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { RootState } from "../rootReducer";
import { PersonalInfoActionProps } from "./actions";

export const PersonalInfoMapStateToProps = (state: RootState) => ({
  personalInfo: state.personalInfo,
  details: state.client.details,
  accountType: state.client.accountType,
  riskScore: state.riskAssessment.riskScore,
});

export const PersonalInfoMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...PersonalInfoActionProps, ...ClientActionProps }, dispatch);
};

export type PersonalInfoStoreProps = ReturnType<typeof PersonalInfoMapStateToProps> & ReturnType<typeof PersonalInfoMapDispatchToProps>;
