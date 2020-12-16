import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { RootState } from "../rootReducer";
import { ClientActionProps } from "./actions";

export const ClientMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  personalInfo: state.personalInfo,
});

export const ClientMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...ClientActionProps, ...PersonalInfoActionProps, ...GlobalActionProps }, dispatch);
};

export type ClientStoreProps = ReturnType<typeof ClientMapStateToProps> & ReturnType<typeof ClientMapDispatchToProps>;
