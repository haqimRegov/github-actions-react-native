declare interface IRiskAssessmentState {
  questionOne: number;
  questionTwo: number;
  questionThree: number;
  questionFour: number;
  questionFive: number;
  questionSix: number;
}

declare interface IRiskScoreState {
  appetite: string;
  profile: string;
  return: string;
  type: string;
  suggestedFunds: string[];
}
