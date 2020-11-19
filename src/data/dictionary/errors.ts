const LOGIN_INVALID = "Invalid NRIC or Password.";
const LOGIN_INVALID_NRIC = "Your NRIC Number is invalid.";
const LOGIN_INVALID_OTP = "Invalid OTP entered. Please try again.";
const PASSWORD_NOT_MATCH = "Password does not match.";
const OCR_INVALID_NRIC = "Kindly upload a valid NRIC.";
const OCR_INVALID_NRIC_DATA = "We’re unable to capture the data from the image you uploaded.";

export const ERROR = { LOGIN_INVALID, LOGIN_INVALID_NRIC, LOGIN_INVALID_OTP, PASSWORD_NOT_MATCH, OCR_INVALID_NRIC, OCR_INVALID_NRIC_DATA };

export const ERROR_CODE = { lockedAccount: "EM001", otpAttempt: "EM002" };
export const ERROR_CODE_OCR = { invalidNric: "EM011", invalidNricData: "EM012" };
