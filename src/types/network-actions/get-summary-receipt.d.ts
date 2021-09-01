declare interface ISummaryReceiptRequest {
  all: boolean;
  orders: string[];
}

declare interface ISummaryReceiptResult {
  message: string;
  pdf: FileBase64[];
  status: string;
}

declare interface ISummaryReceiptMutation {
  summaryReceipt: ISummaryReceiptResponse;
}

declare type ISummaryReceiptResponse = IMutationResponse<ISummaryReceiptResult> | undefined;
