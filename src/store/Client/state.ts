import { DICTIONARY_ACCOUNT_TYPE, DICTIONARY_ID_OTHER_TYPE, DICTIONARY_ID_TYPE } from "../../data/dictionary";

export type ClientState = {
  accountList: IAccountList[];
  accountType: TypeAccountChoices;
  details?: IClientDetailsState;
  isForceUpdate?: boolean;
  isNewFundPurchase: boolean;
  isNewSales: boolean;
};

export const clientInitialState: ClientState = {
  accountList: [],
  accountType: DICTIONARY_ACCOUNT_TYPE[0],
  details: {
    accountHolder: undefined,
    principalHolder: {
      clientId: undefined,
      name: "",
      country: "",
      dateOfBirth: "",
      id: "",
      idType: DICTIONARY_ID_TYPE[0],
      otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
    },
    jointHolder: {
      clientId: undefined,
      name: "",
      country: "",
      dateOfBirth: "",
      id: "",
      idType: DICTIONARY_ID_TYPE[0],
      otherIdType: DICTIONARY_ID_OTHER_TYPE[0].value,
    },
    verified: false,
    initId: undefined,
  },
  isForceUpdate: false,
  isNewFundPurchase: false,
  isNewSales: false,
};
