declare interface IClientIDDetails {
  address: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  name: string;
  postCode: string;
}

declare type TypeID = "NRIC" | "Passport" | "Army" | "Police";
declare type TypeIDChoices = "NRIC" | "Passport" | "Other";
