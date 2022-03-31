import { DICTIONARY_EDD_DATE } from "../../data/dictionary/edd";

export interface IEDDState extends IEDDDashboard {
  currentCase: IEDDDashboardCase | undefined;
  search: string;
}

export const eddInitialState: IEDDState = {
  new: {
    filter: {
      dateSorting: DICTIONARY_EDD_DATE[1].value,
      startDate: undefined,
      endDate: new Date(),
      caseStatus: [],
    },
    cases: [],
    page: 1,
    pages: 1,
    pill: "pending",
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
  history: {
    filter: {
      dateSorting: DICTIONARY_EDD_DATE[1].value,
      startDate: undefined,
      endDate: new Date(),
      caseStatus: [],
    },
    cases: [],
    page: 1,
    pages: 1,
    pill: "history",
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
  newCount: 0,
  historyCount: 0,
  pendingCount: 0,
  reroutedCount: 0,
  submittedCount: 0,
  search: "",
  currentCase: undefined,
};
