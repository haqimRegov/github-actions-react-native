declare interface IEDDNewCaseRequest {
  caseId: string;
}

declare interface IEDDClientData {
  name: string;
  status: IEDDStatusType;
}

declare interface IEDDNewCaseResult {
  client: IEDDClientData;
  data: IEDDResponse;
}

declare type INewCaseResponse = IQueryResponse<IEDDNewCaseResult> | undefined;

declare interface IEDDNewCaseQuery {
  caseQuestions: INewCaseResponse;
}
