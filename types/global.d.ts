declare interface IConfig {
  accessKeyId: string;
  identityId: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare interface IAgentProfile {
  email: string;
  licenseCode: string;
  agentCode?: string;
  branch?: string;
  name?: string;
  image?: string;
  role?: string;
}
