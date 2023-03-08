import { DICTIONARY_CURRENCY } from "../data/dictionary";

export const getInitialBankState = (bankType: "local" | "foreign", bankAccountName?: string): IBankDetailsState => {
  const checkBankLocation = bankType === "foreign" ? { bankLocation: "" } : {};
  return {
    bankAccountName: bankAccountName || "",
    bankAccountNumber: "",
    bankName: "",
    bankSwiftCode: "",
    currency: [DICTIONARY_CURRENCY[0].value],
    otherBankName: "",
    ...checkBankLocation,
  };
};

export const checkLocalBankPartial = (bankDetails: IBankDetailsState[]): boolean => {
  const validatedArray = bankDetails.map(
    (bank) =>
      bank.bankName === "" &&
      bank.bankAccountNumber === "" &&
      bank.bankAccountNameError === undefined &&
      bank.bankAccountNumberError === undefined,
  );
  return validatedArray.includes(false) === true;
};

export const checkBankValidation = (bankDetails: IBankDetailsState[], bankType: "local" | "foreign"): boolean => {
  const validatedArray =
    bankDetails.length === 0 && bankType === "foreign"
      ? [true]
      : bankDetails.map(
          (bank) =>
            bank.bankName !== "" &&
            bank.bankAccountNumber !== "" &&
            bank.bankAccountName !== "" &&
            (bankType === "foreign" ? bank.bankLocation !== "" : true) &&
            bank.currency?.includes("") === false &&
            bank.bankAccountNameError === undefined &&
            bank.bankAccountNumberError === undefined,
        );
  return validatedArray.includes(false);
};
