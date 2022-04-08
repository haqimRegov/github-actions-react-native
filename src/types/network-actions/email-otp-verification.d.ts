declare interface IEmailOtpVerificationRequest {
  initId?: number;
  principalHolder: {
    email: string;
    code: string;
  };
  jointHolder?: {
    email: string;
    code: string;
  };
  clientId: string;
}

declare interface IEmailOtpVerificationResult {
  message: string;
  status: boolean;
}

declare interface IEmailOtpVerificationMutation {
  emailOtpVerificationV2: IEmailOtpVerificationResponse;
}

declare type IEmailOtpVerificationResponse = IMutationResponse<IEmailOtpVerificationResult> | undefined;
