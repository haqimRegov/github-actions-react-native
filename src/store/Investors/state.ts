interface IInvestorState extends IInvestorsDashboard {
  search: string;
  currentAccount: IInvestorAccountsData | undefined;
  currentInvestor: IInvestorData | undefined;
  currentOrderHistory: IDashboardOrder | undefined;
  orderHistory: ITransactionsTab;
}

export type investorsState = IInvestorState;

export const investorsInitialState: investorsState = {
  all: {
    filter: {
      riskProfile: [],
    },
    investors: [],
    page: 1,
    pages: 1,
    sort: [{ value: "ascending", column: "name" }],
  },
  allCount: 0,
  search: "",
  currentAccount: undefined,
  currentInvestor: undefined,
  currentOrderHistory: undefined,
  orderHistory: {
    filter: {
      dateSorting: "",
      startDate: undefined,
      endDate: new Date(),
      transactionsType: [],
      accountType: [],
      orderStatus: [],
    },
    orders: [],
    page: 1,
    pages: 1,
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
};
