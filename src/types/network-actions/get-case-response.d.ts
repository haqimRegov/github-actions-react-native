declare interface ICaseResponseRequest {
  caseId: string;
  isReroute: boolean;
}

declare interface ICaseResponseData {
  question: string;
  questionId: string;
  description: string | null;
  answers: string;
  amlaRemark: string | null;
}

declare interface ICaseResponseStructure {
  count: string;
  questions: ICaseResponseData[] | null;
  data: ICaseResponseData[] | null;
  agent: IEDDResponseTitle;
  amla: IEDDResponseTitle;
}

declare interface ICaseResponseResult {
  response: ICaseResponseStructure[];
  client: IEDDClientData;
}

declare type ICaseResponse = IQueryResponse<ICaseResponseResult> | undefined;

declare interface ICaseResponseQuery {
  caseResponse: ICaseResponse;
}
