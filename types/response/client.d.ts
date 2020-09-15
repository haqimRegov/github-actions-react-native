declare type IClientDetailsResponse = {
  id: string;
  idType: TypeClientID;
  countryOfBirth?: string;
  dateOfBirth: Date;
  gender?: string;
  mailingAddress?: {
    address: string;
    postCode: string;
    city: string;
    country?: string;
    state: string;
  };
  name: string;
  permanentAddress?: {
    address?: string;
    postCode?: string;
    city?: string;
    country?: string;
    state?: string;
  };
  placeOfBirth?: string;
  salutation?: string;
};
