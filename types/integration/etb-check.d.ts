declare interface IEtbCheckRequest {
  agentId: string;
  principalHolder: IClientRegisterInfo;
}

declare interface IEtbCheckResult {
  highRisk: boolean;
  message: string;
  status: string;
  accounts: {
    accountNumber: string;
    date: string;
    accountType: string;
    name: string;
  };
}

declare type IEtbCheckResponse = IQueryResponse<IEtbCheckResult> | undefined;

declare interface IEtbCheckQuery {
  etbCheck: IEtbCheckResponse;
}
