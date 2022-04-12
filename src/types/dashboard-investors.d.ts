declare type InvestorsPageType = "InvestorDashboard" | "AccountsList";
declare type InvestorsTabType = "all" | "accounts";

declare interface IInvestorData {
  email: string;
  idNumber: string;
  mobileNo: string;
  name: string;
  riskTolerance: string;
}
declare interface IInvestorsDashboard {
  all: IInvestorsTab;
  allCount: number;
}

declare interface IInvestorsFilter {
  endDate?: Date;
  riskProfile?: string;
  startDate?: Date;
}

declare interface IInvestorsSort {
  column: InvestorsSortColumnType;
  value: TransactionsSortValueType;
}

declare interface IInvestorsTab {
  filter: IInvestorsFilter;
  investors: IInvestorData[];
  page: number;
  pages: number;
  sort: IInvestorsSort[];
}

declare interface IInvestorsFilterRequest {
  riskTolerance?: "Low" | "Medium" | "High";
  timeStamp: string;
}

declare type InvestorsSortColumnType = "" | "name" | "riskTolerance" | "mobileNo" | "email";
