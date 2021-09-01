declare interface IDashboardRequest {
  tab: "pending" | "approved" | "rejected";
  page: number;
  search: string;
  filter: any[];
  sort: ITransactionsSort[];
}

declare interface IDashboardResult {
  orders: IDashboardOrder[];
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  page: number;
  pages: number;
}

declare type IDashboardResponse = IQueryResponse<IDashboardResult> | undefined;

declare interface IDashboardQuery {
  dashboard: IDashboardResponse;
}
