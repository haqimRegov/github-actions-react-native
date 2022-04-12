declare type InvestorAccountsTabType = "all";

declare interface IInvestor {
  email: string;
  emailLastUpdated: string;
  investorDetails: IInvestorAccountsData[];
  mobileNo: string;
  mobileNoLastUpdated: string;
  name: string;
  totalCount: number;
}

declare interface IInvestorAccountsData {
  accountNo: string;
  accountOpeningDate: string;
  jointName: string;
  name: string;
  riskTolerance: string;
}

declare interface IInvestorAccountsSort {
  column: InvestorAccountsSortColumnType;
  value: TransactionsSortValueType;
}

declare type InvestorAccountsSortColumnType = "name" | "riskTolerance" | "accountNo" | "jointName" | "accountOpeningDate";
