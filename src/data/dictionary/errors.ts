const LOGIN_INVALID = "Invalid NRIC or Password.";
const LOGIN_INVALID_NRIC = "Invalid NRIC";
const LOGIN_INVALID_OTP = "Invalid OTP entered. Please try again.";
const PASSWORD_NOT_MATCH = "The new password does not match. Please enter and reconfirm the new password.";

export const ERROR = { LOGIN_INVALID, LOGIN_INVALID_NRIC, LOGIN_INVALID_OTP, PASSWORD_NOT_MATCH };

export const ERROR_CODE = { lockedAccount: "EM001", otpAttempt: "EM002" };
