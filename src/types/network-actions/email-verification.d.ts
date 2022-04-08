declare interface IEmailVerificationRequest {
  initId?: number;
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
  emailVerificationV2: IEmailVerificationResponse;
}

declare type IEmailVerificationResponse = IMutationResponse<IEmailVerificationResult> | undefined;
