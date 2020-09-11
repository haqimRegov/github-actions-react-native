import { PersonalInfoAction } from "./actions";
import { personalInfoInitialState, PersonalInfoState } from "./state";

export function personalInfoReducer(state = personalInfoInitialState, action: PersonalInfoAction): PersonalInfoState {
  switch (action.type) {
    case "personalInfo/ADD_PERSONAL_INFO":
      return {
        ...state,
        principal: { ...state.principal, ...action.payload.principal },
        joint: { ...state.joint, ...action.payload.joint },
      };

    case "personalInfo/RESET_PERSONAL_INFO":
      return {
        ...state,
        principal: undefined,
        joint: undefined,
      };

    default:
      return state;
  }
}
