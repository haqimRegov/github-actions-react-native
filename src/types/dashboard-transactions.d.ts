declare interface IDashboardRemark {
  label: string;
  remark: string[];
}

declare interface IDashboardOrder {
  accountType: TypeAccountChoices;
  canProceed: boolean;
  clientId: string;
  jointId: string | null;
  createdOn: string;
  dueDate: string;
  investorName: {
    principal: string;
    joint: string | null;
  };
  isScheduled: boolean;
  isSeen: boolean;
  lastUpdated: string;
  orderNumber: string;
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
  sort: ITransactionsSort[];
}

declare interface ITransactionsDashboard {
  approved: ITransactionsTab;
  approvedCount: number;
  pending: ITransactionsTab;
  pendingCount: number;
  rejected: ITransactionsTab;
  rejectedCount: number;
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
  | ""
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
declare type TransactionsTabType = "pending" | "approved" | "rejected";
declare type TransactionsPageType = "UploadDocuments" | "UploadHardCopy" | "Transactions" | "OrderSummary" | "DashboardPayment";
declare type DashboardPageType = "Inbox" | "Transactions" | "Profile" | "EDD";
