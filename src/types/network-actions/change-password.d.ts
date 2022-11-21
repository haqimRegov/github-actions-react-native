declare interface IChangePasswordRequest {
  confirmPassword: string;
  currentPassword: string;
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
  changePasswordV2: IChangePasswordResponse;
}
