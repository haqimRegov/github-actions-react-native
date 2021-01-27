declare interface IRiskAssessmentQuestions {
  questionTwo?: number;
  questionThree?: number;
  questionFour?: number;
  questionFive?: number;
  questionSix?: number;
  questionSeven?: number;
  questionEight?: number;
}

declare interface IRiskScore {
  appetite: string;
  fundSuggestion: string;
  netWorth: string;
  profile: string;
  rangeOfReturn: string;
  type: string;
}

declare type TypeRiskAssessmentModal = "promptAssessment" | "assessment" | undefined;
