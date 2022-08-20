declare type IEtbCheckRequest = IClientRegisterInfo;

declare interface IAccountList {
  accountNo: string;
  accountType?: TypeAccountChoices;
  ampDetails?: IProduct;
  fundType: string;
  isJoint: boolean;
  isRecurring: boolean;
  isSyariah: boolean;
  jointName: string | null;
  jointDateOfBirth: string;
  name: string;
  paymentMethod: string;
  riskTolerance: string;
  epfDetails: {
    epfMemberNumber: string;
    epfAccountType: string;
  };
}
declare interface IEtbCheckResult {
  accounts?: IAccountList[] | null;
  address?: IAddressState;
  clientId?: string;
  declarationRequired: string[];
  emailAddress: string;
  forceUpdate: boolean;
  highRisk: boolean;
  initId: string;
  message: string;
  status: string;
}

declare type IEtbCheckResponse = IQueryResponse<IEtbCheckResult> | undefined;

declare interface IEtbCheckQuery {
  etbCheckV2: IEtbCheckResponse;
}
