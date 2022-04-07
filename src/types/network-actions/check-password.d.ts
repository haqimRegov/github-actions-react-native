declare interface ICheckPasswordRequest {
  password: string;
}

declare interface ICheckPasswordResult {
  message: string;
  status: boolean;
}

declare interface ICheckPasswordHeader {
  encryptionKey: string;
}

declare type ICheckPasswordResponse = IQueryResponse<ICheckPasswordResult> | undefined;

declare interface ICheckPasswordQuery {
  checkPassword: ICheckPasswordResponse;
}
