declare interface IProductSales {
  allowEpf?: boolean;
  fundDetails: IProduct;
  investment: IProductInvestment;
  masterClassList: IProductClasses;
}

declare interface IProductInvestment {
  amountError?: string;
  fundClass?: string;
  fundCurrency?: string;
  fundId?: string;
  fundPaymentMethod: "Cash" | "EPF";
  investmentAmount: string;
  investmentSalesCharge: string;
  scheduledAmountError?: string;
  scheduledInvestment: boolean;
  scheduledInvestmentAmount?: string;
  scheduledSalesCharge?: string;
  prsType?: TypePrs;
}
