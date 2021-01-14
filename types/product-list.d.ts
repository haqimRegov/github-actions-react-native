declare interface IProductFilter {
  epfApproved?: string[];
  fundCurrency?: string[];
  fundType?: string[];
  issuingHouse?: string[];
  riskCategory?: string[];
  shariahApproved?: string[];
  conventional?: string[];
}

declare interface IProductSort {
  column: ProductSortColumnType;
  value: ProductSortValueType;
}

declare type ProductSortColumnType = "fundAbbr" | "fundName" | "riskCategory" | "";
declare type ProductSortValueType = "asc" | "desc" | "";
declare type ProductType = "ut" | "prs" | "prsDefault" | "amp";
declare type ProductListShowByType = "all" | "recommended";

declare type LicenseType = "UT" | "PRS" | "PRSDefault" | "AMP";
