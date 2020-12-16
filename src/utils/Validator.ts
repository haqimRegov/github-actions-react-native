import { DICTIONARY_AMOUNT_REGEX, DICTIONARY_EMAIL_REGEX, DICTIONARY_NUMBER_REGEX, DICTIONARY_PASSWORD_REGEX } from "../data/dictionary";

export const isPassword = (value: string) => {
  return value.match(DICTIONARY_PASSWORD_REGEX) !== null;
};

export const isAmount = (value: string) => {
  return value.match(DICTIONARY_AMOUNT_REGEX) !== null;
};

export const isEmail = (value: string) => {
  return value.match(DICTIONARY_EMAIL_REGEX) !== null;
};

export const isNumber = (value: string) => {
  return value.match(DICTIONARY_NUMBER_REGEX) !== null;
};
