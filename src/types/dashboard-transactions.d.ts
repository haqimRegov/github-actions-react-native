declare type ITransactionPills = "pending" | "rerouted" | "submitted";

declare interface IDashboardRemark {
  label: string;
  remark: string[];
}

declare interface IItemWithCount {
  count: number;
  document: string;
}

declare interface IDashboardReason {
  content: string[];
  documents?: IItemWithCount[];
  isSubmitted?: boolean;
  isDisabled?: boolean;
  title: string;
}

declare interface IDashboardOrder {
  accountType: TypeAccountChoices;
  canProceed: boolean;
  clientId: string;
  createdOn: string;
  documents: IItemWithCount[];
  dueDate: string;
  investorName: {
    principal: string;
    joint: string | null;
  };
  isScheduled: boolean;
  isSeen: boolean;
  jointId: string | null;
  label?: string;
  lastUpdated: string;
  orderNumber: string;
  reason: IDashboardReason[];
  remark: IDashboardRemark[];
  status: OrderStatusType;
  totalInvestment: IOrderAmount[];
  transactionType: string;
  withHardcopy: boolean;
}

declare interface ITransactionsTab {
  filter: ITransactionsFilter;
  orders: IDashboardOrder[];
  page: number;
  pages: number;
  pill?: ITransactionPills;
  sort: ITransactionsSort[];
}

declare interface ITransactionsDashboard {
  approved: ITransactionsTab;
  approvedCount: number;
  incomplete: ITransactionsTab;
  incompleteCount: number;
  pendingCount: number;
  rejected: ITransactionsTab;
  rejectedCount: number;
  reroutedCount: number;
  submittedCount: number;
}

declare interface ITransactionsSort {
  column: TransactionsSortColumnType;
  value: TransactionsSortValueType;
}

declare interface ITransactionsFilter {
  accountType?: string;
  dateSorting?: string;
  endDate?: Date;
  orderStatus?: string[];
  startDate?: Date;
  transactionsType?: string;
}

declare type TransactionsSortColumnType =
  | "createdOn"
  | "dueDate"
  | "lastUpdated"
  | "orderNumber"
  | "principal"
  | "totalInvestment"
  | "transactionType"
  | "status";

declare type TDateType = "Created On" | "Last Updated";

declare interface IShowDateBy {
  key: TSortType;
  type: TDateType;
}

declare type TransactionsSortValueType = "ascending" | "descending";
declare type TransactionsTabType = "incomplete" | "approved" | "rejected";
declare type TransactionsPageType = "UploadDocuments" | "UploadHardCopy" | "Transactions" | "OrderSummary" | "DashboardPayment";
declare type DashboardPageType = "Inbox" | "Transactions" | "Profile" | "EDD" | "Investors";
declare interface IDashboardAll extends IDashboardOrder, IInvestorAccountsData {}
