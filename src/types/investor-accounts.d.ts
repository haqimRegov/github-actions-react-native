declare type InvestorAccountsTabType = "all";

declare interface IInvestor {
  accountHolder: TypeAccountHolder;
  address: IAddressState;
  clientId: string;
  dateOfBirth: string;
  declarationRequired: string[];
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
  ampDetails?: IProduct;
  authorisedSignatory: string;
  address: IAddressState;
  clientId: string;
  currency: string[];
  dateOfBirth: string;
  email: string;
  epfDetails?: IEpfDetailsState;
  fundType: string;
  initId: string;
  idNumber: string;
  idType: string;
  isRecurring: boolean;
  isSyariah: boolean;
  jointDateOfBirth: string;
  jointDeclarationRequired: string[] | null;
  jointEmail: string;
  jointId: string | null;
  jointIdNumber: string;
  jointIdType: string;
  jointName: string;
  name: string;
  paymentMethod: string;
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
