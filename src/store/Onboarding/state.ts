export type OnboardingState = {
  loading: boolean;
  questionnaire?: IRiskAssessmentQuestions;
  riskAssessment?: IRiskScore;
};

export const onboardingInitialState: OnboardingState = {
  loading: false,
  questionnaire: {
    questionOne: 0,
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0,
    questionSix: 0,
  },
  riskAssessment: undefined,
};
