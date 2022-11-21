import { DICTIONARY_EDD_DATE } from "../../data/dictionary/edd";
import { eddActions } from "./actions";
import { eddInitialState, IEDDState } from "./state";

export const eddReducer = (state = eddInitialState, action: eddActions): IEDDState => {
  switch (action.type) {
    case "edd/UPDATE_CASES":
      return {
        ...state,
        ...action.payload,
      };

    case "edd/UPDATE_NEW_CASES_FILTER":
      return {
        ...state,
        new: {
          ...state.new,
          filter: { ...state.new.filter, ...action.payload },
        },
      };
    case "edd/UPDATE_HISTORY_FILTER":
      return {
        ...state,
        history: {
          ...state.new,
          filter: { ...state.history.filter, ...action.payload },
        },
      };
    case "edd/UPDATE_NEW_CASES_SORT":
      return {
        ...state,
        new: {
          ...state.new,
          sort: action.payload,
        },
      };
    case "edd/UPDATE_HISTORY_SORT":
      return {
        ...state,
        history: {
          ...state.history,
          sort: action.payload,
        },
      };
    case "edd/RESET_NEW_CASES_FILTER":
      return {
        ...state,
        new: {
          ...state.new,
          filter: {
            dateSorting: DICTIONARY_EDD_DATE[1].value,
            startDate: undefined,
            endDate: new Date(),
            caseStatus: [],
          },
        },
      };
    case "edd/RESET_HISTORY_FILTER":
      return {
        ...state,
        history: {
          ...state.history,
          filter: {
            dateSorting: DICTIONARY_EDD_DATE[1].value,
            startDate: undefined,
            endDate: new Date(),
            caseStatus: [],
          },
        },
      };
    case "edd/UPDATE_PILL":
      return {
        ...state,
        new: {
          ...state.new,
          pill: action.payload,
        },
      };
    case "edd/UPDATE_CURRENT_CASE":
      return {
        ...state,
        currentCase: action.payload,
      };
    case "edd/UPDATE_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "edd/RESET_EDD":
      return {
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

    default:
      return { ...state };
  }
};
