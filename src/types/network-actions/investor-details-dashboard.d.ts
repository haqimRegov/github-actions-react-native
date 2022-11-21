declare interface IInvestorDetailsDashboardRequest {
  idNumber: string;
  page: number;
  sort: IInvestorAccountsSort[];
  tab: "allAccounts";
}

declare interface IInvestorDetailsDashboardResult extends IInvestor {
  page: number;
  pages: number;
}

declare type IInvestorDetailsDashboardResponse = IQueryResponse<IInvestorDetailsDashboardResult> | undefined;

declare interface IInvestorDetailsDashboardQuery {
  investorDetailsDashboard: IInvestorDetailsDashboardResponse;
}
