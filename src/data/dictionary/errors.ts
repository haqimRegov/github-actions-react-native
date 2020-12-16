const INVESTMENT_MIN_AMOUNT = "The amount you have entered didn't reach the minimum amount.";
const INVESTMENT_MAX_AMOUNT = "The amount you have entered didn't exceeds the maximum amount.";
const INVESTMENT_INVALID_AMOUNT = "The amount you have entered is invalid.";
const INVESTMENT_INVALID_EMAIL = "The email you have entered is invalid.";
const LOGIN_INVALID = "Invalid NRIC or Password.";
const LOGIN_INVALID_NRIC = "Your NRIC Number is invalid.";
const LOGIN_INVALID_OTP = "Invalid OTP entered. Please try again.";
const PASSWORD_NOT_MATCH = "Password does not match.";
const OCR_INVALID_NRIC = "Kindly upload a valid NRIC.";
const OCR_INVALID_NRIC_DATA = "We’re unable to capture the data from the image you uploaded.";

export const ERROR = {
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
};
