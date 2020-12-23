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
  fundingOption: string;
  accountType: string;
  distributionInstruction: string;
  fundCode: string;
  fundClass: string | null;
  fundCurrency: string;
  fundIssuer: string;
  fundName: string;
  fundType: string;
  investmentAmount: string;
  fundProcessingGroup: string;
  isEpf: boolean;
  isSyariah: boolean;
  salesCharge: string;
  isScheduled: boolean;
  scheduledInvestmentAmount: string | null;
  scheduledSalesCharge: string | null;
  isFea: boolean;
}

declare interface IOrder {
  orderNumber: string;
  orderDate: string;
  orderTotalAmount: IOrderAmount[];
  investments: IOrderInvestment[];
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
