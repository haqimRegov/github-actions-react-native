declare interface ILoginRequest {
  username: string;
  password: string;
}

declare interface ILoginHeader {
  encryptionKey: string;
}

declare interface ILoginResult {
  accessKeyId: string;
  email: string;
  identityId: string;
  licenseCode: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare interface ILoginMutation {
  userLogin: ILoginResponse;
}

declare type ILoginResponse = IMutationResponse<ILoginResult> | undefined;
