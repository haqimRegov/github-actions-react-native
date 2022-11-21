export const DICTIONARY_EDD_DATE = [
  { label: "Case Created On", value: "Case Created On" },
  { label: "Last Updated", value: "Last Updated" },
  { label: "Case Closed On", value: "Case Closed On" },
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
  cancelled: "Cancelled",
  completed: "Completed",
  overdue1: "Overdue-1",
  overdue2: "Overdue-2",
  pending: "Pending",
  rerouted: "Rerouted",
  submitted: "Submitted",
};
