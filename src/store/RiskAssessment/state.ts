export type RiskAssessmentState = {
  questionnaire: IRiskAssessmentState;
  riskScore: IRiskScoreState;
  isRiskUpdated: boolean;
};

export const riskAssessmentInitialState: RiskAssessmentState = {
  questionnaire: {
    questionTwo: -1,
    questionThree: 0,
    questionFour: -1,
    questionFive: -1,
    questionSix: -1,
    questionSeven: 0,
    questionEight: -1,
    questionNine: -1,
  },
  riskScore: {
    appetite: "",
    profile: "",
    rangeOfReturn: "",
    fundSuggestion: "",
    netWorth: "",
    type: "",
  },
  isRiskUpdated: false,
};
