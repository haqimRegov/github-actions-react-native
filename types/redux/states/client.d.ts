declare type IClientDetailsState = {
  countryOfBirth: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  idType: TypeClientID;
  mailingAddress?: {
    address: string;
    postCode: string;
    city: string;
    country: string;
    state: string;
  };
  name: string;
  permanentAddress: {
    address: string;
    postCode: string;
    city: string;
    country: string;
    state: string;
  };
  placeOfBirth: string;
  salutation: string;
};
