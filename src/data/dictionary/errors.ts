const INVALID_NAME = "Kindly input a valid name.";
const INVALID_NUMBER = "Kindly input a valid number.";
const INVALID_BANK_NAME = "Kindly input a bank account name.";
const INVALID_BANK_NUMBER = "Kindly input a bank account number.";
const INVALID_CHEQUE_NUMBER = "Kindly input a cheque number.";
const INVALID_POST_CODE = "Kindly input a valid post code.";
const INVESTMENT_MIN_AMOUNT = "The amount you have entered didn't reach the minimum amount.";
const INVESTMENT_MAX_AMOUNT = "The amount you have entered exceeds the maximum amount.";
const INVESTMENT_INVALID_AMOUNT = "The amount you have entered is invalid.";
const INVESTMENT_INVALID_EMAIL = "The email you have entered is invalid.";
const LOGIN_INVALID = "Incorrect password or NRIC.";
const LOGIN_INVALID_NRIC = "Your NRIC Number is invalid.";
const LOGIN_INVALID_OTP = "Invalid OTP entered. Please try again.";
const PASSWORD_NOT_MATCH = "Passwords did not match. Please try again.";
const OCR_INVALID_NRIC = "Kindly upload a valid NRIC.";
const OCR_INVALID_NRIC_DATA = "We’re unable to capture the data from the image you uploaded.";

export const ERROR = {
  INVALID_BANK_NAME,
  INVALID_BANK_NUMBER,
  INVALID_CHEQUE_NUMBER,
  INVALID_NAME,
  INVALID_NUMBER,
  INVALID_POST_CODE,
  INVESTMENT_MIN_AMOUNT,
  INVESTMENT_MAX_AMOUNT,
  INVESTMENT_INVALID_AMOUNT,
  INVESTMENT_INVALID_EMAIL,
  LOGIN_INVALID,
  LOGIN_INVALID_NRIC,
  LOGIN_INVALID_OTP,
  PASSWORD_NOT_MATCH,
  OCR_INVALID_NRIC,
  OCR_INVALID_NRIC_DATA,
};

export const ERROR_CODE = {
  lockedAccount: "EM001",
  otpAttempt: "EM002",
  invalidNric: "EM011",
  invalidNricData: "EM012",
  clientAgeMinimum: "EM600",
  clientAgeMaximum: "EM601",
  clientBannedCountry: "EM602",
  internal: "OMNI400",
  unauthenticated: "OMNI401",
  network: "OMNI402",
};

export const ERRORS = {
  internal: { errorCode: ERROR_CODE.internal, message: "Something went wrong", statusCode: "400" },
  network: { errorCode: ERROR_CODE.network, message: "No Internet Connection", statusCode: "402" },
  unauthenticated: { errorCode: ERROR_CODE.unauthenticated, message: "Please log in again.", statusCode: "401" },
};
