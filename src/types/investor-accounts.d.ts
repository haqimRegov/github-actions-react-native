declare type InvestorAccountsTabType = "all";

declare interface IInvestor {
  accountHolder: TypeAccountHolder;
  address: IAddressState;
  clientId: string;
  dateOfBirth: string;
  email: string;
  emailLastUpdated: string;
  idNumber: string;
  idType: TypeClientID;
  initId: string;
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
  idNumber: string;
  jointIdNumber: string;
  initId: string;
  jointName: string;
  name: string;
  riskTolerance: string;
}

declare interface ICurrentAccount {
  accountNumber?: string;
  clientId: string;
}

declare interface IInvestorAccountsSort {
  column: InvestorAccountsSortColumnType;
  value: TransactionsSortValueType;
}

declare type InvestorAccountsSortColumnType = "name" | "riskTolerance" | "accountNo" | "jointName" | "accountOpeningDate";
