export const DICTIONARY_PASSWORD = [
  { label: "Must be of 8-20 characters", validation: /(?=^.{8,20}$)/ },
  { label: "At least one upper-case letter (A-Z)", validation: /(?=.*[A-Z])/ },
  { label: "At least one lower-case letter (a-z)", validation: /(?=.*[a-z])/ },
  { label: "At least one number (0-9)", validation: /(?=.*[0-9])/ },
  {
    label: "At least one special characters (@, #, $)",
    validation: /\W+/,
  },
];

export const DICTIONARY_PASSWORD_MIN_LENGTH = 8;
export const DICTIONARY_PASSWORD_MAX_LENGTH = 20;
export const DICTIONARY_CHAR_REGEX = /(?=^.{8,20}$)/;
export const DICTIONARY_LOWERCASE_REGEX = /(?=.*[a-z])/;
export const DICTIONARY_NUMBER_REGEX = /^[0-9]+$/;
export const DICTIONARY_PASSWORD_REGEX = /(?=^.{8,20}$)(?=.*\w)(?=.*\W)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^.*/;
export const DICTIONARY_SPECIAL_CHAR_REGEX = /\W+/;
export const DICTIONARY_UPPERCASE_REGEX = /(?=.*[A-Z])/;
