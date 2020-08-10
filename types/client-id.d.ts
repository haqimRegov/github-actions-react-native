declare interface IClientIDDetails {
  isPassport: boolean;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  name: string;
  postCode: string;
  salutation: string;
  state: string;
}

declare type TypeID = "NRIC" | "Passport" | "Army" | "Police";
declare type TypeIDChoices = "NRIC" | "Passport" | "Other";
