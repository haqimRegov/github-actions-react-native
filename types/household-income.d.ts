declare type TypeHouseholdIncome =
  | "Up to RM 1,500"
  | "RM 1,501 - RM 3,000"
  | "RM 3,001 - RM 5,000"
  | "RM 5,001 - RM 8,000"
  | "RM 8,001 - RM 15,000"
  | "RM 15,001 - RM 20,000"
  | "RM 20,001 - RM 50,000"
  | "RM 50,001 - RM 100,000"
  | "RM 100,001 - RM 200,000"
  | "> RM 200,000";

declare type TypeHouseholdIncomeLabelValue = { label: string; value: TypeHouseholdIncome };
