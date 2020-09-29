declare interface ISignUpRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

declare interface ISignUpResult {
  message: string;
  status: boolean;
}

declare interface ISignUpMutation {
  signUp: ISignUpResponse;
}

declare type ISignUpResponse = IMutationResponse<ISignUpResult> | undefined;
