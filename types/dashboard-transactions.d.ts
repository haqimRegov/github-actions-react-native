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
  totalInvestment: IOrderAmount[];
  createdOn: string;
  status: OrderStatusType;
  dueDate: string;
  lastUpdated: string;
  remark: IDashboardRemark[];
}

declare interface ITransactionsTab {
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

declare type TransactionsSortColumnType =
  | "orderNumber"
  | "principal"
  | "transactionType"
  | "totalInvestment"
  | "createdOn"
  | "dueDate"
  | "";

declare type TransactionsSortValueType = "ascending" | "descending";
declare type TransactionsTabType = "pending" | "approved" | "rejected";
declare type TransactionsPageType = "UploadDocuments" | "UploadHardCopy" | "Transactions" | "OrderSummary";
declare type DashboardPageType = "Inbox" | "Transactions" | "Profile";
