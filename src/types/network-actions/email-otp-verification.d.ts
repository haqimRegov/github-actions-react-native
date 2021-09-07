declare interface IEmailOtpVerificationRequest {
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
  emailVerification: IEmailOtpVerificationResponse;
}

declare type IEmailOtpVerificationResponse = IMutationResponse<IEmailOtpVerificationResult> | undefined;
