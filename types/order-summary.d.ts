declare interface IFundOrderSummary {
  fundingOption: string;
  accountType: string;
  distributionChannel: string;
  fundCurrency: string;
  fundIssuer: string;
  fundName: string;
  fundType: string;
  investmentAmount: string;
  isEpf: boolean;
  isShariah: boolean;
  salesCharge: string;

  fundCode?: string;
  scheduledPayment?: boolean;
}

declare interface IOrderSummary {
  date: Date;
  funds: IFundOrderSummary[];
  orderNumber: string;
  totalAmount: IOrderTotalAmount[];
}

declare interface IOrderInvestment {
  distributionInstruction: string;
  fundClass: string | null;
  fundCode: string;
  fundCurrency: string;
  fundId?: string;
  fundingOption: string;
  fundIssuer: string;
  fundName: string;
  fundType: string;
  investmentAmount: string;
  isEpf: boolean;
  isFea: boolean;
  isScheduled: boolean;
  isSyariah: boolean;
  salesCharge: string;
  scheduledInvestmentAmount: string | null;
  scheduledSalesCharge: string | null;
}

declare interface IOrder {
  investments: IOrderInvestment[];
  orderDate: string;
  orderNumber: string;
  allowedRecurringType?: string[];
  orderTotalAmount: IOrderAmount[];
  paymentType: TypePaymentType;
}

declare interface IInvestmentSummary {
  grandTotal: IOrderAmount[];
  orders: IOrder[];
}

declare interface IOrderTotalAmount {
  amount: string;
  currency: TypeCurrency;
}

declare interface IOrderAmount {
  amount: string;
  currency: TypeCurrency;
}
