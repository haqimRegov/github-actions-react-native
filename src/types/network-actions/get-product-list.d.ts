declare interface IProductFilterRequest {
  accountType?: string;
  age?: string;
  fundCurrency?: string[];
  fundType?: string;
  isConventional?: string;
  isEpf?: string;
  issuingHouse?: string[];
  isSyariah?: string;
  netWorth?: string;
  riskCategory?: string[];
  recommendedRisk?: string;
}
declare interface IProductListRequest extends IProductFilterRequest {
  tab: string;
  sort: {
    column: string;
    value: string;
  }[];
  showBy: string;
  search: string;
  page: string;
}

declare interface IProductChart {
  oneMonth: string;
  sixMonths: string;
  oneYear: string;
  threeYears: string;
  fiveYears: string;
  tenYears: string;
}

declare interface IProductPerformance {
  nav: IProductChart;
  benchmark: IProductChart;
  details: string;
}

declare type TypePrs = "selfSelect" | "prsDefault";

declare interface IProduct {
  // performanceOverview: IProductPerformance;
  ampCategory: string;
  ampFee: string;
  annualManagementFee: string;
  annualTrusteeFee: string;
  docs: IProductDocument[];
  fundAbbr: string;
  fundCategory: string;
  fundClasses: string[];
  fundCode: string;
  fundCurrencies: string[];
  fundId: string;
  fundName: string;
  fundObjective: string;
  fundType: string;
  isEpf: string;
  isEpfOnly: string;
  isScheduled: string;
  issuingHouse: string;
  isSyariah: string;
  isWholesale: string;
  landingFund: string;
  prsType: TypePrs;
  performance: {
    benchmark: {
      fiveYears: number[];
      oneMonth: number[];
      oneYear: number[];
      sixMonths: number[];
      tenYears: number[];
      threeYears: number[];
    };
    nav: {
      fiveYears: number[];
      oneMonth: number[];
      oneYear: number[];
      sixMonths: number[];
      tenYears: number[];
      threeYears: number[];
    };
  };
  riskCategory: string;
  masterList: IProductMasterList[];
}

declare interface IProductMasterList {
  class: string;
  currency: string;
  fundId: string;
  isEpf: string;
  newSalesAmount: IProductNewSalesAmount;
  salesCharge: IProductSalesCharge;
  topUpAmount: IProductTopUpAmount;
}

// declare interface IProduct {
//   // performanceOverview: IProductPerformance;
//   ampFee: string;
//   annualManagementFee: string;
//   docs: IProductDocument[];
//   fundAbbr: string;
//   fundCategory: string;
//   fundClasses: string[];
//   fundCurrencies: string[];
//   fundId: string;
//   fundName: string;
//   fundObjective: string;
//   fundType: string;
//   isEpf: string;
//   issuingHouse: string;
//   isSyariah: string;
//   isScheduled: string;
//   isWholesale: string;
//   landingFund: string;
//   performance: string;
//   riskCategory: string;
//   masterList: IProductMasterList[];
// }

declare interface IProductTotalCount {
  all: string;
  recommended: string;
}

declare interface IProductDocument {
  name: string;
  url: string;
}

declare interface IProductRange {
  min: string;
  max: string;
}

// declare interface IProductRange {
//   min: string;
//   max: string;
// }

declare interface IProductClasses {
  [key: string]: IProductMasterList[];
}

declare interface IProductNewSalesAmount {
  epf: IProductRange;
  cash: IProductRange;
}

declare interface IProductTopUpAmount {
  epf: IProductRange;
  cash: IProductRange;
}

declare interface IProductSalesCharge {
  epf: IProductRange;
  cash: IProductRange;
}

declare interface IProductListResult {
  filters: IProductAvailableFilter;
  products: IProduct[];
  page: string;
  pages: string;
  totalCount: IProductTotalCount;
}

declare type IProductListResponse = IQueryResponse<IProductListResult> | undefined;

declare interface IProductListQuery {
  productList: IProductListResponse;
}
