declare interface IGetSoftCopyDocumentsRequest {
  orderNumber: string;
}

declare interface ISoftCopyFile extends DocumentFileBase64 {
  isEditable: boolean;
}

declare interface ISoftCopyDocument {
  docs: ISoftCopyFile[];
  name: string;
}

declare interface IGetSoftCopyDocumentsResult {
  joint?: ISoftCopyDocument[];
  principal: ISoftCopyDocument[];
}

declare type IGetSoftCopyDocumentsResponse = IQueryResponse<IGetSoftCopyDocumentsResult> | undefined;

declare interface IGetSoftCopyDocumentsQuery {
  listSoftcopyDocumentsV2: IGetSoftCopyDocumentsResponse;
}
