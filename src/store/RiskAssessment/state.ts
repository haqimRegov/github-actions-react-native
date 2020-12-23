export type RiskAssessmentState = {
  questionnaire: IRiskAssessmentState;
  riskScore: IRiskScoreState;
};

export const riskAssessmentInitialState: RiskAssessmentState = {
  questionnaire: {
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0,
    questionSix: 0,
    questionSeven: 0,
    questionEight: -1,
  },
  riskScore: {
    appetite: "",
    profile: "",
    rangeOfReturn: "",
    fundSuggestion: "",
    netWorth: "",
    type: "",
  },
};
