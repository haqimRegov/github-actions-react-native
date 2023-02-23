import { DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../data/dictionary";

export type ClientState = {
  accountList: IAccountList[];
  accountType?: TypeAccountChoices;
  details?: IClientDetailsState;
  directToAccountOpening: boolean;
  isForceUpdate?: boolean;
  isNewFundPurchase: boolean;
  isNewSales: boolean;
};

export const clientInitialState: ClientState = {
  accountList: [],
  accountType: undefined,
  details: {
    accountHolder: undefined,
    principalHolder: {
      address: undefined,
      clientId: undefined,
      name: "",
      country: "",
      dateOfBirth: "",
      id: "",
      isEtb: false,
      idType: DICTIONARY_ID_TYPE[0],
      otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
    },
    jointHolder: {
      clientId: undefined,
      name: "",
      country: "",
      dateOfBirth: "",
      id: "",
      isEtb: false,
      idType: DICTIONARY_ID_TYPE[0],
      otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
    },
    verified: false,
    initId: undefined,
  },
  directToAccountOpening: false,
  isForceUpdate: false,
  isNewFundPurchase: false,
  isNewSales: false,
};
