declare interface IDashboardFilter {
  column: string;
  value: string;
}

declare interface ITransactionsAvailableFilterResponse {
  transactionType: string[];
  accountType: string[];
  agentStatus: string[];
}

declare interface IDashboardRequest {
  isTermsAgreed?: boolean;
  filter: IDashboardFilter[];
  hardcopyFilter?: boolean;
  page: number;
  search: string;
  sort: ITransactionsSort[];
  tab: "pending" | "approved" | "rejected" | "rerouted" | "submitted";
}

declare interface IDashboardResult {
  approvedCount: number;
  filters: ITransactionsAvailableFilterResponse;
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
