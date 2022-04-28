declare interface IGetHardCopyDocumentsRequest {
  orderNumber: string;
}

declare interface IHardCopyFile extends DocumentFileBase64 {
  isEditable: boolean;
}

declare interface IHardCopyAccount {
  joint?: IHardCopyDocument[];
  principal: IHardCopyDocument[];
}

declare interface IHardCopyDocument {
  docs: IHardCopyFile[];
  name: string;
}

declare interface IHardCopyBranchList {
  branchId: number;
  name: string;
}

declare interface IGetHardCopyDocumentsResult {
  account: IHardCopyAccount;
  branchList: IHardCopyBranchList[];
  documents: IHardCopyDocument[];
}

declare type IGetHardCopyDocumentsResponse = IQueryResponse<IGetHardCopyDocumentsResult> | undefined;

declare interface IGetHardCopyDocumentsQuery {
  listHardcopyDocumentsV2: IGetHardCopyDocumentsResponse;
}
