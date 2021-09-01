declare interface IApplicationHistory {
  pending: IApplicationHistoryTable[];
  approved: IApplicationHistoryTable[];
  rejected: IApplicationHistoryTable[];
}

declare interface Investor {
  principal: string;
  joint?: string;
}

declare interface Investment {
  currency: string;
  amount: number;
}

declare interface IApplicationHistoryTable {
  balance?: string;
  balanceType?: string;
  createdOnDate?: string;
  createdOnTime?: string;
  currency: string;
  dueDate?: string;
  investment: string;
  investments?: Investment[];
  investorId: string;
  investorName: Investor;
  lastUpdatedDate?: string;
  lastUpdatedTime?: string;
  orderNo: string;
  remark?: {
    label: string;
    remark: string;
  }[];
  status: OrderStatusType;
  transactionType: string;
}

declare interface IOrderCount {
  approved: number;
  pending: number;
  rejected: number;
}

declare type TransactionDashboardType = "approved" | "pending" | "rejected";
declare type TransactionOrderType = Partial<TransactionDashboardType>;

declare interface ITransactionTab {
  currentPage: number;
  orders: IApplicationHistoryTable[];
  totalPages: number;
}
