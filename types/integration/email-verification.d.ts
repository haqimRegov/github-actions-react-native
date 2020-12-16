declare interface IEmailVerificationRequest {
  principalHolder: {
    email: string;
  };
  jointHolder?: {
    email: string;
  };
  clientId: string;
}

declare interface IEmailVerificationResult {
  message: string;
  status: boolean;
}

declare interface IEmailVerificationMutation {
  emailVerification: IEmailVerificationResponse;
}

declare type IEmailVerificationResponse = IMutationResponse<IEmailVerificationResult> | undefined;
