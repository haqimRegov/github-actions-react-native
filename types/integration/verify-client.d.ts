declare interface IVerifyClientRequest {
  accountType: number;
  agentId: string;
  dateOfBirth?: string | null;
  id: string;
  idType?: number | null;
  name: string;
}

declare interface IVerifyClientResult {
  clientId: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  message: string;
  name: string;
}

declare interface IVerifyClientMutation {
  clientRegister: IVerifyClientResponse;
}

declare type IVerifyClientResponse = IMutationResponse<IVerifyClientResult> | undefined;
