declare interface IVerifyLockOTPRequest {
  code: string;
  nric: string;
}

declare interface IVerifyLockOTPResult {
  message: string;
  status: boolean;
}

declare interface IVerifyLockOTPMutation {
  verifyOtpAgent: IVerifyLockOTPResponse;
}

declare type IVerifyLockOTPResponse = IMutationResponse<IVerifyLockOTPResult> | undefined;
