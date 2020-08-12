export type RiskAssessmentState = {
  loading: boolean;
  questionnaire?: IRiskAssessmentQuestions;
  riskScore?: IRiskScore;
};

export const riskAssessmentInitialState: RiskAssessmentState = {
  loading: false,
  questionnaire: {
    questionOne: 0,
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0,
    questionSix: 0,
  },
  riskScore: undefined,
};
