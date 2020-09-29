declare interface IGetRiskProfileRequest {
  clientId: string;
  riskAssessment: {
    questionOne: number;
    questionTwo: number;
    questionThree: number;
    questionFour: number;
    questionFive: number;
    questionSix: number;
    questionSeven: number;
  };
}

declare type IGetRiskProfileResult = IRiskScore;

declare type IGetRiskProfileResponse = IMutationResponse<IGetRiskProfileResult> | undefined;

declare interface IGetRiskProfileMutation {
  riskAssessment: IGetRiskProfileResponse;
}
