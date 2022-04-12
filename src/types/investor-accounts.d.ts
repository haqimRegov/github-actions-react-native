declare type InvestorAccountsTabType = "all";

declare interface IInvestor {
  investorDetails: IInvestorAccountsData[];
  name: string;
  mobileNo: string;
  mobileNoLastUpdated: string;
  email: string;
  emailLastUpdated: string;
  totalCount: number;
}

declare interface IInvestorAccountsData {
  name: string;
  riskTolerance: string;
  accountNo: string;
  jointName: string;
  accountOpeningDate: string;
}

declare interface IInvestorAccountsSort {
  column: InvestorAccountsSortColumnType;
  value: TransactionsSortValueType;
}

declare type InvestorAccountsSortColumnType = "name" | "riskTolerance" | "accountNo" | "jointName" | "accountOpeningDate";
