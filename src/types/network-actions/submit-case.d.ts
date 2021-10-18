declare interface IAnswer {
  question: string;
  answers: IQuestionDataRequest[];
}

declare interface IAnswerStringified {
  question: string;
  answers: string;
}

declare interface ISubmitCaseRequest {
  caseId: string;
  allAnswers: IAnswerStringified[];
  additionalAnswers: IAnswerStringified[];
}

declare interface ISubmitCaseResult {
  status: boolean;
  message: string;
}

declare type ISubmitCaseResponse = IMutationResponse<ISubmitCaseResult> | undefined;

declare interface ISubmitCaseMutation {
  submitEdd: ISubmitCaseResponse;
}
