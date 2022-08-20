declare interface ISubmitPdfTransactionsDocument {
  pdf: FileBase64;
  orderNumber: string;
  adviserSignature: FileBase64;
  clientSignature?: FileBase64;
  jointSignature?: FileBase64;
}

declare interface ISubmitPdfTransactionsRequest {
  clientId: string;
  documents: ISubmitPdfTransactionsDocument[];
  initId: string;
  isConfirmed: boolean;
  isEtb: boolean;
  isForceUpdate: boolean;
}

declare interface ISubmitPdfTransactionsResult {
  message: string;
  status: string;
}

declare type ISubmitPdfTransactionsResponse = IMutationResponse<ISubmitPdfTransactionsResult> | undefined;

declare interface ISubmitPdfTransactionsMutation {
  submitPdfTransactions: ISubmitPdfTransactionsResponse;
}
