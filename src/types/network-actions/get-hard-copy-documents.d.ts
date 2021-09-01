declare interface IGetHardCopyDocumentsRequest {
  orderNumber: string;
}

declare type IHardCopyFile = DocumentFileBase64 | undefined;

declare interface IHardCopyDocument {
  docs: IHardCopyFile[];
  name: string;
}

declare interface IHardCopyBranchList {
  branchId: number;
  name: string;
}

declare interface IGetHardCopyDocumentsResult {
  documents: IHardCopyDocument[];
  branchList: IHardCopyBranchList[];
}

declare type IGetHardCopyDocumentsResponse = IQueryResponse<IGetHardCopyDocumentsResult> | undefined;

declare interface IGetHardCopyDocumentsQuery {
  listHardcopyDocuments: IGetHardCopyDocumentsResponse;
}
