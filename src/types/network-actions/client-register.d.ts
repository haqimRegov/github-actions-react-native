declare interface IClientRegisterInfo {
  country?: string;
  dateOfBirth?: string;
  id?: string;
  idType?: TypeClientID;
  name?: string;
}

declare interface IClientRegisterRequest {
  accountNo?: string;
  accountType: TypeAccountChoices;
  isEtb: boolean;
  isNewFundPurchased: boolean;
  jointHolder?: IClientRegisterInfo;
  principalHolder: IClientRegisterInfo;
}

declare interface IClientRegisterResult {
  initId: string;
  jointHolder?: IClientBasicInfo;
  principalHolder: IClientBasicInfo;
  riskInfo?: IRiskProfile;
}

declare interface IClientRegisterMutation {
  clientRegisterV2: IClientRegisterResponse;
}

declare type IClientRegisterResponse = IMutationResponse<IClientRegisterResult> | undefined;
