import { typedAction } from "../actionCreator";

export const addPersonalInfo = (personalInfo: IPersonalInfoState) => {
  return typedAction("personalInfo/ADD_PERSONAL_INFO", personalInfo);
};

export const resetPersonalInfo = () => {
  return typedAction("personalInfo/RESET_PERSONAL_INFO");
};

export type PersonalInfoAction = ReturnType<typeof addPersonalInfo | typeof resetPersonalInfo>;

export const PersonalInfoActionProps = { addPersonalInfo, resetPersonalInfo };

export type PersonalInfoActionsType = typeof PersonalInfoActionProps;
