declare interface IBankSummaryRequest {
  accountNo: string;
  initId: string;
  clientId: string;
  banks: IBankSummaryState;
}

declare interface IBankSummaryResult {
  initId: string;
  message: string;
  banks: IBankSummaryState;
}

declare type IBankSummaryResponse = IQueryResponse<IBankSummaryResult> | undefined;

declare interface IBankSummaryQuery {
  addBankSummaryInApplication: IBankSummaryResponse;
}
