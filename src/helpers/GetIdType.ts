import { Language } from "../constants/language";
import { isNotEmpty, titleCaseString } from "../utils";

const { ADD_CLIENT } = Language.PAGE;

export const extractIdType = (idType: TypeClientID): string => {
  return idType === "Army" || idType === "Police"
    ? `${idType} ${ADD_CLIENT.LABEL_ID} ${ADD_CLIENT.LABEL_NUMBER}`
    : `${idType} ${ADD_CLIENT.LABEL_NUMBER}`;
};

export const extractActualIdType = (data: IClientBasicInfo) => {
  const otherIdType = isNotEmpty(data.otherIdType) ? titleCaseString(data.otherIdType!) : data.otherIdType;
  const idType = isNotEmpty(data.idType) && data.idType !== "NRIC" ? titleCaseString(data.idType!) : data.idType;

  return data.idType === "Other"
    ? `${otherIdType} ${ADD_CLIENT.LABEL_ID} ${ADD_CLIENT.LABEL_NUMBER}`
    : `${idType} ${ADD_CLIENT.LABEL_NUMBER}`;
};
