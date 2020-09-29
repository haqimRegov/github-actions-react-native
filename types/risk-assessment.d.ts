declare interface IRiskAssessmentQuestions {
  questionOne?: number;
  questionTwo?: number;
  questionThree?: number;
  questionFour?: number;
  questionFive?: number;
  questionSix?: number;
  questionSeven?: number;
}

declare interface IRiskScore {
  appetite: string;
  fundSuggestion: string;
  netWorth: string;
  profile: string;
  rangeOfReturn: string;
  type: string;
}

declare type TypeRiskAssessmentModal = "prompt" | "assessment" | undefined;
