export const DICTIONARY_EDD_DATE = [
  { label: "Creation Date", value: "Creation Date" },
  { label: "Last Updated Date", value: "Last Updated Date" },
];

export const DICTIONARY_NEW_TAB_STATUS: IEDDStatusLabelValue[] = [
  { label: "Pending", value: "Pending" },
  { label: "Overdue-1", value: "Overdue-1" },
  { label: "Overdue-2", value: "Overdue-2" },
  { label: "Submitted", value: "Submitted" },
];

export const DICTIONARY_HISTORY_TAB_STATUS: IEDDStatusLabelValue[] = [
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export const DICTIONARY_EDD_STATUS: IEDDStatus = {
  pending: "Pending",
  submitted: "Submitted",
  completed: "Completed",
  cancelled: "Cancelled",
  overdue1: "Overdue-1",
  overdue2: "Overdue-2",
};
