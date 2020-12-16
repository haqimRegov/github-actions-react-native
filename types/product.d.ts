declare interface IFund {
  annualManagementFee?: number;
  documents?: IFundDocument[];
  fundCategory: string;
  fundCurrency: string;
  fundObjective?: string;
  fundType: string;
  isEpf: boolean;
  isScheduled: boolean;
  isShariah: boolean;
  issuer: string;
  latestFundSize?: number;
  name: string;
  newSalesAmount: {
    cash?: {
      maximum?: number;
      minimum?: number;
    };
    epf?: {
      maximum?: number;
      minimum?: number;
    };
  };
  performanceOverview: string;
  performance?: {
    benchmark?: {
      oneMonth?: number[];
      sixMonths?: number[];
      oneYear?: number[];
      threeYears?: number[];
      fiveYears?: number[];
      tenYears?: number[];
    };
    details?: string;
    nav?: {
      oneMonth?: number[];
      sixMonths?: number[];
      oneYear?: number[];
      threeYears?: number[];
      fiveYears?: number[];
      tenYears?: number[];
    };
  };
  riskCategory: string;
  salesCharge: {
    cash?: {
      maximum?: number;
      minimum?: number;
    };
    epf?: {
      maximum?: number;
      minimum?: number;
    };
  };
  topUpAmount?: {
    cash?: {
      minimum?: number;
      maximum?: number;
    };
    epf?: {
      maximum?: number;
      minimum?: number;
    };
  };
}

declare interface IFundSales extends IFundInvestment {
  fund: IFund;
}

declare interface IProductSales {
  fundDetails: IProduct;
  investment: IProductInvestment;
  masterClassList: IProductClasses;
}

declare interface IProductInvestment {
  amountError?: string;
  fundClass?: string;
  fundCurrency?: string;
  fundPaymentMethod: "Cash" | "EPF";
  investmentAmount: string;
  investmentSalesCharge: string;
  scheduledAmountError?: string;
  scheduledInvestment: boolean;
  scheduledInvestmentAmount?: string;
  scheduledSalesCharge?: string;
}

declare interface IFundInvestment {
  fundPaymentMethod: "Cash" | "EPF";
  investmentAmount: string;
  salesCharge: number;
  scheduledInvestment: boolean;
  scheduledInvestmentAmount?: string;
  scheduledSalesCharge?: number;
}

declare interface IFundDocument {
  link: string;
  name: string;
}
