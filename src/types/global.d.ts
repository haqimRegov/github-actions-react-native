declare interface IConfig {
  accessKeyId: string;
  identityId: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare interface IAgentProfile {
  agentCode?: string;
  branch?: string;
  email: string;
  id: string;
  image?: string;
  licenseCode: string;
  licenseType: string[];
  name?: string;
  rank?: string;
  role?: string;
}
