declare type TypePaymentMethod =
  | "Online Banking / TT / ATM"
  | "Cheque"
  | "Client Trust Account (CTA)"
  | "Cash Deposit Machine"
  | "Recurring"
  | "EPF";

declare type TypePaymentMethodValue = { value: TypePaymentMethod };
declare type TypePaymentMethodLabelValue = { label: string; value: TypePaymentMethod };

declare interface IAmountValueError {
  value: string;
  error?: string;
}
