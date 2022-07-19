declare type IEtbCheckRequest = IClientRegisterInfo;

declare interface IAccountList {
  accountNo: string;
  accountType?: TypeAccountChoices;
  fundType: string;
  isJoint: boolean;
  isRecurring: boolean;
  jointName: string | null;
  name: string;
  paymentMethod: string;
  tags?: string[];
}
declare interface IEtbCheckResult {
  accounts?: IAccountList[] | null;
  clientId?: string;
  emailAddress: string;
  forceUpdate: boolean;
  highRisk: boolean;
  message: string;
  status: string;
}

declare type IEtbCheckResponse = IQueryResponse<IEtbCheckResult> | undefined;

declare interface IEtbCheckQuery {
  etbCheckV2: IEtbCheckResponse;
}
