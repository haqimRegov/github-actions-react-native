declare interface IBankingDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

declare type TypePhoneNumber = "mobile" | "home" | "office" | "fax";

declare interface IContactNumber {
  label: string;
  type: TypePhoneNumber;
  value: string;
}
