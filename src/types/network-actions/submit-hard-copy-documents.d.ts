declare interface ISubmitHardCopyDocument {
  title: string;
  file: FileBase64;
}

declare interface ISubmitHardCopyDocuments {
  name: string;
  docs: ISubmitHardCopyDocument[];
}

declare interface ISubmitHardCopyDocumentsRequest {
  account?: IHardCopyAccount;
  branchId: string;
  orderNumber: string;
  hardcopy: ISubmitHardCopyDocuments[];
}

declare interface ISubmitHardCopyDocumentsResult {
  status: boolean;
  message: string;
  txRef: string;
}

declare type ISubmitHardCopyDocumentsResponse = IQueryResponse<ISubmitHardCopyDocumentsResult> | undefined;

declare interface ISubmitHardCopyDocumentsQuery {
  submitHardcopyDocumentsV2: ISubmitHardCopyDocumentsResponse;
}
