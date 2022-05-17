declare interface IExpiredPasswordRequest {
  confirmPassword: string;
  password: string;
}

declare interface IExpiredPasswordResult {
  message: string;
  status: boolean;
}

declare interface IExpiredPasswordHeader {
  encryptionKey: string;
}

declare type IExpiredPasswordResponse = IQueryResponse<IExpiredPasswordResult> | undefined;

declare interface IExpiredPasswordQuery {
  expiredChangePassword: IExpiredPasswordResponse;
}
