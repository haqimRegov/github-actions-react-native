declare type TypePaymentType = "Cash" | "EPF" | "Recurring";

declare interface IPaymentOrderState {
  investments: IOrderInvestment[];
  paymentType: TypePaymentType;
  orderDate: string;
  orderNumber: string;
  orderTotalAmount: IOrderAmount[];
  payments: IPaymentState[];

  completed?: boolean;
  floatingAmount?: IOrderAmount[];
}

declare interface IPurchaseSummary {
  grandTotal: IOrderAmount[];
  orders: IPaymentOrderState[];
}

declare interface IPurchaseSummaryState {
  grandTotal: IOrderAmount[];
  orders: IPaymentOrderState[];
}

declare interface IPayment {
  currency?: TypeCurrency | "";
  paymentMethod?: TypePaymentMethod;
  amount?: string;
  kibBankAccountNumber?: string;
  kibBankAccountName?: string;
  kibBankName?: string;
  transactionDate?: Date;
  transactionTime?: Date;
  proof?: FileBase64;
  remark?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
  epfAccountNumber?: string;
  epfReferenceNumber?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  recurringType?: string;
  recurringBank?: string;
  frequency?: string;
  bankName?: string;
}

declare interface IPaymentState extends IPayment {
  expanded?: boolean;
  show?: boolean;
  saved?: boolean;
}
