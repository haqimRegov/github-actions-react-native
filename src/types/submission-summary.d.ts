declare interface ISubmissionSummaryRemarks {
  title: string;
  otherRemarks?: string[];
  remarks: string[];
}

declare interface ISubmissionSummaryOrder {
  orderNumber: string;
  remarks: ISubmissionSummaryRemarks[];
  status: string;
}
