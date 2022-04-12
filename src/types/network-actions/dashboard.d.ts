declare interface IDashboardFilter {
  column: string;
  value: string;
}

declare interface IDashboardRequest {
  filter: IDashboardFilter[];
  page: number;
  search: string;
  sort: ITransactionsSort[];
  tab: "pending" | "approved" | "rejected" | "rerouted" | "submitted";
}

declare interface IDashboardResult {
  approvedCount: number;
  incompleteCount: number;
  orders: IDashboardOrder[];
  page: number;
  pages: number;
  pendingCount: number;
  rejectedCount: number;
  rerouteCount: number;
  submittedCount: number;
}

declare type IDashboardResponse = IQueryResponse<IDashboardResult> | undefined;

declare interface IDashboardQuery {
  agentDashboardV2: IDashboardResponse;
}
