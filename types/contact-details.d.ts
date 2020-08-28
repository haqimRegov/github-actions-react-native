declare interface IBankingDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankSwiftCode?: string;
  currency: TypeBankCurrency[];
  otherBankName?: string;
}

declare type TypeBankCurrency = TypeCurrency | "";

declare type TypePhoneNumber = "mobile" | "home" | "office" | "fax";

declare interface IContactNumber {
  code: string;
  label: string;
  value: string;
}
