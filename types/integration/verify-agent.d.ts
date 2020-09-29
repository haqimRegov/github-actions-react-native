declare interface IVerifyAgentRequest {
  nric: string;
}

declare interface IVerifyAgentResult {
  email: string;
  message: string;
  status: boolean;
}

declare interface IVerifyAgentMutation {
  firstTimeSignUp: IVerifyAgentResponse;
}

declare type IVerifyAgentResponse = IMutationResponse<IVerifyAgentResult> | undefined;
