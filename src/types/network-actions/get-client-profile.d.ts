declare interface IClientProfileRequest {
  caseId: string;
}

declare interface IClientProfileStructure {
  accountType: TypeAccountChoices;
  client: IOrderSummaryProfile;
  createdAt: string;
  incomeDistribution: string;
  signatory: string;
}

declare interface IClientProfileResult {
  profile: IClientProfileStructure;
}

declare type IClientProfileResponse = IQueryResponse<IClientProfileResult> | undefined;

declare interface IClientProfileQuery {
  clientProfile: IClientProfileResponse;
}
