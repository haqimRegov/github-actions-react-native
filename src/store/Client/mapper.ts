import { bindActionCreators, Dispatch } from "redux";

import { ForceUpdateActionProps } from "../ForceUpdate";
import { GlobalActionProps } from "../Global/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { RootState } from "../rootReducer";
import { ClientActionProps } from "./actions";

export const ClientMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  forceUpdate: state.client.isForceUpdate,
  showOpenAccount: state.forceUpdate.showOpenAccount,
  personalInfo: state.personalInfo,
});

export const ClientMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...ClientActionProps, ...ForceUpdateActionProps, ...PersonalInfoActionProps, ...GlobalActionProps },
    dispatch,
  );
};

export type ClientStoreProps = ReturnType<typeof ClientMapStateToProps> & ReturnType<typeof ClientMapDispatchToProps>;
