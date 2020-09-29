import { DICTIONARY_NUMBER_REGEX, DICTIONARY_PASSWORD_REGEX } from "../data/dictionary";

export const isPassword = (value: string) => {
  return value.match(DICTIONARY_PASSWORD_REGEX) !== null;
};

export const isNumber = (value: string) => {
  return value.match(DICTIONARY_NUMBER_REGEX) !== null;
};
