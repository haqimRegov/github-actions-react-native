declare interface IRiskAssessmentQuestions {
  questionTwo?: number;
  questionThree?: number;
  questionFour?: number;
  questionFive?: number;
  questionSix?: number;
  questionSeven?: number;
  questionEight?: number;
  questionNine?: number;
}

declare interface IRiskAssessmentState {
  questionTwo: number;
  questionThree: number;
  questionFour: number;
  questionFive: number;
  questionSix: number;
  questionSeven: number;
  questionEight: number;
  questionNine: number;
}

declare interface IRiskScore {
  appetite: string;
  fundSuggestion: string;
  netWorth: string;
  profile: string;
  rangeOfReturn: string;
  type: string;
}

declare type IRiskScoreState = IRiskScore;

declare type TypeRiskAssessmentModal = "promptAssessment" | "assessment" | undefined;
declare type TRiskPage = "summary" | "assessment";
declare type TRiskProfilePages = "accountSummary" | "profile" | "orderSummary" | "accountDetails";
