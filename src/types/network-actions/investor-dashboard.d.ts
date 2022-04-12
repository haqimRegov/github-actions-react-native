declare interface IInvestorDashboardFilter {
  column: "riskTolerance" | "timestamp";
  value: string;
}

declare interface IInvestorDashboardRequest {
  tab: "all";
  page: number;
  search: string;
  filter: IInvestorDashboardFilter[];
  sort: IInvestorsSort[];
}

declare interface IInvestorDashboardResult {
  investors: IInvestorData[];
  totalCount: number;
  page: number;
  pages: number;
}

declare type IInvestorDashboardResponse = IQueryResponse<IInvestorDashboardResult> | undefined;

declare interface IInvestorDashboardQuery {
  investorDashboard: IInvestorDashboardResponse;
}
