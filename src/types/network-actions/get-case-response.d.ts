declare interface ICaseResponseRequest {
  caseId: string;
  isReroute: boolean;
}

declare interface ICaseResponseData {
  amlaRemark: string | null;
  answers: string;
  description: string | null;
  question: string;
  questionId: string;
}

declare interface ICaseResponseStructure {
  agent: IEDDResponseTitle;
  amla: IEDDResponseTitle;
  count: string;
  data: ICaseResponseData[] | null;
  questions: ICaseResponseData[] | null;
}

declare interface ICaseResponseResult {
  client: IEDDClientData;
  response: ICaseResponseStructure[];
}

declare type ICaseResponse = IQueryResponse<ICaseResponseResult> | undefined;

declare interface ICaseResponseQuery {
  caseResponse: ICaseResponse;
}
