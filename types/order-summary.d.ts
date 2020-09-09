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
  salesCharge: number;

  fundCode?: string;
  scheduledPayment?: boolean;
}

declare interface IOrderSummary {
  date: Date;
  funds: IFundOrderSummary[];
  orderNumber: string;
  totalAmount: IOrderTotalAmount[];
}

declare interface IOrderTotalAmount {
  amount: string;
  currency: TypeCurrency;
}
