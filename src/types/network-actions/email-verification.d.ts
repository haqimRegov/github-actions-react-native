declare interface IEmailVerificationRequest {
  clientId: string;
  id?: string;
  initId: string;
  isForceUpdate: boolean;
  principalHolder: {
    email: string;
  };
  jointHolder?: {
    email: string;
  };
}

declare interface IEmailVerificationResult {
  message: string;
  status: boolean;
  otpSendTime: string;
}

declare interface IEmailVerificationMutation {
  emailVerificationV2: IEmailVerificationResponse;
}

declare type IEmailVerificationResponse = IMutationResponse<IEmailVerificationResult> | undefined;
