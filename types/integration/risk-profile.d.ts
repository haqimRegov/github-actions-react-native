declare interface IGetRiskProfileRequest {
  clientId: string;
  riskAssessment: {
    questionTwo: number;
    questionThree: number;
    questionFour: number;
    questionFive: number;
    questionSix: number;
    questionSeven: number;
    questionEight: number;
    questionNine: number;
  };
}

declare type IGetRiskProfileResult = IRiskScore;

declare type IGetRiskProfileResponse = IMutationResponse<IGetRiskProfileResult> | undefined;

declare interface IGetRiskProfileMutation {
  riskAssessment: IGetRiskProfileResponse;
}
