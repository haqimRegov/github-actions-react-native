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

declare interface ISubmissionSummaryResponseRemarks {
  jointHolder: string[];
  principalHolder: string[];
  hardcopy?: string[];
}

declare interface ISubmissionSummaryResponseDocList {
  remarks: ISubmissionSummaryResponseRemarks;
  title: string;
}

declare interface ISubmissionSummaryResponse {
  docList: ISubmissionSummaryResponseDocList[];
}
