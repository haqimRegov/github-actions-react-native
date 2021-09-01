declare interface IChangePasswordRequest {
  confirmPassword: string;
  password: string;
}

declare interface IChangePasswordResult {
  message: string;
  status: boolean;
}

declare interface IChangePasswordHeader {
  encryptionKey: string;
}

declare type IChangePasswordResponse = IQueryResponse<IChangePasswordResult> | undefined;

declare interface IChangePasswordQuery {
  changePassword: IChangePasswordResponse;
}
