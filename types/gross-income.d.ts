declare type TypeGrossIncome =
  | "> RM 300,000"
  | "RM 200,001 - RM 300,000"
  | "RM 100,001 - RM 200,000"
  | "RM 50,001 - RM 100,000"
  | "< RM 50,000";

declare type TypeGrossIncomeLabelValue = { label: string; value: TypeGrossIncome };
