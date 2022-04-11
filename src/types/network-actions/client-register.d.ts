declare interface IClientRegisterInfo {
  country?: string;
  dateOfBirth?: string;
  id?: string;
  idType?: TypeClientID;
  name?: string;
}

declare interface IClientRegisterRequest {
  accountType: TypeAccountChoices;
  principalHolder: IClientRegisterInfo;
  jointHolder?: IClientRegisterInfo;
}

declare interface IClientRegisterResult {
  initId: number;
  principalHolder: IClientBasicInfo;
  jointHolder?: IClientBasicInfo;
}

declare interface IClientRegisterMutation {
  clientRegisterV2: IClientRegisterResponse;
}

declare type IClientRegisterResponse = IMutationResponse<IClientRegisterResult> | undefined;
