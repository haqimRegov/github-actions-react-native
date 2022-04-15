declare interface ISubmitSoftCopyDocument {
  title: string;
  file: FileBase64;
}

declare interface ISubmitSoftCopyDocuments {
  name: string;
  docs: ISubmitSoftCopyDocument[];
}

declare interface ISubmitSoftCopyDocumentsRequest {
  orderNumber: string;
  principal: ISubmitSoftCopyDocuments[];
  joint?: ISubmitSoftCopyDocuments[];
}

declare interface ISubmitSoftCopyDocumentsResult {
  status: boolean;
  message: string;
  txRef: string;
}

declare type ISubmitSoftCopyDocumentsResponse = IQueryResponse<ISubmitSoftCopyDocumentsResult> | undefined;

declare interface ISubmitSoftCopyDocumentsQuery {
  submitSoftcopyDocumentsV2: ISubmitSoftCopyDocumentsResponse;
}
