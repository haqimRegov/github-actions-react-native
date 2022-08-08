type IInvestorState = IInvestorsDashboard;

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
  backToInvestorOverview: false,
};
