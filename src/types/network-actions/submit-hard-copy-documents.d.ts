declare interface ISubmitHardCopyDocument {
  title: string;
  file: FileBase64;
}

declare interface ISubmitHardCopyDocuments {
  name: string;
  docs: ISubmitHardCopyDocument[];
}

declare interface ISubmitHardCopyResult extends ISubmissionSummaryResponse {
  orderNumber: string;
  status: string;
  remarks: string[];
  txRef: string;
}

declare interface ISubmitHardCopyDocumentsRequest {
  account?: IHardCopyAccount;
  branchId: string;
  isConfirmed: boolean;
  orderNumber: string;
  hardcopy: ISubmitHardCopyDocuments[];
}

declare interface ISubmitHardCopyDocumentsResult {
  orders: ISubmitHardCopyResult[];
  message: string;
}

declare type ISubmitHardCopyDocumentsResponse = IQueryResponse<ISubmitHardCopyDocumentsResult> | undefined;

declare interface ISubmitHardCopyDocumentsQuery {
  submitHardcopyDocumentsV2: ISubmitHardCopyDocumentsResponse;
}
