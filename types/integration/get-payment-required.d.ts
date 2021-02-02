declare interface IGetPaymentRequiredRequest {
  orderNumber: string;
}

declare interface IGetPaymentRequiredResult {
  allowedRecurringType: string[];
  createdOn: string;
  funds: IOrderInvestment[];
  epfAccountNumber: string;
  orderNumber: string;
  paymentType: string;
  paymentCount: string;
  status: string;
  surplusBalance: string;
  totalInvestment: IOrderTotalAmount[];
  totalPaidAmount: IOrderTotalAmount[];
}
declare type IGetPaymentRequiredResponse = IQueryResponse<IGetPaymentRequiredResult> | undefined;

declare interface IGetPaymentRequiredQuery {
  listPaymentRequired: IGetPaymentRequiredResponse;
}
