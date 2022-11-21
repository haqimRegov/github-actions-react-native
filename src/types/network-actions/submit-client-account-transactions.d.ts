declare interface ISubmitClientAccountTransactionsRequest {
  initId: string;
  accountNo: string;
  investments: ISubmitInvestment[];
}

type ISubmitClientAccountTransactionsResult = IInvestmentSummary;

declare interface ISubmitClientAccountTransactionsMutation {
  submitClientAccountTransactions: ISubmitClientAccountResponse;
}

declare type ISubmitClientAccountTransactionsResponse = IMutationResponse<ISubmitClientAccountTransactionsResult> | undefined;
