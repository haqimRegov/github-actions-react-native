declare type TypePaymentMethod = "Online Banking" | "Cheque" | "Client Trust Account (CTA)" | "Cash Deposit Machine" | "Recurring" | "EPF";

declare type TypePaymentMethodValue = { value: TypePaymentMethod };
declare type TypePaymentMethodLabelValue = { label: string; value: TypePaymentMethod };
