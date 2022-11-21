declare interface ILoginRequest {
  hideEvent: string | null;
  password: string;
  username: string;
}

declare interface ILoginHeader {
  deviceToken?: string;
  encryptionKey: string;
}

declare interface ILoginResult {
  accessKeyId: string;
  agentCategory: string;
  agentId: string;
  branch: string;
  email: string;
  events: IEvent[];
  identityId: string;
  inboxCount: string;
  isExpired: boolean;
  isTermsAgreed: boolean;
  isMultiUtmc: boolean;
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
