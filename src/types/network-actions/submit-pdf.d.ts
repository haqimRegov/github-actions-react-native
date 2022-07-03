declare interface ISubmitPdfDocument {
  pdf: FileBase64;
  orderNumber: string;
  adviserSignature: FileBase64;
  clientSignature: FileBase64;
  jointSignature?: FileBase64;
}

declare interface ISubmitPdfRequest {
  clientId: string;
  documents: ISubmitPdfDocument[];
  initId: string;
  isConfirmed: boolean;
  isForceUpdate: boolean;
}

declare interface ISubmitPdfRemarks {
  title: string;
  remarks: string[];
}
declare interface ISubmitPdfResult extends ISubmissionSummaryOrder {
  message: string;
}

declare type ISubmitPdfResponse = IMutationResponse<ISubmitPdfResult> | undefined;

declare interface ISubmitPdfMutation {
  submitPdfV2: ISubmitPdfResponse;
}
