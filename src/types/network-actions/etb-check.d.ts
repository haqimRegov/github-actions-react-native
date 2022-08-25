declare type IEtbCheckRequest = IClientRegisterInfo;

declare interface IAccountList {
  accountHolder: TypeAccountHolder;
  accountNo: string;
  accountType?: TypeAccountChoices;
  ampDetails?: IProduct;
  dateOfBirth: string;
  epfDetails: IEpfDetailsState;
  fundType: string;
  idNumber: string;
  idType: string;
  isJoint: boolean;
  isRecurring: boolean;
  isSyariah: boolean;
  jointDateOfBirth: string;
  jointEmail: string;
  jointIdNumber: string;
  jointIdType: string;
  jointName: string | null;
  name: string;
  paymentMethod: string;
  riskTolerance: string;
}
declare interface IEtbCheckResult {
  accountHolder: TypeAccountHolder;
  accounts?: IAccountList[] | null;
  address?: IAddressState;
  clientId?: string;
  dateOfBirth: string;
  declarationRequired: string[];
  emailAddress: string;
  forceUpdate: boolean;
  highRisk: boolean;
  idNumber: string;
  idType: string;
  initId: string;
  message: string;
  status: string;
}

declare type IEtbCheckResponse = IQueryResponse<IEtbCheckResult> | undefined;

declare interface IEtbCheckQuery {
  etbCheckV2: IEtbCheckResponse;
}
