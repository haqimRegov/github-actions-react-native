declare interface IProductSales {
  allowEpf?: boolean;
  fundDetails: IProduct;
  investment: IProductInvestment;
  isNewFund?: boolean;
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
  investmentSalesChargeError?: string;
  scheduledAmountError?: string;
  scheduledInvestment: boolean;
  isTopup?: boolean;
  scheduledInvestmentAmount?: string;
  scheduledSalesCharge?: string;
  scheduledSalesChargeError?: string;
  prsType?: TypePrs;
}
