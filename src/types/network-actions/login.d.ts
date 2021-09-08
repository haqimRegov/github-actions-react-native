declare interface ILoginRequest {
  username: string;
  password: string;
}

declare interface ILoginHeader {
  deviceToken?: string;
  encryptionKey: string;
}

declare interface ILoginResult {
  accessKeyId: string;
  agentId: string;
  branch: string;
  email: string;
  identityId: string;
  inboxCount: string;
  isExpired: boolean;
  licenseCode: string;
  licenseType: string[];
  name: string;
  rank: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare interface ILoginMutation {
  userLogin: ILoginResponse;
}

declare type ILoginResponse = IMutationResponse<ILoginResult> | undefined;
