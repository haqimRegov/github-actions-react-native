declare interface IGetOrderSummaryRequest {
  orderNumber: string;
}

declare interface IGetOrderSummaryResult extends IDashboardOrderSummary {}

declare type IGetOrderSummaryResponse = IQueryResponse<IGetOrderSummaryResult> | undefined;

declare interface IGetOrderSummaryQuery {
  getOrderSummary: IGetOrderSummaryResponse;
}
