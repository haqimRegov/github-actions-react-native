declare type IEtbCheckRequest = IClientRegisterInfo;

declare interface IAccountList {
  name: string;
  jointName: string | null;
  accountNo: string;
  isJoint: boolean;
}
declare interface IEtbCheckResult {
  accountList?: IAccountList[] | null;
  forceUpdate: boolean;
  highRisk: boolean;
  message: string;
  status: string;
}

declare type IEtbCheckResponse = IQueryResponse<IEtbCheckResult> | undefined;

declare interface IEtbCheckQuery {
  etbCheckV2: IEtbCheckResponse;
}
