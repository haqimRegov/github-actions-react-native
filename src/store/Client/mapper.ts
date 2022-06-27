import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RootState } from "../rootReducer";
import { ClientActionProps } from "./actions";

export const ClientMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  forceUpdate: state.client.isForceUpdate,
  personalInfo: state.personalInfo,
});

export const ClientMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...ClientActionProps, ...PersonalInfoActionProps, ...GlobalActionProps }, dispatch);
};

export type ClientStoreProps = ReturnType<typeof ClientMapStateToProps> & ReturnType<typeof ClientMapDispatchToProps>;
