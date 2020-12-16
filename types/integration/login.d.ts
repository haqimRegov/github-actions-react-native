declare interface ILoginRequest {
  username: string;
  password: string;
}

declare interface ILoginHeader {
  deviceToken: string;
  encryptionKey: string;
}

declare interface ILoginResult {
  accessKeyId: string;
  agentId: string;
  email: string;
  identityId: string;
  licenseCode: string;
  licenseType: string[];
  name: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare interface ILoginMutation {
  userLogin: ILoginResponse;
}

declare type ILoginResponse = IMutationResponse<ILoginResult> | undefined;
