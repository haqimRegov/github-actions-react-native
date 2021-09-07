declare interface IClientRegisterInfo {
  country?: string;
  dateOfBirth?: string;
  id?: string;
  idType?: TypeClientID;
  name?: string;
}

declare interface IClientRegisterRequest {
  accountType: TypeAccountChoices;
  agentId: string;
  principalHolder: IClientRegisterInfo;
  jointHolder?: IClientRegisterInfo;
}

declare interface IClientRegisterResult {
  principalHolder: IClientBasicInfo;
  jointHolder?: IClientBasicInfo;
}

declare interface IClientRegisterMutation {
  clientRegister: IClientRegisterResponse;
}

declare type IClientRegisterResponse = IMutationResponse<IClientRegisterResult> | undefined;
