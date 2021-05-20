export const DICTIONARY_PASSWORD = [
  { label: "Minimum of 8 and maximum of 20 characters", validation: /(?=^.{8,20}$)/ },
  { label: "At least one upper-case letter (A-Z)", validation: /(?=.*[A-Z])/ },
  { label: "At least one lower-case letter (a-z)", validation: /(?=.*[a-z])/ },
  { label: "At least one number (0-9)", validation: /(?=.*[0-9])/ },
  {
    label: "At least one special character (@, #, $)",
    validation: /\W+/,
  },
];

export const DICTIONARY_PASSWORD_MAX_LENGTH = 20;
export const DICTIONARY_PASSWORD_REGEX = /(?=^.{8,20}$)(?=.*\w)(?=.*\W)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^.*/;
