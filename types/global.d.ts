declare interface IConfig {
  accessKeyId: string;
  identityId: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare interface IAgentProfile {
  id: string;
  email: string;
  licenseCode: string;
  licenseType: string[];
  agentCode?: string;
  branch?: string;
  name?: string;
  image?: string;
  role?: string;
}
