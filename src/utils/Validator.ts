import {
  DICTIONARY_ALPHANUMERIC_REGEX,
  DICTIONARY_AMOUNT_REGEX,
  DICTIONARY_EMAIL_REGEX,
  DICTIONARY_NON_NUMBER_REGEX,
  DICTIONARY_NUMBER_REGEX,
  DICTIONARY_PASSWORD_REGEX,
  ERROR,
} from "../data/dictionary";

export const isPassword = (value: string) => {
  return value.match(DICTIONARY_PASSWORD_REGEX) !== null;
};

export const isAmount = (value: string) => {
  return value.match(DICTIONARY_AMOUNT_REGEX) !== null;
};

export const isAlphaNumeric = (value: string) => {
  return value.match(DICTIONARY_ALPHANUMERIC_REGEX) !== null;
};

export const isEmail = (value: string) => {
  return value.match(DICTIONARY_EMAIL_REGEX) !== null;
};

export const isNumber = (value: string) => {
  return value.match(DICTIONARY_NUMBER_REGEX) !== null;
};

export const isNonNumber = (value: string) => {
  return value.match(DICTIONARY_NON_NUMBER_REGEX) !== null;
};

export const validateInput = (value: string, type: TInputs) => {
  let checkInput = { error: false, errorMessage: "" };
  switch (type) {
    case "amount":
      if (isAmount(value) === false) {
        checkInput = { ...checkInput, error: true, errorMessage: ERROR.INVESTMENT_INVALID_AMOUNT };
      }
      break;
    case "alphanumeric":
      if (isAlphaNumeric(value) === false) {
        checkInput = { ...checkInput, error: true, errorMessage: ERROR.INVALID_ALPHANUMERIC };
      }
      break;
    case "number":
      if (isNumber(value) === false) {
        checkInput = { ...checkInput, error: true, errorMessage: ERROR.INVALID_NUMBER };
      }
      break;
    default: {
      const error = value === "" ? { error: true, errorMessage: ERROR.INVALID_STRING } : {};
      checkInput = { ...checkInput, ...error };
      return checkInput;
    }
  }
  return checkInput;
};

export const booleanTextChange = (text: string | boolean) => {
  const lowerCase = `${text}`.toLowerCase();
  if (lowerCase === "true" || lowerCase === "yes") {
    return "Yes";
  }
  if (lowerCase === "false" || lowerCase === "no") {
    return "No";
  }
  return undefined;
};
