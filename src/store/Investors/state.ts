interface IInvestorState extends IInvestorsDashboard {
  search: string;
  currentInvestor: IInvestorData | undefined;
}

export type investorsState = IInvestorState;

export const transactionsInitialState: investorsState = {
  all: {
    filter: {
      riskProfile: "",
      startDate: undefined,
      endDate: new Date(),
    },
    investors: [],
    page: 1,
    pages: 1,
    sort: [{ value: "ascending", column: "name" }],
  },
  allCount: 0,
  search: "",
  currentInvestor: undefined,
};
