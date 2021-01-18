import { PersonalInfoAction } from "./actions";
import { personalInfoInitialState, PersonalInfoState } from "./state";

export function personalInfoReducer(state = personalInfoInitialState, action: PersonalInfoAction): PersonalInfoState {
  switch (action.type) {
    case "personalInfo/ADD_PERSONAL_INFO":
      return {
        ...state,
        ...action.payload,
        principal: { ...state.principal, ...action.payload.principal },
        joint: { ...state.joint, ...action.payload.joint },
      };

    case "personalInfo/RESET_PERSONAL_INFO":
      return { ...personalInfoInitialState };

    default:
      return state;
  }
}
