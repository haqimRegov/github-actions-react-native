declare interface IGetOrderSummaryRequest {
  orderNumber: string;
}

type IGetOrderSummaryResult = IDashboardOrderSummary;

declare type IGetOrderSummaryResponse = IQueryResponse<IGetOrderSummaryResult> | undefined;

declare interface IGetOrderSummaryQuery {
  getOrderSummary: IGetOrderSummaryResponse;
}
