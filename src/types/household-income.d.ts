declare type TypeHouseholdIncome =
  | "Up to 1,500"
  | "1,501 - 3,000"
  | "3,001 - 5,000"
  | "5,001 - 8,000"
  | "8,001 - 15,000"
  | "15,001 - 20,000"
  | "20,001 - 50,000"
  | "50,001 - 100,000"
  | "100,001 - 200,000"
  | "> 200,000";

declare type TypeHouseholdIncomeLabelValue = { label: string; value: TypeHouseholdIncome };
