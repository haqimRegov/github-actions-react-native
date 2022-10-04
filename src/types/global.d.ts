declare interface IConfig {
  accessKeyId: string;
  identityId: string;
  secretAccessKey: string;
  sessionToken: string;
}

declare type TypeAgentCategory = "external" | "internal";

declare interface IAgentProfile {
  agentCode?: string;
  category?: TypeAgentCategory;
  branch?: string;
  email: string;
  id: string;
  image?: string;
  licenseCode: string;
  licenseType: string[];
  name?: string;
  rank?: string;
  role?: string;
  username?: string;
}
