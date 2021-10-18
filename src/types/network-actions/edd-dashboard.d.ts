declare interface IEDDDashboardRequest {
  tab: "pending" | "rerouted" | "submitted" | "history";
  page: number;
  search: string;
  filter: any;
  sort: IEDDDashboardSort[];
}

declare interface IEDDDashboardResult {
  cases: IEDDDashboardCase[];
  pendingCount: number;
  reroutedCount: number;
  newCount: number;
  historyCount: number;
  submittedCount: number;
  page: number;
  pages: number;
}

declare type IEDDDashboardResponse = IQueryResponse<IEDDDashboardResult> | undefined;

declare interface IEDDDashboardQuery {
  eddDashboard: IEDDDashboardResponse;
}
