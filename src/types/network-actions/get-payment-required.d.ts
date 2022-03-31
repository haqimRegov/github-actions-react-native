declare interface IGetPaymentRequiredRequest {
  orderNumber: string;
}

declare interface IGetPaymentRequiredResult {
  allowedRecurringType: string[];
  createdOn: string;
  ctaDetails: TypeCTADetails[];
  epfAccountNumber: string;
  funds: IOrderInvestment[];
  isLastOrder: boolean;
  orderNumber: string;
  payment: IPaymentInfo[];
  paymentCount: number;
  paymentType: TypePaymentType;
  recurringDetails: IRecurringDetails;
  status: string;
  surplusBalance: IPaymentInfo[];
  totalInvestment: IOrderTotalAmount[];
  totalPaidAmount: IOrderAmount[];
}
declare type IGetPaymentRequiredResponse = IQueryResponse<IGetPaymentRequiredResult> | undefined;

declare interface IGetPaymentRequiredQuery {
  listPaymentRequired: IGetPaymentRequiredResponse;
}
