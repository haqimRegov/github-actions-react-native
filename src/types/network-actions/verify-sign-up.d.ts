declare interface IVerifySignUpRequest {
  code: string;
  nric: string;
}

declare interface IVerifySignUpResult {
  message: string;
  status: boolean;
}

declare interface IVerifySignUpMutation {
  verifySignUp: IVerifySignUpResponse;
}

declare type IVerifySignUpResponse = IMutationResponse<IVerifySignUpResult> | undefined;
