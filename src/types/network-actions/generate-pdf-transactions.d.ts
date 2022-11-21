declare interface IGeneratePdfTransactionsRequest {
  accountNo: string;
  clientId: string;
  initId: string;
  orderNo: string;
}

declare interface IGeneratePdfTransactionsResult {
  message: string;
  status: string;
  pdf: {
    base64: string;
    name: string;
    date: string;
    url: string;
    urlPageCount: string;
    type: string;
  };
}

declare type IGeneratePdfTransactionsResponse = IMutationResponse<IGeneratePdfTransactionsResult> | undefined;

declare interface IGeneratePdfTransactionsMutation {
  generatePdfTransactions: IGeneratePdfTransactionsResponse;
}
