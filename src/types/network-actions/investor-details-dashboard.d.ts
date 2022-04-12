declare interface IInvestorDetailsDashboardRequest {
  idNumber: string;
  page: number;
  sort: IInvestorAccountsSort[];
  tab: "allAccounts";
}

declare interface IInvestorDetailsDashboardResult {
  email: string;
  investorDetails: IInvestorAccountsData[];
  mobileNo: string;
  name: string;
  page: number;
  pages: number;
  totalCount: number;
}

declare type IInvestorDetailsDashboardResponse = IQueryResponse<IInvestorDetailsDashboardResult> | undefined;

declare interface IInvestorDetailsDashboardQuery {
  investorDetailsDashboard: IInvestorDetailsDashboardResponse;
}
