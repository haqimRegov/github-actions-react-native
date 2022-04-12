declare interface IInvestorDashboardFilter {
  column: "riskTolerance" | "timestamp";
  value: string;
}

declare interface IInvestorDashboardRequest {
  filter: IInvestorDashboardFilter[];
  page: number;
  search: string;
  sort: IInvestorsSort[];
  tab: "all";
}

declare interface IInvestorDashboardResult {
  investors: IInvestorData[];
  page: number;
  pages: number;
  totalCount: number;
}

declare type IInvestorDashboardResponse = IQueryResponse<IInvestorDashboardResult> | undefined;

declare interface IInvestorDashboardQuery {
  investorDashboard: IInvestorDashboardResponse;
}
