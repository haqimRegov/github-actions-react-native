declare type IEtbCheckRequest = IClientRegisterInfo;

declare interface IAccountList {
  accountNo: string;
  accountType?: TypeAccountChoices;
  ampFund?: IProduct;
  fundType: string;
  isJoint: boolean;
  isRecurring: boolean;
  isSyariah: boolean;
  jointName: string | null;
  name: string;
  paymentMethod: string;
  riskTolerance: string;
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
