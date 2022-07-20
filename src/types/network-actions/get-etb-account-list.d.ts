declare interface IEtbAccountListRequest {
  initId: string;
  principal: {
    clientId: string;
  };
  investments: ISubmitInvestment[];
  isEtb: boolean;
}

declare interface IEtbAccountDescription {
  accountNumber: string;
  description: string;
}
declare interface IEtbAccountListResult {
  etbAccountList: IEtbAccountDescription[];
}

declare type IEtbAccountListResponse = IQueryResponse<IEtbAccountListResult> | undefined;

declare interface IEtbAccountListQuery {
  etbAccountList: IEtbCheckResponse;
}
