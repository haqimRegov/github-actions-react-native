declare interface IDashboardRemark {
  label: string;
  remark: string[];
}

declare interface IDashboardOrder {
  orderNumber: string;
  accountType: TypeAccountChoices;
  investorName: {
    principal: string;
    joint: string | null;
  };
  transactionType: string;
  isScheduled: boolean;
  canProceed: boolean;
  withHardcopy: boolean;
  totalInvestment: IOrderAmount[];
  createdOn: string;
  status: OrderStatusType;
  dueDate: string;
  lastUpdated: string;
  remark: IDashboardRemark[];
}

declare interface ITransactionsTab {
  filter: ITransactionsFilter;
  orders: IDashboardOrder[];
  page: number;
  pages: number;
  sort: ITransactionsSort[];
}

declare interface ITransactionsDashboard {
  pending: ITransactionsTab;
  approved: ITransactionsTab;
  rejected: ITransactionsTab;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
}

declare interface ITransactionsSort {
  column: TransactionsSortColumnType;
  value: TransactionsSortValueType;
}

declare interface ITransactionsFilter {
  dateSorting?: string;
  startDate?: Date;
  endDate?: Date;
  transactionsType?: string;
  accountType?: string;
  orderStatus?: string[];
}

declare type TransactionsSortColumnType =
  | "orderNumber"
  | "principal"
  | "transactionType"
  | "totalInvestment"
  | "createdOn"
  | "lastUpdated"
  | "dueDate"
  | "";

declare type TransactionsSortValueType = "ascending" | "descending";
declare type TransactionsTabType = "pending" | "approved" | "rejected";
declare type TransactionsPageType = "UploadDocuments" | "UploadHardCopy" | "Transactions" | "OrderSummary" | "DashboardPayment";
declare type DashboardPageType = "Inbox" | "Transactions" | "Profile";
