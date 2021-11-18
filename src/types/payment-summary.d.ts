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
  amount?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankName?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
  combinedBankAccountName?: string;
  currency?: TypeCurrency | "";
  epfAccountNumber?: string;
  epfReferenceNumber?: string;
  frequency?: string;
  kibBankAccountName?: string;
  kibBankAccountNumber?: string;
  kibBankName?: string;
  paymentMethod?: TypePaymentMethod;
  proof?: FileBase64;
  recurringBank?: string;
  recurringType?: string;
  referenceNumber?: string;
  remark?: string;
  transactionDate?: Date;
  transactionTime?: Date;
}

declare interface IPaymentState extends IPayment {
  saved?: boolean;
}
