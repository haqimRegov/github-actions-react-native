import { DICTIONARY_CURRENCY } from "../data/dictionary";

export const getInitialBankState = (bankAccountName?: string): IBankDetailsState => {
  return {
    bankAccountName: bankAccountName || "",
    bankAccountNumber: "",
    bankLocation: "",
    bankName: "",
    bankSwiftCode: "",
    currency: [DICTIONARY_CURRENCY[0].value],
    otherBankName: "",
  };
};
