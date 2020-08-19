import { DICTIONARY_ACCOUNT_TYPE } from "../../data/dictionary";

export type ClientState = {
  accountType: TypeAccountChoices;
  details?: IClientDetailsState;
};

export const clientInitialState: ClientState = {
  accountType: DICTIONARY_ACCOUNT_TYPE[0],
  details: undefined,
};
