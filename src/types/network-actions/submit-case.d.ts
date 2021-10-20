declare interface IAnswer {
  answers: IQuestionDataRequest[];
  question: string;
}

declare interface IAnswerStringified {
  answers: string;
  question: string;
}

declare interface ISubmitCaseRequest {
  additionalAnswers: IAnswerStringified[];
  allAnswers: IAnswerStringified[];
  caseId: string;
}

declare interface ISubmitCaseResult {
  message: string;
  status: boolean;
}

declare type ISubmitCaseResponse = IMutationResponse<ISubmitCaseResult> | undefined;

declare interface ISubmitCaseMutation {
  submitEdd: ISubmitCaseResponse;
}
