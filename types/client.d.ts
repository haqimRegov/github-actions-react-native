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

declare type TypeIDChoices = "NRIC" | "Passport" | "Other";
declare type TypeIDChoicesValue = { value: TypeIDChoices };
declare type TypeIDChoicesLabelValue = { label: string; value: TypeCurrency };

declare type TypeClientID = "NRIC" | "Passport" | "Army" | "Police";

declare type IClientDetails = {
  id?: string;
  idType?: TypeClientID;
  name?: string;
  dateOfBirth?: string;
  address?: string;
  gender?: "Male" | "Female";
  postCode?: string;
};

declare type TypeAccountChoices = "Individual" | "Joint";
