declare interface IGetReceiptSummaryListRequest {
  clientId: string;
  initId: string;
  isForceUpdate: boolean;
}

declare interface IGetReceiptSummaryListResult {
  message: string;
  status: string;
  orders: [
    {
      name: string;
      orderNumber: string;
      isScheduled: string;
      isEpf: string;
      fundType: string;
      fundCount: string;
      orderTotalAmount: IOrderTotalAmount[];
    },
  ];
}
declare type IGetReceiptSummaryListResponse = IMutationResponse<IGetReceiptSummaryListResult> | undefined;

declare interface IGetReceiptSummaryListMutation {
  receiptSummary: IGetReceiptSummaryListResponse;
}
