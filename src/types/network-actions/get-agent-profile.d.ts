declare type IGetAgentProfileRequest = Record<string, unknown>;

declare interface IGetAgentProfileMessage {
  createdOn: string;
  isRead: boolean;
  message: string;
  notificationId: string;
  searchKey: string;
  searchType: string;
  senderName: string;
  source: AvatarType;
  title: string;
  updatedAt: string;
}

declare interface IGetAgentProfileResult {
  address: {
    address: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
  };
  agency: string;
  agentCode: string;
  agentId: string;
  agentName: string;
  bdmEmail: string;
  bdmName: string;
  branchName: string;
  channel: string;
  email: string;
  licenseCode: string;
  mobileNo: string;
  nric: string;
  omniEnabled: string;
  rank: string;
  region: string;
  status: string;
}

declare type IGetAgentProfileResponse = IQueryResponse<IGetAgentProfileResult> | undefined;

declare interface IGetAgentProfileQuery {
  agentProfile: IGetAgentProfileResponse;
}
