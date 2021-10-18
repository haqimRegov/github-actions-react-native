declare interface IEDDNewCaseRequest {
  caseId: string;
}

declare interface IEDDClientData {
  name: string;
  status: IEDDStatusType;
}

declare interface IEDDNewCaseResult {
  data: IEDDResponse;
  client: IEDDClientData;
}

declare type INewCaseResponse = IQueryResponse<IEDDNewCaseResult> | undefined;

declare interface IEDDNewCaseQuery {
  caseQuestions: INewCaseResponse;
}
