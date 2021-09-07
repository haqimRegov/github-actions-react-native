declare interface IVerifyOTPRequest {
  code: string;
  nric: string;
}

declare interface IVerifyOTPResult {
  message: string;
  status: boolean;
}

declare interface IVerifyOTPMutation {
  verifyOtp: IVerifyOTPResponse;
}

declare type IVerifyOTPResponse = IMutationResponse<IVerifyOTPResult> | undefined;
