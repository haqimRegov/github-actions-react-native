declare type InvestorAccountsTabType = "all";

declare interface IInvestor {
  email: string;
  emailLastUpdated: string;
  investorDetails: IInvestorAccountsData[];
  isForceUpdate?: boolean;
  mobileNo: string;
  mobileNoLastUpdated: string;
  name: string;
  totalCount: number;
}

declare interface IInvestorAccountsData {
  accountHolder: TypeAccountHolder;
  accountNo: string;
  accountOpeningDate: string;
  address: IAddressState;
  clientId: string;
  dateOfBirth: string;
  initId: number;
  jointName: string;
  name: string;
  riskTolerance: string;
}

declare interface IInvestorAccountsSort {
  column: InvestorAccountsSortColumnType;
  value: TransactionsSortValueType;
}

declare type InvestorAccountsSortColumnType = "name" | "riskTolerance" | "accountNo" | "jointName" | "accountOpeningDate";
