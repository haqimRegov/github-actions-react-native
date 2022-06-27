declare type IEtbCheckRequest = IClientRegisterInfo;

declare interface IEtbCheckResult {
  highRisk: boolean;
  message: string;
  status: string;
  forceUpdate: boolean;
}

declare type IEtbCheckResponse = IQueryResponse<IEtbCheckResult> | undefined;

declare interface IEtbCheckQuery {
  etbCheckV2: IEtbCheckResponse;
}
