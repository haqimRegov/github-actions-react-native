declare interface IAccountList {
  accountType: TypeAccountChoices;
  accountNo: string;
  principalHolder: string;
  jointHolder?: string;
  tags: string[];
}
