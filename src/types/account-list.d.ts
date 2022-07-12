declare interface INewSalesAccountList {
  accountType: TypeAccountChoices;
  accountNo: string;
  principalHolder: string;
  jointHolder?: string;
  tags: string[];
}
