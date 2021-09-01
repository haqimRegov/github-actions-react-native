declare interface IForgotPasswordRequest {
  nric: string;
}

declare interface IForgotPasswordResult {
  email: string;
  message: string;
  status: boolean;
}

declare interface IForgotPasswordMutation {
  forgotPassword: IForgotPasswordResponse;
}

declare type IForgotPasswordResponse = IMutationResponse<IForgotPasswordResult> | undefined;
