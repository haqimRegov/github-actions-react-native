declare interface IGeneratePdfRequest {
  clientId: string;
  initId: string;
  isEtb: boolean;
  isForceUpdate: boolean;
  orderNo: string;
}

declare interface IGeneratePdfResult {
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
declare type IGeneratePdfResponse = IMutationResponse<IGeneratePdfResult> | undefined;

declare interface IGeneratePdfMutation {
  generatePdfV2: IGeneratePdfResponse;
}
