declare interface IInvestorDetailsDashboardRequest {
  idNumber: string;
  page: number;
  sort: IInvestorAccountsSort[];
  tab: "allAccounts";
}

declare interface IInvestorDetailsDashboardResult {
  investorDetails: IInvestorAccountsData[];
  totalCount: number;
  page: number;
  pages: number;
  name: string;
  email: string;
  mobileNo: string;
}

declare type IInvestorDetailsDashboardResponse = IQueryResponse<IInvestorDetailsDashboardResult> | undefined;

declare interface IInvestorDetailsDashboardQuery {
  investorDetailsDashboard: IInvestorDetailsDashboardResponse;
}
