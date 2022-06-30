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
declare type TypeIDOther = "Army" | "Police";
declare type TypeIDOtherLabelValue = { label: string; value: TypeIDOther };
declare type TypeIDChoicesValue = { value: TypeIDChoices };
declare type TypeIDChoicesLabelValue = { label: string; value: TypeCurrency };

declare type TypeClientID = "NRIC" | "Passport" | "Army" | "Police";
declare type TypeClientIDChoices = "NRIC" | "Passport" | "Army" | "Police" | "Other";

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
declare type TypeAccountHolder = "Principal" | "Joint";
declare type TypeClient = "NTB" | "ETB";

declare interface IClientBasicInfo {
  country?: string;
  dateOfBirth?: string;
  id?: string;
  idType?: TypeIDChoices;
  otherIdType?: TypeIDOther;
  name?: string;
  clientId?: string;
}

declare type IClientDetailsState = {
  accountHolder?: TypeAccountHolder;
  initId?: string;
  principalHolder?: IClientBasicInfo;
  jointHolder?: IClientBasicInfo;
  verified?: boolean;
};

declare type TypeNewSalesPrompt = "ageMinimum" | "ageMaximum" | "bannedCountry" | "highRisk" | undefined;
