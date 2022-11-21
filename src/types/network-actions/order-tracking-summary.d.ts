declare interface IOrderTrackingSummaryRequest {
  orderNo: string;
}

declare interface IOrderTrackingSummaryResult {
  message: string;
  status: boolean;
  pdf: IOrderTrackingSummaryPDF;
}

declare interface IOrderTrackingSummaryPDF {
  base64: string;
  date: Date;
  name: string;
  type: string;
  url: string;
  urlPageCount: number;
}

declare type IOrderTrackingSummaryResponse = IQueryResponse<IOrderTrackingSummaryResult> | undefined;

declare interface IOrderTrackingSummaryQuery {
  generateOrderTrackingSummary: IOrderTrackingSummaryResponse;
}
