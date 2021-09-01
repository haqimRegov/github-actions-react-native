declare type TypePaymentType = "Cash" | "EPF" | "Recurring";

declare interface IFloatingAmount {
  amount: number;
  currency: TypeCurrency;
}

declare interface IPaymentOrderState {
  investments: IOrderInvestment[];
  paymentType: TypePaymentType;
  orderDate: string;
  orderNumber: string;
  epfAccountNumber?: string;
  orderTotalAmount: IOrderAmount[];
  payments: IPaymentState[];

  allowedRecurringType?: string[];
  completed?: boolean;
  floatingAmount?: IFloatingAmount[];
  totalPaidAmount?: IOrderAmount[];
  paymentCount?: number;
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
  referenceNumber?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  combinedBankAccountName?: string;
  recurringType?: string;
  recurringBank?: string;
  frequency?: string;
  bankName?: string;
}

declare interface IPaymentState extends IPayment {
  saved?: boolean;
}
