declare interface IGetReceiptSummaryListRequest {
  clientId: string;
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
  getReceiptSummaryList: IGetReceiptSummaryListResponse;
}
