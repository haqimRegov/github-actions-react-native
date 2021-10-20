declare interface IPreviousResponseRequest {
  caseId: string;
  question: string;
}

declare interface IPreviousResponseStructure {
  answer: string;
  questionId: string;
}

declare type IPreviousResponseResult = IPreviousResponseStructure;

declare type IPreviousResponse = IQueryResponse<IPreviousResponseResult> | undefined;

declare interface IPreviousResponseQuery {
  previousResponse: IPreviousResponse;
}
