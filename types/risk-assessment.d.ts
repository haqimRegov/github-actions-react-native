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
  profile: string;
  return: string;
  type: string;
  suggestedFunds: string[];
}

declare type TypeRiskAssessmentModal = "prompt" | "assessment" | undefined;
