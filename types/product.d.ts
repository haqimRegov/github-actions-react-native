declare interface IProduct {
  epf: string;
  graph: string;
  issuer: string;
  name: string;
  performance: string;
  risk: string;
  shariah: string;
  type: string;
}

declare interface IFund {
  annualManagementFee?: string;
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
      maximum?: string;
      minimum?: string;
    };
    epf?: {
      maximum?: string;
      minimum?: string;
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

declare interface IProductConfirmation extends IProduct {
  accountType: string;
  channel: string;
  currency: string;
  fundMethod: string;
  fundType: string;
  investmentAmount: string;
  salesCharge: string;
  scheduledPayment: string;
}
