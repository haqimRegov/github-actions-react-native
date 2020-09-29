declare interface IResendLockOTPRequest {
  nric: string;
}

declare interface IResendLockOTPResult {
  message: string;
  status: boolean;
}

declare interface IResendLockOTPMutation {
  resendLockOtp: IResendLockOTPResponse;
}

declare type IResendLockOTPResponse = IMutationResponse<IResendLockOTPResult> | undefined;
