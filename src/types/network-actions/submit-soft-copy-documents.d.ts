declare interface ISubmitSoftCopyDocument {
  title: string;
  file: FileBase64;
}

declare interface ISubmitSoftCopyDocuments {
  name: string;
  docs: ISubmitSoftCopyDocument[];
}

declare interface ISubmitSoftCopyDocumentsRequest {
  isConfirmed: boolean;
  joint?: ISubmitSoftCopyDocuments[];
  orderNumber: string;
  principal: ISubmitSoftCopyDocuments[];
}

declare interface ISubmitSoftCopyDocumentsResult {
  orders: ISubmitHardCopyResult[];
  message: string;
}

declare type ISubmitSoftCopyDocumentsResponse = IQueryResponse<ISubmitSoftCopyDocumentsResult> | undefined;

declare interface ISubmitSoftCopyDocumentsQuery {
  submitSoftcopyDocumentsV2: ISubmitSoftCopyDocumentsResponse;
}
