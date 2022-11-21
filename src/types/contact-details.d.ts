declare interface IBankingDetails {
  accountName: string;
  accountNumber: string;
  bankLocation?: string;
  bankName: string;
  bankSwiftCode?: string;
  currency: TypeBankCurrency[];
  otherBankName?: string;
}

declare type TypeBankCurrency = TypeCurrency | "";

declare type TypePhoneNumber = "mobile" | "home" | "office" | "fax";

declare interface IContactNumber {
  code: string;
  error?: string;
  id: string;
  label: string;
  value: string;
}
