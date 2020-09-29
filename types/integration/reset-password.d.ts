declare interface IResetPasswordRequest {
  username: string;
  password: string;
  confirmPassword: string;
}

declare interface IResetPasswordResult {
  message: string;
  status: boolean;
}

declare interface IResetPasswordMutation {
  resetPassword: IResetPasswordResponse;
}

declare type IResetPasswordResponse = IMutationResponse<IResetPasswordResult> | undefined;
