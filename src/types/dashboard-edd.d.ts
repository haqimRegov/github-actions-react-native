declare type EDDNewCaseTagKey = "pending" | "rerouted" | "submitted" | "history";
declare type EDDNewCaseTagValue = "Pending" | "Rerouted" | "Submitted";
declare type EDDPageType = "Cases" | "NewCase" | "ViewCase" | "RerouteCase";
declare type EDDTabType = "new" | "history";
declare type IEDDStatusKey = "pending" | "completed" | "overdue1" | "overdue2" | "cancelled" | "submitted" | "rerouted";
declare type IEDDStatusType = "Pending" | "Completed" | "Overdue-1" | "Overdue-2" | "Submitted" | "Cancelled" | "Rerouted";
declare type IEDDStatus = Record<IEDDStatusKey, IEDDStatusType>;

declare type TEDDDateType = "Created On" | "Last Updated";
declare type TSortType = "ascending" | "descending";

declare interface IEDDReason {
  remark: string;
  title: string;
}

declare interface IEDDShowDateBy {
  key: TSortType;
  type: TEDDDateType;
}

declare interface IEDDStatusLabelValue {
  label: IEDDStatusType;
  value: IEDDStatusType;
}

declare interface IEDDFilter {
  caseStatus?: string[];
  dateSorting?: string;
  endDate?: Date;
  startDate?: Date;
}

declare interface IEDDDashboardCase {
  accountNo: string;
  caseId: string;
  clientName: string;
  closeDate?: string;
  createdOn: string;
  label?: string;
  lastUpdated: string;
  daysRemaining?: string;
  isSeen: boolean;
  rerouteReason?: IEDDReason[];
  status: IEDDStatusType;
  targetDate?: string;
}

declare interface IEDDTab {
  cases: IEDDDashboardCase[];
  filter: IEDDFilter;
  page: number;
  pages: number;
  pill: EDDNewCaseTagKey;
  sort: IEDDDashboardSort[];
}

declare type IEDDDashboardSortType =
  | "accountNo"
  | "caseCreated"
  | "caseId"
  | "caseNo"
  | "clientName"
  | "closeDate"
  | "lastUpdated"
  | "status"
  | "targetDate";

declare interface IEDDDashboardSort {
  column: IEDDDashboardSortType;
  value: TransactionsSortValueType;
}

declare interface IEDDDashboard {
  history: IEDDTab;
  historyCount: number;
  new: IEDDTab;
  newCount: number;
  pendingCount: number;
  reroutedCount: number;
  submittedCount: number;
}
