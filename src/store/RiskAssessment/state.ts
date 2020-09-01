export type RiskAssessmentState = {
  questionnaire: IRiskAssessmentState;
  riskScore: IRiskScoreState;
};

export const riskAssessmentInitialState: RiskAssessmentState = {
  questionnaire: {
    questionOne: 0,
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0,
    questionSix: 0,
    questionSeven: 0,
  },
  riskScore: {
    appetite: "",
    profile: "",
    return: "",
    type: "",
    suggestedFunds: [],
  },
};
