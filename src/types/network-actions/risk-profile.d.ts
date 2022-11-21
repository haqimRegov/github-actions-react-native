declare interface IGetRiskProfileRequest {
  clientId: string;
  id: string;
  initId: string;
  isEtb: boolean;
  isForceUpdate: boolean;
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
  riskAssessmentV2: IGetRiskProfileResponse;
}
