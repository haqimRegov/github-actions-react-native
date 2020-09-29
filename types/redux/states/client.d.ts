declare type IClientDetailsState = {
  clientId?: string;
  countryOfBirth?: string;
  dateOfBirth?: Date;
  gender?: string;
  idNumber?: string;
  idType?: TypeClientIDChoices;
  otherIdType?: TypeClientIDChoices;
  mailingAddress?: {
    address?: string;
    postCode?: string;
    city?: string;
    country?: string;
    state?: string;
  };
  name?: string;
  permanentAddress?: {
    address?: string;
    postCode?: string;
    city?: string;
    country?: string;
    state?: string;
  };
  placeOfBirth?: string;
  salutation?: string;
  verified?: boolean;
};
