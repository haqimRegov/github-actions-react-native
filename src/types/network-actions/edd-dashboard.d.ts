declare interface IEDDDashboardRequest {
  filter: IDashboardFilter[];
  page: number;
  search: string;
  sort: IEDDDashboardSort[];
  tab: "pending" | "rerouted" | "submitted" | "history";
}

declare interface IEDDDashboardResult {
  cases: IEDDDashboardCase[];
  historyCount: number;
  newCount: number;
  page: number;
  pages: number;
  pendingCount: number;
  reroutedCount: number;
  submittedCount: number;
}

declare type IEDDDashboardResponse = IQueryResponse<IEDDDashboardResult> | undefined;

declare interface IEDDDashboardQuery {
  eddDashboardV2: IEDDDashboardResponse;
}

declare interface ITagData {
  pillCount: number;
  text: EDDNewCaseTagValue;
}
