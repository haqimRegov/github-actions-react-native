declare type TypeKIBBranches =
  | "Penang"
  | "Ipoh"
  | "Kuantan"
  | "Damansara Uptown"
  | "Klang"
  | "Seremban"
  | "Melaka"
  | "Johor Bahru"
  | "Kuching"
  | "Kuching - PW Office"
  | "Miri"
  | "Kota Kinabalu"
  | "HQ - Kuala Lumpur"
  | "BR - Kuala Lumpur"
  | "Batu Pahat - PW Office"
  | "Kluang"
  | "Kota Damansara";

declare type TypeKIBBranchCode =
  | "PG"
  | "IP"
  | "KT"
  | "DU"
  | "KG"
  | "SB"
  | "MK"
  | "JB"
  | "KC"
  | "KP"
  | "MR"
  | "KK"
  | "HQ"
  | "KL"
  | "BP"
  | "KU"
  | "KD";

declare interface IKIBBranchLabelCode {
  label: TypeKIBBranches;
  code: TypeKIBBranchCode;
}

declare type IKIBBranches = Record<TypeKIBBranches, IKIBBranchLabelCode>;
