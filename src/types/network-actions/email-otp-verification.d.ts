declare interface IEmailOtpVerificationRequest {
  clientId: string;
  id?: string;
  initId: string;
  isForceUpdate: boolean;
  principalHolder: {
    email: string;
    code: string;
  };
  jointHolder?: {
    email: string;
    code: string;
  };
}

declare interface IEmailOtpVerificationResult {
  message: string;
  status: boolean;
}

declare interface IEmailOtpVerificationMutation {
  emailOtpVerificationV2: IEmailOtpVerificationResponse;
}

declare type IEmailOtpVerificationResponse = IMutationResponse<IEmailOtpVerificationResult> | undefined;
