declare interface IClientProfileRequest {
  caseId: string;
}

declare interface IClientProfileStructure {
  createdAt: string;
  incomeDistribution: string;
  signatory: string;
  accountType: TypeAccountChoices;
  client: IOrderSummaryProfile;
}

declare interface IClientProfileResult {
  profile: IClientProfileStructure;
}

declare type IClientProfileResponse = IQueryResponse<IClientProfileResult> | undefined;

declare interface IClientProfileQuery {
  clientProfile: IClientProfileResponse;
}
