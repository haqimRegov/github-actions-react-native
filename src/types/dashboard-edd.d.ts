declare type EDDPageType = "Cases" | "NewCase" | "ViewCase" | "RerouteCase";

declare type EDDTabType = "new" | "history";

declare type EDDNewCaseTagKey = "pending" | "rerouted" | "submitted" | "history";

declare type EDDNewCaseTagValue = "Pending" | "Rerouted" | "Submitted";

declare type IEDDStatusKey = "pending" | "completed" | "overdue1" | "overdue2" | "cancelled" | "submitted";

declare type IEDDStatusType = "Pending" | "Completed" | "Overdue-1" | "Overdue-2" | "Submitted" | "Cancelled";

declare interface IEDDStatusLabelValue {
  label: IEDDStatusType;
  value: IEDDStatusType;
}

declare type IEDDStatus = Record<IEDDStatusKey, IEDDStatusType>;

declare interface IEDDFilter {
  dateSorting?: string;
  startDate?: Date;
  endDate?: Date;
  caseStatus?: string[];
}

declare interface IEDDDashboardCase {
  accountNo: string;
  caseId: string;
  clientName: string;
  closeDate?: string;
  createdOn: string;
  daysRemaining?: string;
  isSeen: boolean;
  remark?: IDashboardRemark[];
  status: IEDDStatusType;
  targetDate?: string;
}

declare interface IEDDTab {
  filter: IEDDFilter;
  cases: IEDDDashboardCase[];
  page: number;
  pages: number;
  pill: EDDNewCaseTagKey;
  sort: IEDDDashboardSort[];
}

declare type IEDDDashboardSortType =
  | "caseId"
  | "caseNo"
  | "clientName"
  | "accountNo"
  | "caseCreated"
  | "targetDate"
  | "status"
  | "closeDate"
  | "lastUpdated";

declare interface IEDDDashboardSort {
  column: IEDDDashboardSortType;
  value: TransactionsSortValueType;
}

declare interface IEDDDashboard {
  new: IEDDTab;
  history: IEDDTab;
  newCount: number;
  historyCount: number;
  reroutedCount: number;
  submittedCount: number;
  pendingCount: number;
}
